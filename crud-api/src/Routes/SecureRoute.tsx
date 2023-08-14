import { Navigate, Outlet } from "react-router-dom";

const SecureRoute = () => {
  let isLoggedIn: any = localStorage.getItem("IsLoggedIn");
  if (typeof isLoggedIn === "object") {
    isLoggedIn = Boolean(isLoggedIn);
  }
  console.log(isLoggedIn);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/" />}</>;
};

export default SecureRoute;
