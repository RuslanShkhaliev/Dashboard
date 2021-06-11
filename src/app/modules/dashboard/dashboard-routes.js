import Dashboard from "./card-list/CardList";

export const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {
            transition: "slide-out"
        },
        component: Dashboard
    },
]