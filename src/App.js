import React from "react";
import "./App.css";
import User from "./components/User/User";

function App() {
  const [info, setInfo] = React.useState([]);
  const [postsVisible, setPostsVisible] = React.useState(null);
  const [openPosts, setOpentPosts] = React.useState(false);
  const [handlerPopupList, setHandlerPopupList] = React.useState(false);
  const [postActive, setPostActive] = React.useState(null);
  const [postBooleanValue, setPostBooleanValue] = React.useState(false);

  // получаю данные с сервера
  React.useEffect(() => {
    fetch("http://localhost:3000/bd")
      .then((data) => data.json())
      .then((items) => setInfo(items));
  }, []);

  const toggleHandler = (id) => {
    setPostActive(id);
    setPostBooleanValue(!postBooleanValue);
    if (postBooleanValue === true) {
      setPostBooleanValue(false);
      setPostBooleanValue(true);
    } else {
      setPostBooleanValue(!postBooleanValue);
    }
  };

  // открытие постов
  const openListPosts = (id) => {
    setPostsVisible(id);
    if (handlerPopupList === true) {
      setHandlerPopupList(false);
      setHandlerPopupList(true);
      setPostBooleanValue(false);
    } else {
      setHandlerPopupList(!handlerPopupList);
    }
  };

  const handlerPopup = (id) => {
    openListPosts(id);
    setOpentPosts(!openPosts);
  };

  // Закрытие на ESC
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        setHandlerPopupList(false);
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <div className="App">
      <h1 className="App__title">Список пользователей</h1>
      <ul className="users">
        {info &&
          info.map((obj) => (
            <User
              key={`${obj.id}${obj.id}`}
              obj={obj}
              postsVisible={postsVisible}
              handlerPopupList={handlerPopupList}
              postActive={postActive}
              toggleHandler={toggleHandler}
              setPostBooleanValue={setPostBooleanValue}
              postBooleanValue={postBooleanValue}
              handlerPopup={handlerPopup}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
