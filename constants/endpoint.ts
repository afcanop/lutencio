const URL_BASE = "http://reddocapi.online";
const URL_SUBDOMINIO = "http://subdominio.reddocapi.online";

const APIS = {
  seguridad: {
    login: `${URL_BASE}/seguridad/login/`,
    usuario: `${URL_BASE}/seguridad/usuario/`,
    verificar: `${URL_BASE}/seguridad/usuario/verificar/`,
    cambioClaveSolicitar: `${URL_BASE}/seguridad/usuario/cambio-clave-solicitar/`,
    verificacion: `${URL_BASE}/seguridad/verificacion/`,
    cambioClaveVerificar: `${URL_BASE}/seguridad/usuario/cambio-clave-verificar/`,
    cambioClave: `${URL_BASE}/seguridad/usuario/cambio-clave/`,
  },
  entrega: {
    verticalEntrega: `${URL_BASE}/vertical/entrega/`,
    ruteoVisitaEntrega: `${URL_SUBDOMINIO}/ruteo/visita/entrega/`,
  },
  general: {
    funcionalidadLista: `${URL_SUBDOMINIO}/general/funcionalidad/lista/`,
  },
  ruteo: {
    ubicacion: `${URL_SUBDOMINIO}/ruteo/ubicacion/`,
    visitaEntrega: `${URL_SUBDOMINIO}/ruteo/visita/entrega/`,
  },
};

export default APIS;
