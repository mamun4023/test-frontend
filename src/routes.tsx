
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"


const SignUp = lazy(() => import("./pages/signup"))
const SignIn = lazy(() => import("./pages/signin"))
const Dashboard = lazy(()=> import('./pages/dashboard'))


const token = localStorage.getItem("token")

export default function Routing() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route path="/" element={<Navigate to= "/sign-up" />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                {/* <Route path= "/dashboard" element={<Dashboard />} /> */}
                <Route element={<PrivateRoutes />}>
                    <Route path= "/dashboard" element={<Dashboard />} />
                   
                </Route>
            </Routes>
        </Suspense>
    )
}

const PrivateRoutes = () => {
    return token ? <Outlet /> : <Navigate to="/sign-up" />
}