import { Routes, Route } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

import Feed from "../components/Feed";
import Comment from "../components/Comment";

import "./Home.css";

export default function Home() {


  return (
    <section id="Home">
      <header>
        <div className="headerContainer">
          <h2>Zeta</h2>
          <button
            onClick={() => {
              document.getElementById("confirmLogout").style.display = "flex";
            }}
          >
            Logout
          </button>
          <div id="confirmLogout" className="invisible">
            <p>Are you sure you want to logout?</p>
            <div>
              <button
                onClick={() => {
                  document.getElementById("confirmLogout").style.display =
                    "none";
                }}
              >
                No
              </button>
              <button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
    

          <Routes>
            <Route path="/" element={<Feed />}/>
            <Route path="/comment" element={<Comment />}/>
          </Routes>
          
      </main>
    </section>
  );
}
