import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ErrorCode extends Component {
  render() {
    return (
      <>
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> {this.props.Code}</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning" /> Oops!
                Pagina no encontrada.
              </h3>
              <p>
                We could not find the page you were looking for. Meanwhile, you
                may <Link to={"/"}>return to dashboard</Link> or try using the
                search form.
              </p>
              {/* <form className="search-form">
                  <div className="input-group">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-warning"
                      >
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </form> */}
            </div>
          </div>
        </section>
      </>
    );
  }
}
