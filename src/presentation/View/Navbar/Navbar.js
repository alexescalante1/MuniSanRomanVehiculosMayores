import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";
import NavbarMessage from "./NavbarMessage";
import NavbarNotification from "./NavbarNotification";
import Button from "@mui/material/Button";
import { RutaProject } from "../../../Main/Config/Variables";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";
import UserTempImg from "../../Components/img/UserTemp.jpg";
import FondoTempImg from "../../Components/img/FondoTemp.jpg";

export class Navbar extends Component {
  render() {
    return (
      <>
        {/* Preloader */}

        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__wobble"
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTELogo"
            height={60}
            width={60}
          />
        </div> */}

        <nav className="main-header navbar navbar-expand navbar-dark">
          <NavbarMenu />

          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
                <NavbarSearch />
            </li>

            <li className="nav-item dropdown">
                <NavbarMessage />
            </li> */}

            {/* 
            <li className="nav-item dropdown">
              <NavbarNotification />
            </li> */}

            <li className="nav-item dropdown">
              <UserOptions />
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="#"
                role="button"
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            {/* 
            <li className="nav-item">
                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    <i className="fas fa-th-large" />
                </a>
            </li> */}
          </ul>
        </nav>
      </>
    );
  }
}

export function UserOptions() {
  let DB;
  const DBDataBase = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR96TU2A5E8Y5FDD1",
    "Udlg"
  );

  if (DBDataBase) {
    DB = JSON.parse(DBDataBase);
  }

  const backgroundImageURL = require("../../Components/img/FondoTemp.jpg");

  const Salir = async () => {
    localStorage.clear();
    window.location.reload(false);
  };
  
  return (
    <>
      <a className="nav-link" data-toggle="dropdown">
        <img
          src={UserTempImg}
          className="img-circle "
          alt="User Image"
          style={{ height: 30 }}
        />
        {/* <span className="hidden-xs">Alex</span> */}
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <div className="card card-widget widget-user">
          <div
            className="widget-user-header text-white perfilPort"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${backgroundImageURL})`,
              paddingBottom: "60%",
              width: "100%",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h5 className="text-right ngrita" style={{ fontSize: 15 }}>
              {DB?.cPrimerNombre + " " + DB?.cSegundoNombre}
            </h5>
            <h5 className="text-right">{DB?.cDocumento}</h5>
          </div>
          <div className="widget-user-image">
            <img className="img-circle" src={UserTempImg} alt="User Avatar" />
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-sm-6 border-right">
                <div className="description-block">
                  <span className="description-text">CELULAR</span>
                  <h5 className="description-header">{DB?.cCelular}</h5>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="description-block">
                  <span className="description-text">E-MAIL</span>
                  <h5 className="description-header">{DB?.cEmail}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Button variant="contained" fullWidth>
          Ver Perfil
        </Button> */}
        <Button
          onClick={() => Salir()}
          variant="contained"
          color="error"
          fullWidth
        >
          Salir
        </Button>
      </div>
    </>
  );
}
