import React from "react";
import IMG_LOGO from "../../Components/img/es_juliaca.png";
import { QRCodeSVG } from "qrcode.react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { height } from "@mui/system";

export const TUCModelPrintFrontal = ({ data }) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        {/* <div style={{ marginTop: "33px" }}></div> */}
        <Row>
          {React.Children.toArray(
            data[0]?.data.map((item) => (
              <>
                <CardTUCFronta TucItem={item} />
              </>
            ))
          )}
        </Row>
      </div>
    </>
  );
};

export const TUCModelPrintAtras = ({ data }) => {
  console.log(data[0]?.data.length);
  let DATA_TRAS = [];

  for (let i = 1; i < data[0]?.data.length; i += 2) {
    DATA_TRAS.push({
      ID: data[0]?.data[i].ID,
      PUNTO_PARTIDA: data[0]?.data[i].PUNTO_PARTIDA,
      RETORNO: data[0]?.data[i].RETORNO,
    });
    DATA_TRAS.push({
      ID: data[0]?.data[i - 1].ID,
      PUNTO_PARTIDA: data[0]?.data[i - 1].PUNTO_PARTIDA,
      RETORNO: data[0]?.data[i - 1].RETORNO,
    });
  }
  if (data[0]?.data.length % 2 != 0 && data[0]?.data.length != undefined) {
    DATA_TRAS.push({
      ID: -1000,
      PUNTO_PARTIDA: "null",
      RETORNO: "null",
    });
    DATA_TRAS.push({
      ID: data[0]?.data[data[0]?.data.length - 1].ID,
      PUNTO_PARTIDA: data[0]?.data[data[0]?.data.length - 1].PUNTO_PARTIDA,
      RETORNO: data[0]?.data[data[0]?.data.length - 1].RETORNO,
    });
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        {/* <div style={{ marginTop: "33px" }}></div> */}
        <Row>
          {React.Children.toArray(
            DATA_TRAS.map((item) => (
              <>
                <CardTUCAtras TucItem={item} />
              </>
            ))
          )}
        </Row>
      </div>
    </>
  );
};

export const CardTUCFronta = ({ TucItem }) => {
  const backgroundImageURL = require("../../Components/img/TUC_FRONT_2.png");
  const containerStyle = {
    //backgroundColor: "#CBCBCB",
    height: "298px",
    //backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: "contain",
    paddingLeft: "15px",
    paddingRight: "13px",
  };
  return (
    <>
      <Col
        xs={6}
        md={6}
        style={{
          fontWeight: "bold",
          //backgroundColor: "red",
          paddingLeft: "28px",
          paddingRight: "28px",
          //marginBottom: "33px",
          fontSize: "14px",
          height: "410.00px",
        }}
      >
        <div style={containerStyle}>
          <Row>
            {/* <Col xs={2} md={2}>
              <img
                src={IMG_LOGO}
                alt="HeaderDocumento"
                style={{ height: "65px", alignItems: "center" }}
              />
            </Col> */}
            <Col xs={10} md={10}>
              {/* <p style={{ fontSize: "10px", marginBottom: "-5px" }}>
                Municipalidad Provincial de San Román
              </p>
              <p style={{ fontSize: "9px", marginBottom: "-5px" }}>
                GERENCIA DE TRANSPORTES Y SEGURIDAD VIAL
              </p>
              <p style={{ fontSize: "10px", marginBottom: "-5px" }}>
                Sub Gerencia de Regulación del Transporte en
              </p>
              <p style={{ fontSize: "10px", marginBottom: "-5px" }}>
                Vehículos mayores
              </p>
              <p style={{ fontSize: "8px", marginBottom: "-5px" }}>
                D.S 017-2009-MTC
              </p>
              <p style={{ fontSize: "13px", marginBottom: "10px" }}>
                TARJETA ÚNICA DE CIRCULACIÓN
              </p> */}
            </Col>
            <Col xs={2} md={2}>
              <QRCodeSVG
                value={
                  TucItem.RAZON_SOCIAL +
                  " - " +
                  TucItem.RESOLUCION +
                  " - " +
                  new Date().getFullYear()
                }
                style={{ width: "100%", height: "60px" }}
              />
            </Col>
          </Row>

          <p>
            <span style={{ color: "#FF5900", marginRight: "30px" }}>
              {TucItem.ID}
            </span>
            <span style={{ marginRight: "10px" }}>Resolución:</span>
            <span style={{ color: "#61ABFF", marginRight: "10px" }}>
              {TucItem.RESOLUCION}
            </span>
          </p>
          <hr />
          <p>
            <span style={{ marginRight: "10px" }}>Razón Social:</span>
            <span style={{ color: "#61ABFF", marginRight: "10px" }}>
              {TucItem.RAZON_SOCIAL}
            </span>
          </p>
          <hr />
          <Row>
            <Col xs={6} md={6} style={{ fontSize: "13px" }}>
              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Placa:</span>
                <span
                  style={{
                    color: "#FF5900",
                    marginRight: "10px",
                    fontSize: "17px",
                  }}
                >
                  {TucItem.PLACA}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Categoría:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.CATEGORIA}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Marca:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.MARCA}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Modelo:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.MODELO}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Color:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.COLOR}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Motor:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.MOTOR}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Exped:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.EXPEDIDO}
                </span>
              </p>
            </Col>
            <Col xs={6} md={6} style={{ fontSize: "13px" }}>
              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Placa Ant:</span>
                <span style={{ color: "#FF5900", marginRight: "10px" }}>
                  {TucItem.PLACA_ANT}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Año de Fab:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.ANIO_DE_FAB}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Asientos:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.ASIENTOS}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>P. Neto:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.P_NETO}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Partida Reg:</span>
                <span style={{ color: "#61ABFF", marginRight: "10px" }}>
                  {TucItem.PARTIDA_REG}
                </span>
              </p>

              <p style={{ marginBottom: "-5px" }}>
                <span style={{ marginRight: "10px" }}>Hasta:</span>
                <span style={{ color: "#FF5900", marginRight: "10px" }}>
                  {TucItem.HASTA}
                </span>
              </p>
            </Col>
          </Row>

          <Row
            style={{
              fontSize: "8px",
              textAlign: "center",
              position: "absolute",
              bottom: "130px",
              width: "410px",
            }}
          >
            <Col xs={6} md={6}>
              <p style={{ marginBottom: "-3px" }}>
                ABOG. ROLANDO YAPO APAZA
              </p>
              <p>(E)SUB GERENTE DE REGUL. DE TRANSP. EN VEH. MAYORES</p>
            </Col>
            <Col xs={6} md={6}>
              <p style={{ marginBottom: "-3px" }}>OSWALDO VIDAL CUSILAYME GARCÍA</p>
              <p>(E)DPTO FISCALIZACION E INSPECCION DE SEGURIDAD</p>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export const CardTUCAtras = ({ TucItem }) => {
  const backgroundImageURL = require("../../Components/img/TUC_BACK_0.png");
  const containerStyle = {
    //backgroundColor: "#CBCBCB",
    height: "298px",
    //backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: "contain",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  return (
    <>
      <Col
        xs={6}
        md={6}
        style={{
          fontWeight: "bold",
          //backgroundColor: "red",
          paddingLeft: "28px",
          paddingRight: "28px",
          //marginBottom: "33px",
          fontSize: "14px",
          height: "410.00px",
        }}
      >
        <div style={containerStyle}>
          <CardTUCAtrasBody TucItem={TucItem} />
        </div>
      </Col>
    </>
  );
};

export const CardTUCAtrasBody = ({ TucItem }) => {
  if (TucItem.ID != -1000) {
    return (
      <>
        <div style={{ height: "35px" }}></div>

        <p style={{ color: "#FF5900" }}>1. PUNTO DE PARTIDA</p>

        <p style={{ fontSize: "8px", textAlign: "justify" }}>
          {TucItem.PUNTO_PARTIDA}
        </p>

        <p style={{ color: "#FF5900" }}>2. RETORNO</p>

        <p style={{ fontSize: "8px", textAlign: "justify" }}>
          {TucItem.RETORNO}
        </p>
      </>
    );
  } else {
    return <></>;
  }
};
