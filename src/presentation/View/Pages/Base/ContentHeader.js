import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ContentHeader extends Component {
  render() {
    return (
      <>
        <section className="content-header">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0" style={{ fontWeight: "bold" }}>
                    {this.props.ContentPage.toUpperCase()}
                  </h1>
                </div>
                <div className="col-sm-6">
                  <NavHeader ArrRutas={this.props.ArrRutas} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export function NavHeader({ ArrRutas }) {
  let DBRoutesContentHeader = [];

  if (ArrRutas) {
    for (let i = 1; i < ArrRutas.length - 1; i++) {
      DBRoutesContentHeader.push(ArrRutas[i]);
    }
  }

  const RealRoute = ArrRutas[ArrRutas.length - 1]
    .replace("-", " ")
    .toUpperCase();

  return (
    <>
      <ol className="breadcrumb float-sm-right">
        {React.Children.toArray(
          DBRoutesContentHeader.map((item) => (
            <>
              <ListNavHeader ruta={item} />
            </>
          ))
        )}
        <li className="breadcrumb-item active">{RealRoute}</li>
      </ol>
    </>
  );
}

export function ListNavHeader({ ruta }) {
  return (
    <>
      <li className="breadcrumb-item">
        <Link to={ruta}>{ruta.replace("-", " ").toUpperCase()}</Link>
      </li>
    </>
  );
}
