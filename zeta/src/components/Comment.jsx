import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { userV, releseadV, textV, idV } from "./Post";
import { auth, database } from "../../firebaseConfig";
import { set, ref, onValue, remove, get } from "firebase/database";

import { FaArrowCircleLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

import "./Comment.css";

export default function Comment() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);

  const referenceComments = ref(database, `posts/${idV}/comments`);

  useEffect(() => {
    const listener = onValue(referenceComments, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.values(data);

        setComments(formatted);
      } else {
        setComments([]);
      }
    });

    return () => listener();
  }, []);

  // FUNCTION TO PUBLISH A COMMENT
  const publishComment = async (event) => {
    event.preventDefault();
    console.log("clicked");

    if (value.trim() !== "") {
      const customId = `cmmt-${auth.currentUser.displayName
        .toLowerCase()
        .replace(/\s/g, "")}${new Date().getTime()}${Math.floor(
        Math.random() * 1000
      )}`;

      const newCommentRef = ref(database, `posts/${idV}/comments/${customId}`);

      await set(newCommentRef, {
        id: customId,
        user: auth.currentUser.displayName,
        textComment: value,
        relesead: new Date().toISOString(),
        releseadLocale: new Date().toLocaleString(),
        emailUser: auth.currentUser.email,
      });

      setValue("");
    }
  };

  // FUNCTION TO DELETE A COMMENT
  const deleteComment = (idComment) => {
    const refRemove = ref(database, `posts/${idV}/comments/${idComment}`);
    get(refRemove)
      .then((snapshot) => {
        if (snapshot.exists()) {
          return remove(refRemove);
        } else {
          console.log("Comment not finded");
        }
      })
      .catch((error) => {
        console.log("Erro ao remover o comentário", error);
      });
  };

  return (
    <div id="commentContainer">
      <header>
        <FaArrowCircleLeft
          className="btnBack"
          onClick={() => {
            navigate("/");
          }}
        />
      </header>

      {textV ? (
        <main>
          <div className="headerBody">
            <h2>{userV}</h2>
            <p>{releseadV}</p>
          </div>

          <p className="textBody">{textV}</p>

          <div className="commentsContainer">
            <div className="commentsContext">
              {comments.length === 0 ? ( // CHECK IF IT HAVE AT LEAST ONE COMMENT
                <p>There are not comments</p> // APPEAR IF THEHE'S NOT COMMENT
              ) : (
                comments.map((comment, index) => {
                  return (
                    <div key={index} className="comment">
                      <div className="commentHeader">
                        <h4>{comment.user}</h4>
                        <p>{comment.releseadLocale}</p>
                      </div>
                      <p className="textComment">{comment.textComment}</p>
                      <div className="footerComment">
                        {auth.currentUser.displayName === comment.user && ( // IF THE COMMENT IS FROM THE USER, SO APPEAR THE DELETE BUTTON
                          <button onClick={() => {deleteComment(comment.id)}}>
                            <MdDeleteForever className="btnDelete" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <form className="inputCommentContainer">
              <textarea
                name="inputComment"
                id="iInputComment"
                placeholder="Write here your comment ..."
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              ></textarea>
              <button
                onClick={(e) => {
                  publishComment(e);
                }}
              >
                <IoSend />
              </button>
            </form>
          </div>
        </main>
      ) : (
        <p>There are not a post</p>
      )}
    </div>
  );
}
