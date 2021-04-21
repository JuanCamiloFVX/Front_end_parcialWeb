import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>nombre:</strong> {currentUser.nombre}
      </p>
      <p>
        <strong>apellido:</strong> {currentUser.apellido}
      </p>
      <p>
        <strong>dni:</strong> {currentUser.dni}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
    </div>
  );
};

export default Profile;