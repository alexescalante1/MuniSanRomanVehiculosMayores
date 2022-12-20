import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
const backgroundImageURL = require("../../../../Components/img/FONDO10.jpg");

export class Inicio extends Component {
  render() {
    return (
      <>
        {/* Content Wrapper. Contains page content */}
        <div
          className="content-wrapper"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url(${backgroundImageURL})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <section className="content">
            <div className="container-fluid">
              <div style={{ height: "600px" }}>
                <div style={{ paddingTop: "250px" }}>
                  <h1 style={{textAlign: "center", color: "white", fontSize: "40px", fontWeight: "bold"}}>MUNICIPALIDAD PROVINCIAL DE SAN ROMAN</h1>
                  <h1 style={{margin: '20px', textAlign: "center", color: "white", fontSize: "20px", fontWeight: "bold"}}>Ingrese a los módulo para requerimientos y cuadros de necesidades, si no tienen una cuenta de usuario debe coordinar con el encargado en la oficina de Abastecimientos</h1>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1">
                      <i className="fas fa-cog" />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Mantenimiento</span>
                      <span className="info-box-number">
                        10
                        <small>%</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1">
                      <i className="fas fa-thumbs-up" />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Autorizaciones</span>
                      <span className="info-box-number">12</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                {/* fix for small devices only */}
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i className="fas fa-map" />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Rutas</span>
                      <span className="info-box-number">2</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1">
                      <i className="fas fa-users" />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Usuarios</span>
                      <span className="info-box-number">8</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}
