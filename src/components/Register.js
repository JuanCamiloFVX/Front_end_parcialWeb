import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import login from "./Login";
import AuthService from "../services/auth.service";
import { Switch, Route, Link } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es Requerido!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email Invalido!.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
            EL Nombre de usuario debe tener entre 5 y 20 caracteres
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 8 y 40 caracteres.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setNombre(nombre);
  };

  const onChangeApellido = (e) => {
    const apellido = e.target.value;
    setApellido(apellido);
  };

  const onChangeDni = (e) => {
    const dni = e.target.value;
    setDni(dni);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, nombre, apellido, dni).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="Containersub">

      <div className="Containersub2">
        <img
          src="//static7.depositphotos.com/1288351/768/i/600/depositphotos_7689364-stock-photo-ringed-planet.jpg"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeNombre}
                  validations={[required]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="apellido">Apellidos</label>
                <Input
                  type="text"
                  className="form-control"
                  name="apellido"
                  value={apellido}
                  onChange={onChangeApellido}
                  validations={[required]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <Input
                  type="text"
                  className="form-control"
                  name="dni"
                  value={dni}
                  onChange={onChangeDni}
                  validations={[required]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="username">Nombre de Usurario</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              

              <div className="form-group">
                <button className="ButtonG">Registrar</button>
              </div>
            </div>
          )}
       

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>


        <div className="ContainerT2">

        <Link to={"/Login"} className="link-Login">
        Iniciar Sesión 
        </Link>

        </div>



      </div>
    </div>
  );
};

export default Register;