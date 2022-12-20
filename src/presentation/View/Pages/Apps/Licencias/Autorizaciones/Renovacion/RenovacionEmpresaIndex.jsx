import React, { useEffect } from "react";
import { useState } from "react";
import DataTableAutorizaciones from "../Autorizaciones/DataTableAutorizaciones";

const RenovacionEmpresaIndex = () => {
  const [actualizar, setActualizar] = useState(0);
  const ActualizarCard = async (e) => {
    e.preventDefault();
    setActualizar(actualizar + 1);
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div className="card-header">
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="card-refresh"
                      data-source="widgets.html"
                      data-source-selector="#card-refresh-content"
                      data-load-on-init="false"
                      onClick={ActualizarCard}
                    >
                      <i className="fas fa-sync-alt" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="maximize"
                    >
                      <i className="fas fa-expand" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <DataTableAutorizaciones
                    actualizar={actualizar}
                    ActualizarCard={ActualizarCard}
                    lRenovacion={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RenovacionEmpresaIndex;
