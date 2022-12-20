import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { UsuariosDT } from "../../../../../../Data/UseCases/Apps";
import { ApiContextRequest } from "../../../../../../Main/Context";
import { Alertas } from "../../../../../Components";

export const ViewUsuario = ({ idUsuario }) => {
  const [dataUser, setDataUser] = useState({});
  
  const ObternerData = async (e) => {
    //Alertas("info", "Obteniendo datos");
    const Access = ApiContextRequest("47");
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new UsuariosDT(
          Access.cPath + "?idUsuario=" + idUsuario,
          Access.cMethod
        ).GetUsuario();
        console.log(data);
        if (data?.header?.success) {
          setDataUser(data?.data);
        } else {
          Alertas("error", data?.header?.message);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    ObternerData();
  }, []);

  return (
    <div>
      <div className="mb-12">
        <div className="card-header font-bold uppercase ">
          <span className="font-bold text-lg">INFORMACION DE USUARIO</span>{" "}
          <PersonIcon fontSize="large" className="text-red-800" />
        </div>
        <div className="card-body">
          <div className="justify-between md:flex">
            <div className="text-left">
              <p className="mb-2">
                <span className="text-bold uppercase">
                  NOMBRES Y APELLIDOS:
                </span>{" "}
                {dataUser?.cNombres + " " + dataUser?.cApellidos}
              </p>
              <p className="mb-2">
                <span className="text-bold uppercase">
                  DOCUMENTO DE IDENTIDAD:
                </span>{" "}
                {dataUser?.cDocumento}
              </p>
              {/* <p className="mb-2">
                    <span className="text-bold uppercase">ROL:</span>{" "}
                    {dataUser?.cServicio}
                  </p> */}
              <p className="mb-2">
                <span className="text-bold uppercase">E-MAIL:</span>{" "}
                {dataUser?.cEmail}
              </p>
              <p className="mb-2">
                <span className="text-bold uppercase">NUMERO DE CELULAR:</span>{" "}
                {dataUser?.cCelular}
              </p>
              <p className="mb-2">
                <span className="text-bold uppercase">DIRECCION:</span>{" "}
                {dataUser?.cDireccion}
              </p>
              <p className="mb-2">
                <span className="text-bold uppercase">GENERO:</span>{" "}
                {dataUser?.nGenero == 0 ? "Masculino" : "Femenino"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
