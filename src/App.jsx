import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import AddFood from "./AddFood.jsx";
import ShowFood from "./ShowFood.jsx"; // Import new component
import "./App.css";

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInType, setLoggedInType] = useState(null);

  // Check session storage on load
  useEffect(() => {
    const userType = sessionStorage.getItem("loggedInType");
    if (userType) {
      setIsLoggedIn(true);
      setLoggedInType(userType);
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (user) => {
    sessionStorage.setItem("loggedInUser", user.name);
    sessionStorage.setItem("loggedInEmail", user.email);
    sessionStorage.setItem("loggedInPhone", user.phone);
    sessionStorage.setItem("loggedInAdd", user.address);
    sessionStorage.setItem("loggedInType", user.type);
    setIsLoggedIn(true);
    setLoggedInType(user.type);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setLoggedInType(null);
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="btn btn-danger mb-3">
            Logout
          </button>
          {loggedInType === "NGO" ? <ShowFood /> : <AddFood />}
        </>
      ) : isSignUp ? (
        <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
      ) : (
        <LoginForm
          onSwitchToSignUp={() => setIsSignUp(true)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;
