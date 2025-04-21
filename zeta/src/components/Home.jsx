import React, { useEffect, useState } from "react";

import { auth, database } from "../../firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import { signOut } from "firebase/auth";

import Post from "./Post";

import "./Home.css";

export default function Home() {

  const [valueText, setValueText] = useState("")
  const [posts, setPosts] = useState([])
  const referenceDB = ref(database, "posts")

  useEffect(() => {
    const listener = onValue(referenceDB, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const formatted = Object.values(data)

        setPosts(formatted)
      } else {
        setPosts([])
      }

    })

    return () => listener()
  }, [])

  const funcPublish = async (event) => {
    event.preventDefault();  
    if(valueText.trim() !== ""){
      const customId = `msg-${auth.currentUser.displayName.toLowerCase().replace(/\s/g, "")}${new Date().getTime()}${Math.floor(Math.random() * 1000)}` // Você pode personalizar isso se quiser
      const newPostRef = ref(database, `posts/${customId}`)
      
      await set(newPostRef, {
        id: customId,
        user: auth.currentUser.displayName,
        textPost: valueText,
        relesead: new Date().toISOString(),
        releseadLocale: new Date().toLocaleString(),
        comments: []
      })
      
      setValueText("") // limpa o input
    }
  }

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
        <div className="mainContainer">
          <form>
            <textarea
              name="writePost"
              id="iWritePost"
              placeholder="Write here your thought ..."
              value={valueText}
              onChange={(e) => {setValueText(e.target.value)}}
            ></textarea>
            <button id="btnPublish" onClick={(e) => {funcPublish(e)}}>Publish</button>
          </form>

          <div className="posts">
            {posts.map((post, index) => {
              return <Post user={post.user} text={post.textPost} relesead={post.releseadLocale} id={post.id} key={index}/>
            })}
          </div>
        </div>
      </main>
    </section>
  );
}
