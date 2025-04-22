import { useState, useEffect } from "react";

import { auth, database } from "../firebaseConfig";

import Login from "./pages/Login";
import Home from "./pages/Home"

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [])

  return (
    <>
      {user === null ? (
        <Login />
      ) : (
        <Home/>
      )}
    </>
  );
}

export default App;
