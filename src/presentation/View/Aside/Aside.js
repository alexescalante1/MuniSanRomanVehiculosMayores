import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RutaProject } from "../../../Main/Config/Variables";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";
import IMG_LOGO from "../../Components/img/es_juliaca.png";
import Button from "@mui/material/Button";

export class Aside extends Component {
  render() {
    return (
      <>
        <aside className="main-sidebar sidebar-dark-navy elevation-4">
          <AsideLogo img={IMG_LOGO} name="MUNI SAN ROMAN" />
          <div className="sidebar">
            {/* <AsideUser /> */}
            {/* <AsideSearch /> */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <SelectionMenu nameMenuSelected={this.props.nameMenu} />
              </ul>
            </nav>
          </div>
        </aside>
      </>
    );
  }
}

export function AsideItems({ DB }) {
  return (
    <>
      {React.Children.toArray(
        DB.map((item) => (
          <>
            <AsideItem
              id={item.id}
              type={item.type}
              name={item.name}
              icon={item.icon}
              url={item.url}
              nameSpan={item.nameSpan}
              iconSpan={item.iconSpan}
              active={item.active}
              data={item.data}
            />
          </>
        ))
      )}
    </>
  );
}

export function SelectionMenu({ nameMenuSelected }) {
  let DB = [];
  //   {
  //     nameMenu: "inicio",
  //     dataMenu: [
  //       {
  //         type: "nav-treeview",
  //         name: "Dashboard",
  //         icon: "nav-icon fas fa-tachometer-alt",
  //         url: "",
  //         nameSpan: "",
  //         iconSpan: "",
  //         active: true,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Dashboard v1",
  //             icon: "far fa-circle nav-icon",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             type: "nav-item",
  //             name: "Dashboard v2",
  //             icon: "far fa-circle nav-icon",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Inline",
  //                 icon: "far fa-circle nav-icon text-info",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: true,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "uPlot",
  //                 icon: "far fa-circle nav-icon text-success",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         type: "nav-group",
  //         name: "GRUPO UNO",
  //         icon: "", //SIN ICONO
  //         url: "",
  //         nameSpan: "",
  //         iconSpan: "",
  //         active: false,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Gallery",
  //             icon: "nav-icon far fa-image",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             type: "nav-item",
  //             name: "Calendar",
  //             icon: "nav-icon fas fa-calendar-alt",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //         ],
  //       },
  //       {
  //         type: "nav-group",
  //         name: "EXAMPLE",
  //         icon: "", //SIN ICONO
  //         url: "",
  //         active: false,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Widgets",
  //             icon: "nav-icon fas fa-th",
  //             url: "/inicio/perfiles",
  //             nameSpan: "New",
  //             iconSpan: "right badge badge-danger",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Layout Options",
  //             icon: "nav-icon fas fa-copy",
  //             url: "",
  //             nameSpan: "6",
  //             iconSpan: "badge badge-info right",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "Top Navigation",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Boxed",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Fixed",
  //                 icon: "far fa-circle nav-icon text-info",
  //                 url: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     nameMenu: "config",
  //     dataMenu: [
  //       {
  //         type: "nav-treeview",
  //         name: "Configuracion",
  //         icon: "nav-icon fas fa-tachometer-alt",
  //         url: "",
  //         nameSpan: "",
  //         iconSpan: "",
  //         active: true,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Registro Usuario",
  //             icon: "far fa-circle nav-icon",
  //             url: "/usuario/registro",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             type: "nav-item",
  //             name: "Dashboard v2",
  //             icon: "far fa-circle nav-icon",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     nameMenu: "usuario",
  //     dataMenu: [
  //       {
  //         type: "nav-treeview",
  //         name: "Usuarios",
  //         icon: "nav-icon fas fa-tachometer-alt",
  //         url: "",
  //         nameSpan: "",
  //         iconSpan: "",
  //         active: true,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Registro Usuario",
  //             icon: "far fa-circle nav-icon",
  //             url: "/usuario/registro",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             type: "nav-item",
  //             name: "Dashboard v2",
  //             icon: "far fa-circle nav-icon",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     nameMenu: "perfil",
  //     dataMenu: [
  //       {
  //         type: "nav-treeview",
  //         name: "perfiles",
  //         icon: "nav-icon fas fa-tachometer-alt",
  //         url: "",
  //         nameSpan: "",
  //         iconSpan: "",
  //         active: true,
  //         data: [
  //           {
  //             type: "nav-item",
  //             name: "Registro Usuario",
  //             icon: "far fa-circle nav-icon",
  //             url: "/usuario/registro",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             type: "nav-item",
  //             name: "Dashboard v2",
  //             icon: "far fa-circle nav-icon",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: null,
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //           {
  //             id: 1,
  //             type: "nav-treeview",
  //             name: "Charts",
  //             icon: "nav-icon fas fa-chart-pie",
  //             url: "",
  //             nameSpan: "",
  //             iconSpan: "",
  //             active: false,
  //             data: [
  //               {
  //                 type: "nav-item",
  //                 name: "ChartJS",
  //                 icon: "far fa-circle nav-icon text-danger",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //               {
  //                 type: "nav-item",
  //                 name: "Flot",
  //                 icon: "far fa-circle nav-icon text-warning",
  //                 url: "",
  //                 nameSpan: "",
  //                 iconSpan: "",
  //                 active: false,
  //                 data: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const DBMnList = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Mnlg"
  );

  if (DBMnList) {
    DB = JSON.parse(DBMnList);
  }
  console.log(DB);
  for (let i = 0; i < DB.length; i++) {
    if (DB[i]?.nameMenu.toUpperCase() == nameMenuSelected.toUpperCase()) {
      return (
        <>
          <AsideItems DB={DB[i].dataMenu} />
        </>
      );
    }
  }
}

export function AsideItem({
  id,
  type,
  name,
  icon,
  url,
  nameSpan,
  iconSpan,
  active,
  data,
}) {
  switch (type) {
    case "nav-treeview":
      return (
        <>
          <AsideNavTreeview
            name={name}
            icon={icon}
            nameSpan={nameSpan}
            iconSpan={iconSpan}
            active={active}
            data={data}
          />
        </>
      );
    case "nav-item":
      return (
        <>
          <AsideNavItem
            name={name}
            icon={icon}
            url={url}
            nameSpan={nameSpan}
            iconSpan={iconSpan}
            active={active}
          />
        </>
      );
    case "nav-group":
      return (
        <>
          <AsideNavGroup name={name} data={data} />
        </>
      );
    default:
      <></>;
      break;
  }
}

export function AsideNavGroup({ name, icon, data }) {
  return (
    <>
      <li className="nav-header">{name}</li>
      {React.Children.toArray(
        data.map((item) => (
          <>
            <AsideItem
              type={item.type}
              name={item.name}
              icon={item.icon}
              nameSpan={item.nameSpan}
              iconSpan={item.iconSpan}
              url={item.url}
              active={item.active}
              data={item.data}
            />
          </>
        ))
      )}
    </>
  );
}

export function AsideNavItem({ name, icon, url, nameSpan, iconSpan, active }) {
  return (
    <>
      <li className="nav-item">
        <Link
          to={url}
          className={"nav-link " + (active == true ? "active" : "")}
        >
          <i className={icon} />
          <p>
            {name}
            <span className={iconSpan}>{nameSpan}</span>
          </p>
        </Link>
      </li>
    </>
  );
}

export function AsideNavTreeview({
  name,
  icon,
  nameSpan,
  iconSpan,
  active,
  data,
}) {
  return (
    <>
      <li className="nav-item menu-open">
        <Link
          // to={""}
          className={"nav-link " + (active == true ? "active" : "")}
        >
          <i className={icon} />
          <p>
            {name}
            <i className="right fas fa-angle-left" />
            <span className={iconSpan}>{nameSpan}</span>
          </p>
        </Link>
        <ul className="nav nav-treeview">
          {React.Children.toArray(
            data.map((item) => (
              <>
                <AsideItem
                  type={item.type}
                  name={item.name}
                  icon={item.icon}
                  url={item.url}
                  active={item.active}
                  data={item.data}
                />
              </>
            ))
          )}
        </ul>
      </li>
    </>
  );
}

export function AsideLogo({ img, name = "AxelONE" }) {
  return (
    <>
      <a href="http://www.singerperu.com/" className="brand-link">
        <img
          src={img}
          alt={name}
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">{name}</span>
      </a>
    </>
  );
}

export function AsideUser() {
  let DB;
  const DBDataBase = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR96TU2A5E8Y5FDD1",
    "Udlg"
  );

  if (DBDataBase) {
    DB = JSON.parse(DBDataBase);
  }
  
  return (
    <>
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        {/* <div className="image">
          <img
            src={RutaProject + "dist/img/user2-160x160.jpg"}
            className="img-circle elevation-2"
            alt="User Image"
          />
        </div> */}
        <div className="info">
          <a href="#">
            <p>{DB?.cPrimerNombre}</p>
          </a>
        </div>
      </div>

      {/* <div className="user-panel d-flex">
        <div className="row mt-3 pb-3 d-flex">
          <div className="col-md-12">
            <div className="info" max-width="50px">
              <a href="#" max-width="50px">
                <p>{DB?.cPrimerNombre}</p>
              </a>
            </div>
            <div className="row row mt-3 d-flex">
              <div className="col-md-6">
                <Button type="submit" variant="contained" fullWidth>
                  Porfiles
                </Button>
              </div>
              <div className="col-md-6">
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  fullWidth
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export function AsideSearch() {
  return (
    <>
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input
            className="form-control form-control-sidebar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
