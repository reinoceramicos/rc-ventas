import toast from "react-hot-toast";
import supabase from "../sup-config/supabaseConfig"

const LOGIN_SUCCESS_MESSAGE = "¡Inicio de sesión exitoso!";
const LOGIN_ERROR_MESSAGE = "Usuario o contraseña incorrectos.";

export const handleGoogleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;

    return { success: true, message: 'Sesión creada con éxito.' };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

// Función de cierre de sesión
export const handleLogout = async () => {
  try {
    // Llama a Supabase para cerrar sesión
    const { error } = await supabase.auth.signOut();

    if (error) {
      // Muestra un mensaje de error con toast
      toast.error(error.message || 'Error al cerrar sesión.');
      return { success: false, message: error.message };
    }

    // Muestra un mensaje de éxito con toast
    toast.success('Sesión cerrada con éxito.');
    return { success: true, message: 'Sesión cerrada con éxito.' };
  } catch (err) {
    // Maneja errores inesperados y muestra un mensaje con toast
    console.error('Error al cerrar sesión:', err);
    toast.error('Error inesperado al cerrar sesión. Inténtalo de nuevo.');
    return { success: false, message: 'Error inesperado.' };
  }
};

// Función para obtener datos del usuario
export const getUserData = async () => {
  try {
    const { data } = await supabase.auth.refreshSession();
    return data?.user || null;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};

export async function getUserRoles() {

  const { data, error } = await supabase.rpc('get_user_role');

    if (error) {
      console.error('Error al obtener la sesión:', error)
      return null
    }

    return data
}

export async function getUserSessionClient() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
      console.error('Error al obtener la sesión:', error)
      return null
  }
  return data.session
}

