import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";



const App = () => {
  
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
     
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="barra-acceso">
            <Link to={"/home"} className="linkHome">
              Inicio
            </Link>
        {currentUser && (
        <div className="perfil">
              
              <Link to={"/profile"} className="linkP">
                {currentUser.username}
              </Link>

              <a href="/login" className="linkC" onClick={logOut}>
                Cerrar sesión
              </a>
            
            </div>
        )}
      </nav>

      <div className="container-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/Login" component={Login} />
          <Route path="/user" component={BoardUser} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </div>
    </div>
  );
};

export default App;