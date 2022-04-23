import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

//Destructuration de Post

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post.id_user}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((usersData) => {
                    if (usersData.id_user === post.id_user)
                      return usersData.photo;
                    else return null;
                  })
                  .join("")
              }
              alt="photo de profil"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="prenom">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((usersData) => {
                        if (usersData.id_user === post.id_user)
                          return usersData.profil_prenom;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.timestamp)}</span>
            </div>
            <p>{post.message}</p>
            {post.picture && (
              <img
                src={post.picture}
                alt="Photo de text"
                className="card-pic"
              />
            )}
          </div>
          <div className="card-footer">
            <div className="comment-icon">
              <img src="./img/icons/message1.svg" alt="comment" />
              {/*<span> {post.comments.length} <span/> */}
            </div>
            <h6>Like Button</h6>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
