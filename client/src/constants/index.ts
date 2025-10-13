import { LayoutDashboard, Package, Plus, Settings } from "lucide-react";

const navBar = [
    {
        name: "Panel ",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Inventario",
        href: "/inventory",
        icon: Package
    },
    {
        name: "Añadir Producto",
        href: "/add-product",
        icon: Plus
    },
    {
        name: "Configuracion",
        href: "/settings",
        icon: Settings
    }
]

export { navBar}