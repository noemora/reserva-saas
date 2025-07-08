import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  session: Session | null;
  profile: Profile | null;
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  initialized: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data?: Session; error?: AuthError }>;
  signOut: () => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  fetchProfile: (userId: string) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      profile: null,
      user: null,
      loading: false,
      isLoading: true,
      initialized: false,

      signIn: async (email, password) => {
        console.log('🔐 Iniciando proceso de login...');
        set({ loading: true, isLoading: true });

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('❌ Error en signIn:', error);
            set({ loading: false, isLoading: false });
            return { error };
          }

          if (data.session && data.user) {
            console.log('✅ Login exitoso, obteniendo perfil...');
            set({
              session: data.session,
              user: data.user,
              loading: false,
            });

            // Obtener el perfil del usuario
            await get().fetchProfile(data.user.id);

            console.log('✅ Proceso de login completado');
            return { data: data.session };
          }

          set({ loading: false, isLoading: false });
          return {
            error: { message: 'No se pudo obtener la sesión' } as AuthError,
          };
        } catch (error) {
          console.error('❌ Error inesperado en signIn:', error);
          set({ loading: false, isLoading: false });
          return {
            error: { message: 'Error interno del servidor' } as AuthError,
          };
        }
      },

      signOut: async () => {
        console.log('🚪 Cerrando sesión...');
        set({ loading: true });

        try {
          await supabase.auth.signOut();
          set({
            session: null,
            profile: null,
            user: null,
            loading: false,
            isLoading: false,
          });
          console.log('✅ Sesión cerrada exitosamente');
        } catch (error) {
          console.error('❌ Error cerrando sesión:', error);
          set({ loading: false });
        }
      },

      setProfile: (profile) => {
        console.log('👤 Estableciendo perfil:', profile);
        set({ profile, isLoading: false });
      },

      fetchProfile: async (userId: string) => {
        console.log('📋 Obteniendo perfil para usuario:', userId);

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('❌ Error obteniendo perfil:', error);
            set({ isLoading: false });
            return;
          }

          if (data) {
            console.log('✅ Perfil obtenido:', data);
            set({ profile: data, isLoading: false });
          } else {
            console.warn('⚠️ No se encontró perfil para el usuario');
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('❌ Error inesperado obteniendo perfil:', error);
          set({ isLoading: false });
        }
      },

      initialize: async () => {
        const state = get();

        // Evitar múltiples inicializaciones
        if (state.initialized) {
          console.log('ℹ️ Store ya inicializado, omitiendo...');
          // Si ya está inicializado pero isLoading es true, corregir el estado
          if (state.isLoading) {
            console.log('🔧 Corrigiendo estado: isLoading debería ser false');
            set({ isLoading: false });
          }
          return;
        }

        console.log('🚀 Inicializando auth store...');
        set({ isLoading: true, initialized: true });

        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session && session.user) {
            console.log('✅ Sesión existente encontrada');
            set({
              session,
              user: session.user,
              loading: false,
            });

            // Solo obtener perfil si no tenemos uno o si es diferente usuario
            const currentState = get();
            if (
              !currentState.profile ||
              currentState.profile.id !== session.user.id
            ) {
              await get().fetchProfile(session.user.id);
            } else {
              console.log('✅ Perfil existente válido');
              set({ isLoading: false });
            }
          } else {
            console.log('ℹ️ No hay sesión activa');
            set({ isLoading: false, loading: false });
          }
        } catch (error) {
          console.error('❌ Error inicializando:', error);
          set({ isLoading: false, loading: false, initialized: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: ({ session, profile, user }) => ({
        session,
        profile,
        user,
        // No persistir initialized para que se reinicialice en cada carga
      }),
    }
  )
);
