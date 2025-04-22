import React from "react";
import { auth, database } from "../../firebaseConfig";
import { remove, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

import { MdDeleteForever } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";
import "./Post.css";

let userV, releseadV, textV, idV;

export default function Post({ user, relesead, text, id, emailUser }) {
  const navigate = useNavigate();

  return (
    <div id="post">
      <header className="headerPost">
        <p>
          {user}{" "}
          {auth.currentUser.email === emailUser && (
            <span className="badgeMe">Me</span>
          )}
        </p>
        <p>{relesead}</p>
      </header>

      <main className="bodyPost">
        <p id="textPost">{text}</p>
      </main>

      <footer className="footerPost">
        <button
          onClick={() => {
            userV = user;
            releseadV = relesead;
            textV = text;
            idV = id;
            navigate("/comment");
          }}
        >
          <LiaCommentSolid className="btnComments" />
        </button>

        {auth.currentUser.displayName === user && (
          <button
            onClick={() => {
              const refRemove = ref(database, `posts/${id}`);
              console.log(refRemove);

              get(refRemove)
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    return remove(refRemove);
                  } else {
                    console.log("Post não encontrado");
                  }
                })
                .catch((error) => {
                  console.log("Erro ao remover post", error);
                });
            }}
          >
            <MdDeleteForever className="btnDelete" />
          </button>
        )}
      </footer>
    </div>
  );
}

export { userV, releseadV, textV, idV };
