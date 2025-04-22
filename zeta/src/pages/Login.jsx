import React from "react";

import { auth } from "../../firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import iconGoogle from "../assets/icon-google.svg";
import "./Login.css";

export default function Login() {
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  function loginGoogle() {
    console.log("click");
    signInWithPopup(auth, providerGoogle)
      .then((res) => {
        console.log("Login realizado com sucesso", res.user);
      })
      .catch((error) => {
        console.log("Erro ao fazer login", error);
      });
  }

  return (
    <section id="login">
      <div className="loginHeader">
        <h1>Welcome to Zeta</h1>
        <p>Here your thought is important.</p>
      </div>

      <div className="waysToEntry">
        <h4>Entry with</h4>
        <div className="buttons">
          <button onClick={loginGoogle}>
            <img src={iconGoogle} alt="Entry with Google" />
            Google
          </button>
        </div>
      </div>
    </section>
  );
}
