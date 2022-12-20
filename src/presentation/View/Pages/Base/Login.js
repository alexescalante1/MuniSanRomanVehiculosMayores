import React, { Component, useRef, useState, useEffect } from "react";
import { ApiContextRequest } from "../../../../Main/Context";
import { Alertas } from "../../../Components";
import {
  InicializacionDT,
  RemoteAuthentication,
  InitConfg,
} from "../../../../Data/UseCases/Base";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export class Login extends Component {
  render() {
    return (
      <>
        <LoginValidator AuthLgPress={this.props.AuthLgPress} />
      </>
    );
  }
}

export const LoginValidator = ({ AuthLgPress }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    Alertas("info", "Procesando...");
    const Access = ApiContextRequest("10000");
    if (Access.cPath != "ErrorDeAcceso") {
      const MenuNavb = ApiContextRequest("10001");
      const MenuAsid = ApiContextRequest("10002");
      try {
        const data = await new InicializacionDT(
          Access.cPath,
          Access.cMethod
        ).GetLoginAuth({
          cUser: user,
          cPassword: pwd,
        });
        //console.log(data);

        if (data?.header?.success === 1) {
          await new InicializacionDT(
            MenuNavb.cPath,
            MenuNavb.cMethod
          ).GetInitConfig(MenuAsid.cPath + "idApp=", MenuAsid.cMethod);
          //AuthLgPress();
          window.location.reload(false);
        } else {
          for (let i = 0; i < data?.header?.errors.length; i++) {
            Alertas("error", data?.header?.errors[i]?.message);
          }
        }
      } catch (e) {}
    } else {
      Alertas("error", "Error de Acceso.");
    }
  };

  
  return (
    <>
      <div
        id="particles-js"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          // background: 'rgba(0, 1, 10, 0.815)',
        }}
      >
        <canvas
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <section>
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <a className="h1">
                  <b>MUNICIPALIDAD </b>SAN ROMAN
                </a>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </div>
              <div className="card-body">
                <p className="login-box-msg">
                  INGRESE SUS CREDENCIALES
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="E-mail"
                          type="email"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          sx={{
                            marginBottom: "10px",
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Password"
                          type="password"
                          id="password"
                          ref={userRef}
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          sx={{
                            marginBottom: "20px",
                          }}
                        />
                        <Button type="submit" variant="contained" fullWidth>
                          INGRESAR
                        </Button>
                      </Box>
                    </div>
                  </div>
                </form>
                <br />
                {/* <p className="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
