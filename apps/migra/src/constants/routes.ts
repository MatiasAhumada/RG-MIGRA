export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/registro",
  CATALOG: "/catalogo",
  DASHBOARD: "/dashboard",
  DASHBOARD_ORDENES: "/dashboard/ordenes",
  DASHBOARD_PEDIDO: "/dashboard/pedido",
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
  "/dashboard/pedido": "Detalle del Pedido",
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
  },
  USERS: "/api/users",
  CLIENTES: "/api/clientes",
  PRODUCTOS: "/api/productos",
  PEDIDOS: "/api/pedidos",
  ADDRESSES: "/api/addresses",
  DETALLE_PEDIDOS: "/api/detalle-pedidos",
  CATEGORIAS: "/api/categorias",
  MARCAS: "/api/marcas",
} as const;
