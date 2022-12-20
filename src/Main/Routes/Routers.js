import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Navbar, Foother } from "../../presentation/View";
import { Inicio } from "../../presentation/View/Pages/Apps/Licencias";
import {
  Login,
  ErrorCode,
  ContentHeader,
} from "../../presentation/View/Pages/Base";
import ViewAsideApps from "./AsideApps";
import { FragmentData } from "../Utilities/FragmentStorage/FragmentData";
import { Alertas } from "../../presentation/Components";
import {
  RoutesBase,
  RoutesInicio,
  RoutesConfiguraciones,
  RoutesLicencias,
} from "./Apps";

export default class RoutersApp extends Component {
  state = {
    Refresh: false,
  };

  RefreshData = (e) => {
    this.setState({
      Refresh: true,
    });
  };

  render() {
    return (
      <>
        <ValidatorSession AuthLgPress={this.RefreshData} />
      </>
    );
  }
}

function ValidatorSession({ AuthLgPress }) {
  function LogOut() {
    localStorage.clear();
    window.location.reload(false);
  }
  function ValidaTimeOut() {
    const Tme = new FragmentData("MyKingAlex").GtParttnDtLS(
      "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD2",
      "TCrt"
    );
    var DateNow = new Date();
    var DateFin = new Date(JSON.parse(Tme)?.Tme);
    if (DateNow.getTime() > DateFin.getTime()) {
      Alertas("info", "Tiempo de sesión caducada.");
      setTimeout(LogOut, 4000);
    }
  }

  const { pathname } = useLocation();
  const ArrRutas = pathname.split("/");

  const DtLgOne = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Tulg"
  );

  const DtLgTwo = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD2",
    "Frt"
  );

  if (DtLgOne && DtLgTwo) {
    if (JSON.parse(DtLgOne)?.Tk == JSON.parse(DtLgTwo)?.APrf) {
      setInterval(ValidaTimeOut, 10000);
      return (
        <>
          <ToastContainer></ToastContainer>
          <AllRutas ArrRutas={ArrRutas} pathRutas={pathname} />
        </>
      );
    }
  } else {
    return (
      <>
        <ToastContainer></ToastContainer>
        <Login AuthLgPress={AuthLgPress} />
      </>
    );
  }
}

function AllRutas({ ArrRutas, pathRutas }) {
  return (
    <>
      <div className="wrapper">
        <Navbar />

        <ViewAsideApps ArrRutas={ArrRutas} />

        <AllRutasBody ArrRutas={ArrRutas} pathRutas={pathRutas} />

        <Foother name="InnovaDEV" url="#" />
      </div>
    </>
  );
}

function AllRutasBody({ ArrRutas, pathRutas }) {
  const DBRoutes = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Rtlg"
  );

  if (DBRoutes) {
    const ListRoutes = JSON.parse(DBRoutes);
    const SearchRout = ListRoutes.find((e) => e?.myRoute === pathRutas);
    
    if (pathRutas === "/vehiculos-mayores" || pathRutas === "/") {
      return (
        <>
          <Inicio />
        </>
      );
    } 
    else if (SearchRout) {
      return (
        <>
          <div className="content-wrapper">
            <ContentHeader
              ArrRutas={ArrRutas}
              ContentPage={SearchRout?.nameRoute}
            />
            {/* <RoutesInicio />
          <RoutesConfiguraciones /> */}
            <RoutesLicencias />
            <RoutesBase />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="content-wrapper">
            <ContentHeader ArrRutas={ArrRutas} ContentPage={""} />
            <ErrorCode Code="404" />
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="content-wrapper">
          <ContentHeader ArrRutas={ArrRutas} ContentPage={""} />
          <ErrorCode Code="404" />
        </div>
      </>
    );
  }
}
