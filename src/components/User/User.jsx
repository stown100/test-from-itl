import React from "react";

function User({
  obj,
  postsVisible,
  handlerPopupList,
  postActive,
  toggleHandler,
  postBooleanValue,
  handlerPopup,
}) {
  return (
    <>
      <li className="user" onClick={() => handlerPopup(obj.id)}>
        {obj.user}
      </li>
      <ul
        className={
          postsVisible === obj.id && handlerPopupList ? "posts_active" : "posts"
        }
      >
        {obj.posts.map((post, index) => (
          <li
            onClick={() => toggleHandler(post.id)}
            key={`${post.id}${index}`}
            className={`post ${
              postBooleanValue && postActive === post.id && "post_active"
            }`}
          >
            <p className="post__text">{post.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default User;
