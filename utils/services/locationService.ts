import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { consultarApi } from "../api";
import APIS from "@/constants/endpoint";

export const TAREA_SEGUIMIENTO_UBICACION = "tarea-seguimiento-ubicacion";

// 1. Definir la tarea (esto debe ejecutarse al inicio de la app)
TaskManager.defineTask(TAREA_SEGUIMIENTO_UBICACION, ({ data, error }) => {
  if (error) {
    console.error("Error en la tarea:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    enviarUbicacion(locations[0]);
  }
});

const enviarUbicacion = async (locations: any) => {
  const subdominio = await AsyncStorage.getItem("subdominio");
  const usuario_id = await AsyncStorage.getItem("usuario_id");
  const despacho = await AsyncStorage.getItem("despacho");
  const respuestaApiUbicacion = await consultarApi<any>(
    APIS.ruteo.ubicacion,
    {
      usuario_id,
      despacho: despacho!,
      latitud: locations.coords.latitude,
      longitud: locations.coords.longitude,
    },
    {
      requiereToken: true,
      subdominio: subdominio!,
    }
  );
  // console.log(
  //   {
  //     usuario_id,
  //     despacho: despacho!,
  //     latitud: locations.coords.latitude,
  //     longitud: locations.coords.longitude,
  //   }
  // );

  //console.log(respuestaApiUbicacion);
};

export async function iniciarTareaSeguimientoUbicacion() {
  try {
    // 2. Solicitar permisos
    const { status } = await Location.requestForegroundPermissionsAsync();
    //console.log("Permiso foreground:", status);
    if (status !== "granted") {
      alert("Se requieren permisos de ubicación para continuar.");
      return;
    }

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    //console.log("Permiso background:", backgroundStatus);
    if (backgroundStatus !== "granted") {
      alert(
        "Activa 'Permitir siempre' en ajustes para el rastreo en segundo plano."
      );
      return;
    }

    // 3. Iniciar la tarea
    const options = {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 10,
      foregroundService: {
        notificationTitle: "Rastreo activo",
        notificationBody: "Tu ubicación se está registrando.",
      },
    };

    // console.log("Iniciando servicio...");
    const result = await Location.startLocationUpdatesAsync(
      TAREA_SEGUIMIENTO_UBICACION,
      options
    );
    // console.log("Servicio iniciado con éxito:", result);

    // 4. Verificar si la tarea está registrada
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      TAREA_SEGUIMIENTO_UBICACION
    );
    // console.log("¿Tarea registrada?", isRegistered); // Debería ser `true`
  } catch (error: any) {
    //console.error("Error crítico:", error);
    alert("Error al iniciar el servicio: " + error.message);
  }
}

export async function detenerTareaSeguimientoUbicacion() {
  try {
    // 1. Verificar si la tarea está registrada
    const tareaRegistrada = await TaskManager.isTaskRegisteredAsync(
      TAREA_SEGUIMIENTO_UBICACION
    );
    if (tareaRegistrada) {
      // 2. Detener las actualizaciones de ubicación
      await Location.stopLocationUpdatesAsync(TAREA_SEGUIMIENTO_UBICACION);
    }
    return true;
  } catch (error: any) {
    //console.error("Error al detener el servicio:", error);
    alert("Error al detener el servicio: " + error.message);
    return false;
  }
}

export async function registrarTareaSeguimientoUbicacion() {
  const tareaRegistrada = await TaskManager.isTaskRegisteredAsync(
    TAREA_SEGUIMIENTO_UBICACION
  );
  return tareaRegistrada;
}
