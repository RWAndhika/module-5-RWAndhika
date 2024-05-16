// import { Navigate, Outlet } from "react-router-dom"

// const ProtectedRoute = ({ redirectTo = "/", children }: any) => {
//     const isAllowed = localStorage.getItem('token');
//     if (!isAllowed) {
//         return <Navigate to={redirectTo} />;
//     }
//     return children ? children : <Outlet />;
// };

// export default ProtectedRoute;