import React, { Component, useState, useEffect } from "react";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export function MenuList() {
  const DB = [];
  const MenuListDB = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Mnlg"
  );
  if (MenuListDB) {
    JSON.parse(MenuListDB).forEach((element) => {
      DB.push({
        id: element["idApp"],
        name: element["name"].toUpperCase(),
        url: element["cUrl"].replace("/api", ""),
        descrip: element["cDescripcion"],
      });
    });
  }

  return (
    <>
      {React.Children.toArray(
        DB.map((item) => (
          <>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to={item.url}>
                <div className="nav-link">{item.name}</div>
              </Link>
            </li>
          </>
        ))
      )}
    </>
  );
}

export default class NavbarMenu extends Component {
  render() {
    return (
      <>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <NavarAside />
        </ul>
      </>
    );
  }
}

export function NavarAside() {
  
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  if (width > 572) {
    return (
      <>
        <MenuList />
      </>
    );
  } else {
    return (
      <>
        <MenuListMobile />
      </>
    );
  }
}

export function MenuListMobile() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const DB = [];
  const MenuListDB = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Mnlg"
  );
  if (MenuListDB) {
    JSON.parse(MenuListDB).forEach((element) => {
      DB.push({
        id: element["idApp"],
        name: element["name"].toUpperCase(),
        url: element["cUrl"].replace("/api", ""),
        descrip: element["cDescripcion"],
      });
    });
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {DB.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
              <Link to={item.url} style={{ width: "100%" }}>
                <ListItemText primary={item.name}></ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <li className="nav-item">
              <button onClick={toggleDrawer(anchor, true)}>
                <div className="nav-link">MY APPS</div>
              </button>
            </li>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
