const Profile = () => import("./VProfile")
export const profileRoutes = [
    {
        path: "/profile",
        name: "profile",
        meta: {
            transition: "slide-out",
            prevRoute: true,
            permissions: ['auth']
        },
        component: Profile
    },
]