import "./Post.css";
import { MdDeleteForever } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";

import { auth, database } from "../../firebaseConfig";

import { remove, ref, get } from "firebase/database";

import React from "react";

export default function Post({ user, relesead, text, id, emailUser }) {
  return (
    <div id="post">
      <header className="headerPost">
        <p>{user} {auth.currentUser.email === emailUser && (<span className="badgeMe">Me</span>)}</p>
        <p>{relesead}</p>
      </header>

      <main className="bodyPost">
        <p id="textPost">{text}</p>
      </main>

      <footer className="footerPost">
        <button>
          <LiaCommentSolid className="btnComments" />
        </button>

        {auth.currentUser.displayName === user && (
          <button
            onClick={() => {
              document.getElementById("confirmDelete").style.display = "flex"
            }}
          >
            <MdDeleteForever className="btnDelete" />
          </button>
        )}
        <div id="confirmDelete" className="invisible">
          <p>Are you sure you want to delete this post?</p>
          <div>
            <button
              onClick={() => {
                document.getElementById("confirmDelete").style.display = "none";
              }}
            >
              No
            </button>
            <button
              onClick={() => {
                const refRemove = ref(database, `posts/${id}`);

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

                  document.getElementById("confirmDelete").style.display = "none";
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
