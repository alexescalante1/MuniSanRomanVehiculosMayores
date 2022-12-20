import React from "react";
import imagen from "../../Components/img/axmpsrfooter.png";
import imagenHeader from "../../Components/img/axmpsrheader.png";
import TUCPlantilla2 from "./TUCPlantilla2";
const TUCPlantilla = ({ dataInspeccion }) => {
  console.log("DESDE IMPRIMIR DATA INSPECCION");
  console.log(dataInspeccion);
  return (
    <>
      {dataInspeccion.map((element) => {
        return (
          <div>
            {
              <>
                <img src={imagenHeader} alt="HeaderDocumento" />
                <h1 className="text-center text-lg font-bold -mt-8">
                  CERTIFICACION VEHICULAR - BIOSEGURIDAD - COVID 19
                </h1>
                <table class="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="font-bold text-gray-800 bg-blue-50"
                      >
                        LUGAR
                      </th>
                      <td className="">{element.cLugar}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="bg-blue-50" scope="row">
                        FECHA
                      </th>
                      <td>{element.dFecha}</td>
                      <th className="bg-blue-50" scope="row">
                        N° CERTIFICADO
                      </th>
                      <td>{element.nCertificado}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="2">
                        EMPRESA
                      </th>
                      <th className="bg-blue-50" scope="row">
                        RUC
                      </th>
                      <td>{element.nRuc}</td>
                    </tr>
                    <tr>
                      <td colspan="4">{element.cEmpresa}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="4">
                        REPRESENTANTE DE LA EMPRESA
                      </th>
                    </tr>
                    <th className="bg-blue-50" scope="row" colspan="1">
                      NOMBRE
                    </th>
                    <td colspan="3">{element.cNomCompletoRepresentante}</td>
                    <tr>
                      <th className="bg-blue-50" scope="row">
                        DNI
                      </th>
                      <td>{element.nDniRepresentante}</td>
                      <th className="bg-blue-50" scope="row">
                        N CELULAR
                      </th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="4">
                        PROPIETARIO
                      </th>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row">
                        NOMBRE
                      </th>
                      <td>{element.cNomCompletoPropietario}</td>
                      <th className="bg-blue-50" scope="row">
                        N° DNI
                      </th>
                      <td>{element.nDniPropietario}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row">
                        DIRECCION
                      </th>
                      <td></td>
                      <th className="bg-blue-50" scope="row">
                        N CELULAR
                      </th>
                      <td>{element.nNumCelularPropietario}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="2">
                        CONDUCTOR
                      </th>
                      <th className="bg-blue-50" scope="row">
                        N° LICENCIA
                      </th>
                      <th className="bg-blue-50">CAT</th>
                    </tr>
                    <tr>
                      <td>{element.nDniConductor}</td>
                      <td>{element.cNomCompletoConductor}</td>
                      <td>{element.nNumLicenciaConductor}</td>
                      <td>{element.cLicenciaCategoriaConductor}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="2">
                        VEHICULO
                      </th>
                      <th className="bg-blue-50" scope="row">
                        SERVICIO
                      </th>
                      <th className="bg-blue-50"></th>
                    </tr>
                    <tr>
                      <td>{element.cPlacaVehiculo}</td>
                      <td>{element.cDetalleVehiculo} </td>
                      <td>{element.cServicioVehiculo}</td>
                      <td>Af-2441608</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="0.5">
                        DISTRITO
                      </th>
                      <td>{element.cDistrito}</td>
                      <th className="bg-blue-50" scope="row" colspan="0.5">
                        PROVINCIA
                      </th>
                      <td>{element.cProvincia}</td>
                    </tr>
                    <tr>
                      <th className="bg-blue-50" scope="row" colspan="2">
                        DEPARTAMENTO
                      </th>
                      <td colspan="2">{element.cDepartamento}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="mt-3 mb-1 font-bold">CERTIFICA LO SIGUIENTE:</h2>
                <TUCPlantilla2 />
                <img src={imagen} alt="FooterDocumento" />
              </>
            }
          </div>
        );
      })}
    </>
  );
};

export default TUCPlantilla;
