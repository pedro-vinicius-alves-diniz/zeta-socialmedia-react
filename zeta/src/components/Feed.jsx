import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { auth, database } from "../../firebaseConfig";
import { set, ref, onValue } from "firebase/database";

import "./Feed.css";

export default function Feed() {
  const [valueText, setValueText] = useState("");
  const [posts, setPosts] = useState([]);
  const referenceDB = ref(database, "posts");

  useEffect(() => {
    const listener = onValue(referenceDB, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.values(data);

        setPosts(formatted);
      } else {
        setPosts([]);
      }
    });

    return () => listener();
  }, []);

  const funcPublish = async (event) => {
    event.preventDefault();
    if (valueText.trim() !== "") {
      const customId = `msg-${auth.currentUser.displayName
        .toLowerCase()
        .replace(/\s/g, "")}${new Date().getTime()}${Math.floor(
        Math.random() * 1000
      )}`; // Você pode personalizar isso se quiser
      const newPostRef = ref(database, `posts/${customId}`);

      await set(newPostRef, {
        id: customId,
        user: auth.currentUser.displayName,
        textPost: valueText,
        relesead: new Date().toISOString(),
        releseadLocale: new Date().toLocaleString(),
        emailUser: auth.currentUser.email,
      });

      setValueText(""); // limpa o input
    }
  };
  return (
    <div className="mainContainer">
      <form className="formFeed">
        <textarea
          name="writePost"
          id="iWritePost"
          placeholder="Write here your thought ..."
          value={valueText}
          onChange={(e) => {
            setValueText(e.target.value);
          }}
        ></textarea>
        <button
          id="btnPublish"
          onClick={(e) => {
            funcPublish(e);
          }}
        >
          Publish
        </button>
      </form>

      <div className="posts">
        {posts.map((post, index) => {
          return (
            <Post
              user={post.user}
              text={post.textPost}
              relesead={post.releseadLocale}
              id={post.id}
              emailUser={post.emailUser}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
