'use client';

import type React from 'react';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Clock, User } from 'lucide-react';
import type { Booking, Workplace } from '@/types/professional';

interface CalendarViewProps {
  bookings: Booking[];
  selectedWorkplace?: Workplace;
}

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  day: number;
  date: string;
  workplace: string;
  color: string;
  client?: string;
  service?: string;
  bookingId?: string;
}

export function CalendarView({
  bookings,
  selectedWorkplace,
}: CalendarViewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<{
    day: number;
    hour: number;
  } | null>(null);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  // Colores para diferentes lugares de trabajo
  const workplaceColors = {
    'Clínica San Juan': 'bg-blue-500',
    'Hospital Central': 'bg-green-500',
    'Consultorio Privado': 'bg-purple-500',
    'Centro Médico Norte': 'bg-orange-500',
    Almuerzo: 'bg-red-500',
  };

  // Calcular fechas de la semana actual
  const getWeekDates = useCallback(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push({
        day: i + 1,
        date: date.getDate(),
        fullDate: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
        }),
      });
    }
    return dates;
  }, [currentWeekStart]);

  const weekDates = getWeekDates();

  // Navegación semanal
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(
      currentWeekStart.getDate() + (direction === 'next' ? 7 : -7)
    );
    setCurrentWeekStart(newWeekStart);
  };

  const goToToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    setCurrentWeekStart(monday);
  };

  // Eventos de ejemplo con fechas reales
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Consulta General',
      startTime: '10:00',
      endTime: '10:30',
      day: 1,
      date: weekDates[0].fullDate,
      workplace: 'Clínica San Juan',
      color: workplaceColors['Clínica San Juan'],
      client: 'María García',
      service: 'Consulta General',
      bookingId: 'booking-1',
    },
    {
      id: '2',
      title: 'Consulta Especializada',
      startTime: '10:00',
      endTime: '11:00',
      day: 2,
      date: weekDates[1].fullDate,
      workplace: 'Hospital Central',
      color: workplaceColors['Hospital Central'],
      client: 'Carlos López',
      service: 'Consulta Especializada',
      bookingId: 'booking-2',
    },
    {
      id: '3',
      title: 'Reunión Médica',
      startTime: '10:30',
      endTime: '12:00',
      day: 3,
      date: weekDates[2].fullDate,
      workplace: 'Centro Médico Norte',
      color: workplaceColors['Centro Médico Norte'],
      service: 'Reunión de Equipo',
      bookingId: 'booking-3',
    },
    // Almuerzos para toda la semana
    ...weekDates.slice(0, 5).map((date, index) => ({
      id: `lunch-${index + 1}`,
      title: 'Almuerzo',
      startTime: '13:00',
      endTime: '14:00',
      day: index + 1,
      date: date.fullDate,
      workplace: 'Almuerzo',
      color: workplaceColors['Almuerzo'],
    })),
    {
      id: '7',
      title: 'Consulta de Control',
      startTime: '15:00',
      endTime: '15:30',
      day: 4,
      date: weekDates[3].fullDate,
      workplace: 'Consultorio Privado',
      color: workplaceColors['Consultorio Privado'],
      client: 'Ana Martínez',
      service: 'Control',
      bookingId: 'booking-4',
    },
    {
      id: '8',
      title: 'Consulta Urgente',
      startTime: '16:00',
      endTime: '16:30',
      day: 5,
      date: weekDates[4].fullDate,
      workplace: 'Clínica San Juan',
      color: workplaceColors['Clínica San Juan'],
      client: 'Pedro Rodríguez',
      service: 'Urgencia',
      bookingId: 'booking-5',
    },
  ];

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes;
    return (totalMinutes / 60) * 60; // 60px per hour
  };

  const getEventHeight = (startTime: string, endTime: string) => {
    const start = getTimePosition(startTime);
    const end = getTimePosition(endTime);
    return Math.max(end - start, 30); // Minimum 30px height
  };

  const getTimeFromPosition = (position: number) => {
    const totalMinutes = (position / 60) * 60;
    const hours = Math.floor(totalMinutes / 60) + 8;
    const minutes = Math.round((totalMinutes % 60) / 15) * 15; // Snap to 15-minute intervals
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);

    // Add visual feedback
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.opacity = '0.8';
    dragImage.style.transform = 'rotate(5deg)';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, day: number, hour: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot({ day, hour });
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, day: number, hour: number) => {
    e.preventDefault();

    if (!draggedEvent) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newStartTime = getTimeFromPosition(y);

    // Calculate new end time based on original duration
    const originalStart = draggedEvent.startTime.split(':').map(Number);
    const originalEnd = draggedEvent.endTime.split(':').map(Number);
    const durationMinutes =
      originalEnd[0] * 60 +
      originalEnd[1] -
      (originalStart[0] * 60 + originalStart[1]);

    const newStartMinutes =
      Number.parseInt(newStartTime.split(':')[0]) * 60 +
      Number.parseInt(newStartTime.split(':')[1]);
    const newEndMinutes = newStartMinutes + durationMinutes;
    const newEndTime = `${Math.floor(newEndMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(newEndMinutes % 60).toString().padStart(2, '0')}`;

    console.log(
      `Moved event "${draggedEvent.title}" to day ${day} at ${newStartTime}-${newEndTime}`
    );

    // Here you would update the event in your state/database
    // For now, we'll just log the change

    setDraggedEvent(null);
    setDragOverSlot(null);
  };

  const formatWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);

    const startStr = currentWeekStart.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const endStr = endDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Calendario Semanal</h2>
          <p className="text-gray-600">{formatWeekRange()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Hoy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Leyenda de colores */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm font-medium text-gray-700">
          Lugares de trabajo:
        </div>
        {Object.entries(workplaceColors).map(([workplace, color]) => (
          <div key={workplace} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${color}`}></div>
            <span className="text-sm text-gray-600">{workplace}</span>
          </div>
        ))}
        <div className="ml-auto text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Arrastra las reservas para reprogramar
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Header con días */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-gray-50"></div>
            {weekDays.map((day, index) => {
              const dateInfo = weekDates[index];
              const isToday =
                dateInfo.fullDate === new Date().toISOString().split('T')[0];

              return (
                <div
                  key={day}
                  className={`p-4 text-center border-r last:border-r-0 ${
                    isToday ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div
                    className={`font-medium ${
                      isToday ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {day}
                  </div>
                  <div
                    className={`text-sm ${
                      isToday ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    {dateInfo.displayDate}
                  </div>
                  {isToday && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid del calendario */}
          <div className="relative">
            {/* Líneas de horas */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 border-b"
                style={{ height: '60px' }}
              >
                <div className="p-2 border-r bg-gray-50 flex items-start justify-end">
                  <span className="text-sm text-gray-600 font-medium">
                    {hour}:00
                  </span>
                </div>
                {weekDays.map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`border-r last:border-r-0 relative transition-colors ${
                      dragOverSlot?.day === dayIndex + 1 &&
                      dragOverSlot?.hour === hour
                        ? 'bg-blue-100'
                        : 'hover:bg-gray-50'
                    }`}
                    onDragOver={(e) => handleDragOver(e, dayIndex + 1, hour)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, dayIndex + 1, hour)}
                  >
                    {/* Grid lines for 15-minute intervals */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-0 right-0 border-t border-gray-100"></div>
                      <div className="absolute top-1/2 left-0 right-0 border-t border-gray-200"></div>
                      <div className="absolute top-3/4 left-0 right-0 border-t border-gray-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Eventos */}
            {events.map((event) => (
              <div
                key={event.id}
                draggable={event.workplace !== 'Almuerzo'}
                onDragStart={(e) => handleDragStart(e, event)}
                className={`absolute ${
                  event.color
                } text-white text-xs p-2 rounded shadow-sm transition-all duration-200 ${
                  event.workplace !== 'Almuerzo'
                    ? 'cursor-move hover:opacity-90 hover:shadow-md hover:scale-105'
                    : 'cursor-default'
                } ${draggedEvent?.id === event.id ? 'opacity-50' : ''}`}
                style={{
                  top: `${getTimePosition(event.startTime) + 41}px`, // +41px para el header
                  left: `${12.5 + (event.day - 1) * 12.5}%`,
                  width: '12%',
                  height: `${getEventHeight(event.startTime, event.endTime)}px`,
                  minHeight: '30px',
                  zIndex: draggedEvent?.id === event.id ? 1000 : 10,
                }}
                title={`${event.title} - ${event.startTime} a ${event.endTime}${
                  event.client ? ` - ${event.client}` : ''
                }${
                  event.workplace !== 'Almuerzo' ? ' (Arrastra para mover)' : ''
                }`}
              >
                <div className="font-medium truncate">{event.title}</div>
                {event.client && (
                  <div className="text-xs opacity-90 truncate flex items-center gap-1">
                    <User className="w-2 h-2" />
                    {event.client}
                  </div>
                )}
                <div className="text-xs opacity-75 flex items-center gap-1">
                  <Clock className="w-2 h-2" />
                  {event.startTime}
                </div>
              </div>
            ))}

            {/* Drag preview */}
            {dragOverSlot && draggedEvent && (
              <div
                className={`absolute ${draggedEvent.color} text-white text-xs p-2 rounded shadow-lg opacity-60 pointer-events-none border-2 border-white`}
                style={{
                  top: `${dragOverSlot.hour * 60 - 8 * 60 + 41}px`,
                  left: `${12.5 + (dragOverSlot.day - 1) * 12.5}%`,
                  width: '12%',
                  height: `${getEventHeight(
                    draggedEvent.startTime,
                    draggedEvent.endTime
                  )}px`,
                  minHeight: '30px',
                  zIndex: 1001,
                }}
              >
                <div className="font-medium truncate">{draggedEvent.title}</div>
                {draggedEvent.client && (
                  <div className="text-xs opacity-90 truncate">
                    {draggedEvent.client}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <div>
                <div className="text-sm text-gray-600">Clínica San Juan</div>
                <div className="font-semibold">2 reservas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <div>
                <div className="text-sm text-gray-600">Hospital Central</div>
                <div className="font-semibold">1 reserva</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <div>
                <div className="text-sm text-gray-600">Consultorio Privado</div>
                <div className="font-semibold">1 reserva</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-600">Total esta semana</div>
                <div className="font-semibold">4 reservas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
