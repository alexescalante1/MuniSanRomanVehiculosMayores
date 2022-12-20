import React, { useState, useEffect } from "react";
import { DataTableUsuarios } from "./DataTableUsuarios";

export function MantenimientoIndex() {
  const [actualizar, setActualizar] = useState(0);
  
  const ActualizarCard = () => {
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
                  <DataTableUsuarios actualizar={actualizar} ActualizarCard={ActualizarCard} Tipo={"Editar"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
