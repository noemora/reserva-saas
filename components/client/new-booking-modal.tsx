'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
} from 'lucide-react';
import type { BookingData, BookingStep } from '@/types/booking';
import { ServiceSelector } from '@/components/booking/service-selector';
import { LocationSelector } from '@/components/booking/location-selector';
import { ProfessionalSelector } from '@/components/booking/professional-selector';
import { DateTimeSelector } from '@/components/booking/datetime-selector';
import { BookingConfirmation } from '@/components/booking/booking-confirmation';
import { BookingDataService } from '@/lib/services/booking-data-service';

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS: { key: BookingStep; label: string; icon: any }[] = [
  { key: 'service', label: 'Servicio', icon: Calendar },
  { key: 'location', label: 'Ubicación', icon: MapPin },
  { key: 'professional', label: 'Profesional', icon: User },
  { key: 'datetime', label: 'Fecha y Hora', icon: Clock },
  { key: 'confirmation', label: 'Confirmación', icon: CheckCircle },
];

export function NewBookingModal({ open, onClose }: NewBookingModalProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    location: null,
    professional: null,
    date: '',
    time: '',
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const getCurrentStepIndex = () => {
    return STEPS.findIndex((step) => step.key === currentStep);
  };

  const getProgress = () => {
    return ((getCurrentStepIndex() + 1) / STEPS.length) * 100;
  };

  const handleServiceSelect = (service: BookingData['service']) => {
    updateBookingData({ service });
    setCurrentStep('location');
  };

  const handleLocationSelect = (location: BookingData['location']) => {
    updateBookingData({ location });

    if (!bookingData.service || !location) return;

    // Verificar si hay múltiples profesionales para este servicio en esta ubicación
    const availableProfessionals =
      BookingDataService.getAvailableProfessionalsForService(
        bookingData.service,
        location
      );

    if (availableProfessionals.length > 1) {
      setCurrentStep('professional');
    } else if (availableProfessionals.length === 1) {
      updateBookingData({ professional: availableProfessionals[0] });
      setCurrentStep('datetime');
    } else {
      // No hay profesionales disponibles (no debería pasar)
      setCurrentStep('datetime');
    }
  };

  const handleProfessionalSelect = (
    professional: BookingData['professional']
  ) => {
    updateBookingData({ professional });
    setCurrentStep('datetime');
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    updateBookingData({ date, time });
    setCurrentStep('confirmation');
  };

  const handleConfirmBooking = () => {
    // Aquí se procesaría la reserva
    console.log('Booking confirmed:', bookingData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset state
    setCurrentStep('service');
    setBookingData({
      service: null,
      location: null,
      professional: null,
      date: '',
      time: '',
    });
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'location':
        setCurrentStep('service');
        break;
      case 'professional':
        setCurrentStep('location');
        break;
      case 'datetime':
        // Determinar si volver a professional o location
        if (bookingData.service && bookingData.location) {
          const availableProfessionals =
            BookingDataService.getAvailableProfessionalsForService(
              bookingData.service,
              bookingData.location
            );
          setCurrentStep(
            availableProfessionals.length > 1 ? 'professional' : 'location'
          );
        } else {
          setCurrentStep('location');
        }
        break;
      case 'confirmation':
        setCurrentStep('datetime');
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'service':
        return <ServiceSelector onServiceSelect={handleServiceSelect} />;

      case 'location':
        return bookingData.service ? (
          <LocationSelector
            service={bookingData.service}
            onLocationSelect={handleLocationSelect}
            onBack={handleBack}
          />
        ) : null;

      case 'professional':
        return bookingData.service && bookingData.location ? (
          <ProfessionalSelector
            service={bookingData.service}
            location={bookingData.location}
            onProfessionalSelect={handleProfessionalSelect}
            onBack={handleBack}
          />
        ) : null;

      case 'datetime':
        return bookingData.service && bookingData.professional ? (
          <DateTimeSelector
            service={bookingData.service}
            professional={bookingData.professional}
            onDateTimeSelect={handleDateTimeSelect}
            onBack={handleBack}
          />
        ) : null;

      case 'confirmation':
        return (
          <BookingConfirmation
            data={bookingData}
            onConfirm={handleConfirmBooking}
            onBack={handleBack}
            onCancel={handleClose}
          />
        );

      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Paso {getCurrentStepIndex() + 1} de {STEPS.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(getProgress())}% completado
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {STEPS.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = getCurrentStepIndex() > index;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`
                    text-xs font-medium text-center transition-colors duration-200
                    ${
                      isActive
                        ? 'text-blue-600'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step.label}
                </span>
                {index < STEPS.length - 1 && (
                  <div
                    className={`
                      absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-colors duration-200
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `}
                    style={{
                      transform: 'translateX(50%)',
                      width: `calc(100% / ${STEPS.length} - 2.5rem)`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBookingSummary = () => {
    if (getCurrentStepIndex() === 0) return null;

    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
          Resumen de tu reserva
        </h3>
        <div className="space-y-2">
          {bookingData.service && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Servicio:</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {bookingData.service.name}
              </Badge>
            </div>
          )}
          {bookingData.location && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ubicación:</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {bookingData.location.name}
              </Badge>
            </div>
          )}
          {bookingData.professional && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Profesional:</span>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                {bookingData.professional.name}
              </Badge>
            </div>
          )}
          {bookingData.date && bookingData.time && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fecha y hora:</span>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800"
              >
                {bookingData.date} - {bookingData.time}
              </Badge>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Nueva Reserva
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                Reserva un servicio con nuestros profesionales de forma rápida y
                sencilla
              </p>
            </div>
            {getCurrentStepIndex() > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {renderStepIndicator()}
          {renderBookingSummary()}

          <div className="bg-white rounded-lg">{renderCurrentStep()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
