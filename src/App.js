import React from "react";
import "./App.css";
import User from "./components/User/User";

function App() {
  const [info, setInfo] = React.useState([]);
  const [postsVisible, setPostsVisible] = React.useState(null);
  const [handlerPopupList, setHandlerPopupList] = React.useState(false);
  const [postActive, setPostActive] = React.useState(null);
  const [postBooleanValue, setPostBooleanValue] = React.useState(false);
  React.useEffect(() => {
    fetch("http://localhost:3000/bd")
      .then((data) => data.json())
      .then((items) => setInfo(items));
  }, []);

  const toggleHandler = (id) => {
    setPostActive(id);
    setPostBooleanValue(!postBooleanValue);
  };

  const openListPosts = (id) => {
    setInfo(
      info.map((user) => {
        if (user.id === id) {
          setPostsVisible(id);
          setHandlerPopupList(!handlerPopupList);
        }
        return user
      })
    );
  };

  return (
    <div className="App">
      <h1 className="App__title">Список пользователей</h1>
      <ul className="users">
        {info &&
          info.map((obj) => (
            <User
              key={`${obj.id}${obj.id}`}
              obj={obj}
              openListPosts={openListPosts}
              postsVisible={postsVisible}
              handlerPopupList={handlerPopupList}
              postActive={postActive}
              toggleHandler={toggleHandler}
              setPostBooleanValue={setPostBooleanValue}
              postBooleanValue={postBooleanValue}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
