import { useState, useEffect } from "react";

import { auth, database } from "../firebaseConfig";

import Login from "./components/Login";
import Home from "./components/Home"

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  console.log(user)

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
