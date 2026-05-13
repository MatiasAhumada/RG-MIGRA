export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/registro",
  CHANGE_PASSWORD: "/cambiar-contrasena",
  CATALOG: "/catalogo",
  DASHBOARD: "/dashboard",
  DASHBOARD_ORDENES: "/dashboard/ordenes",
  ADMIN: "/admin",
  ADMIN_PRODUCTOS: "/admin/productos",
  ADMIN_CLIENTES: "/admin/clientes",
  ADMIN_PEDIDOS: "/admin/pedidos",
  ADMIN_CONFIGURACION: "/admin/configuracion",
} as const;

export const ROUTE_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/login": "Iniciar Sesión",
  "/registro": "Registrarse",
  "/catalogo": "Catálogo",
  "/dashboard": "Mi Panel",
  "/dashboard/ordenes": "Mis Pedidos",
  "/admin": "Administración",
  "/admin/productos": "Productos",
  "/admin/clientes": "Clientes",
  "/admin/pedidos": "Pedidos",
  "/admin/configuracion": "Configuración",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    SESSION: "/api/auth/session",
    CHANGE_PASSWORD: "/api/auth/change-password",
  },
  USERS: "/api/users",
  CLIENTES: "/api/clientes",
  PRODUCTOS: "/api/productos",
  PRODUCTO_VARIANTES: "/api/productos/variantes",
  PEDIDOS: "/api/pedidos",
  ADDRESSES: "/api/addresses",
  DETALLE_PEDIDOS: "/api/detalle-pedidos",
  CATEGORIAS: "/api/categorias",
  MARCAS: "/api/marcas",
} as const;
