export const rutasApp = {
  login: "/(auth)/login",
  crearCuenta: "/(auth)/crearCuenta",
  olvidoClave: '/(auth)/olvidoClave',
  home: "/(app)/(tabs)/(inicio)/inicio",
  visitas: "/(app)/(tabs)/(visitas)/lista",
  vistaCargar: "/(app)/(tabs)/(visitas)/cargar",
  vistaPendiente: "/(app)/(tabs)/(visitas)/pendiente",
  vistaPendienteDetalle: "/(app)/(tabs)/(visitas)/[id]",
  visitaEntregar: "/(app)/(tabs)/(visitas)/entregar",
  visitaNovedad: "/(app)/(tabs)/(visitas)/novedad",
  gpsEntregar: "/(app)/(tabs)/(gps)/entregar",
  gpsNovedad: "/(app)/(tabs)/(gps)/novedad",
  perfil: "/(app)/(profile)",
  terminos: "/(app)/(profile)/terminos",
  privacidad: "/(app)/(profile)/privacidad",
  eliminarCuenta: "/(app)/(profile)/eliminar-cuenta"
} as const;
