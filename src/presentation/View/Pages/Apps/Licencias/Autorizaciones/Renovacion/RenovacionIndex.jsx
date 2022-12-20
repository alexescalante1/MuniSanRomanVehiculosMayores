import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export function RenovacionIndex() {
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
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title"></h3>
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
                  </div>
                </div>
                <div className="card-body">
                  <TextField id="outlined-basic" label="CONSULTAR TUC" variant="outlined" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
