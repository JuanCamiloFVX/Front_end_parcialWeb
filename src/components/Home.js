import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import login from "./Login";
import { Switch, Route, Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (

    <div className="container">

      <header className="jumbotron">

      <div className="ContainerH">

          <Link to={"/Login"} className="link-Login">
          Iniciar Sesión 
          </Link>
      </div> 
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;