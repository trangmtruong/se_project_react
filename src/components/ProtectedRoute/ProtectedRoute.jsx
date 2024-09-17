import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // If user is NOT logged in, return a Navigate
    //component that sends the user to /
    return <Navigate to="/" replace />;
  }

  //Otherwise, render the protected roite's child component
  return children;
}

export default ProtectedRoute;
