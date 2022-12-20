import React, { useEffect, useRef } from "react";
import { ApiContextRequest } from "../../../../../../Main/Context";
import { useState } from "react";
import { Alertas } from "../../../../../Components";
import { UsuariosDT } from "../../../../../../Data/UseCases/Apps";
import { useFormik, useFormikContext } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const FormEditarUsuario = ({ idUsuario, handleClose }) => {
  const [dataUsuario, setDataUsuario] = useState({
    cDocumento: "",
    cNombres: "",
    cApellidos: "",
    cDireccion: "",
    cCelular: "",
    cEmail: "",
    idRole: "",
    cPasswordAnt: "",
    cPasswordNew: "",
    cPasswordNewC: "",
  });

  const [Swichs, setSwichs] = useState({
    lRecuperarUltimoPass: false,
    lEstado: true,
  });

  //=======================================
  // VALIDATORS
  //=======================================

  const validationSchema = yup.object({
    cDocumento: yup
      .string()
      .required("El Dni es requerido")
      .min(8, "Documento Invalido")
      .max(8, "Llego al limite de caracteres"),
    cNombres: yup
      .string()
      .min(3, "Requiere minimo de 3 letras")
      .required("El nombre es requerido"),
    cApellidos: yup
      .string()
      .min(3, "Requiere minimo de 3 letras")
      .required("El Apellido es requerido")
      .max(50, "Llego al limite de caracteres"),
    cDireccion: yup
      .string()
      .min(5, "Requiere minimo de 5 letras")
      .required("La Direccion es requerido"),
    cCelular: yup
      .string()
      .min(9, "Numero Invalido")
      .max(9, "Llego al limite de caracteres")
      .required("El Numero es requerido"),
    idRole: yup
      .string()
      .required("Seleccione un Rol")
      .min(1, "Seleccione un Rol"),
    cEmail: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    cPasswordAnt: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "Requiere una contraseña minima de 8 letras"),
    cPasswordNew: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "Requiere una contraseña minima de 8 letras"),
    cPasswordNewC: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "Requiere una contraseña minima de 8 letras"),
  });

  //=======================================
  // CONSTRUCTOR FORMIK
  //=======================================

  const formik = useFormik({
    initialValues: dataUsuario,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values?.cPasswordNew === values?.cPasswordNewC) {
        //console.log(values);
        EditarUsuario(values);
      } else {
        Alertas("error", "Las contraseñas deben ser iguales.");
      }
    },
  });

  useEffect(() => {
    formik.setValues(dataUsuario);
  }, [dataUsuario]);

  //=======================================
  // LOAD DATA
  //=======================================

  const ObternerData = async (e) => {
    const Access = ApiContextRequest("47");
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new UsuariosDT(
          Access.cPath + "?idUsuario=" + idUsuario,
          Access.cMethod
        ).GetUsuario();
        if (data?.header?.success) {
          setDataUsuario({
            cDocumento: data?.data?.cDocumento,
            cNombres: data?.data?.cNombres,
            cApellidos: data?.data?.cApellidos,
            cDireccion: data?.data?.cDireccion,
            cCelular: data?.data?.cCelular,
            cEmail: data?.data?.cEmail,
            idRole: data?.data?.idRole,
            cPasswordAnt: "",
            cPasswordNew: "",
            cPasswordNewC: "",
          });
        } else {
          Alertas("error", data?.header?.message);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    ObternerData();
  }, []);

  //=======================================
  // CHANGE
  //=======================================

  const ChangeStateSwitch = (event) => {
    setSwichs({
      ...Swichs,
      [event.target.name]: event.target.checked,
    });
  };

  //=======================================
  // SUBMIT
  //=======================================

  const EditarUsuario = async (values) => {
    const Access = ApiContextRequest("50");
    try {
      const data = await new UsuariosDT(
        Access.cPath + "?idUsuario=" + idUsuario,
        Access.cMethod
      ).EditUsuario({
        cApellidos: values?.cApellidos,
        cCelular: values?.cCelular,
        cDireccion: values?.cDireccion,
        cDocumento: values?.cDocumento,
        cEmail: values?.cEmail,
        cNombres: values?.cNombres,
        lRecuperarUltimoPassword: Swichs?.lRecuperarUltimoPass,
        cPasswordAnterior: values?.cPasswordAnt,
        cPasswordNuevo: values?.cPasswordNew,
        idRol: values?.idRole,
        estado: Swichs?.lEstado,
      });

      //console.log(data);

      if (data?.body?.errors?.length > 0) {
        data?.body?.errors.map((e) => Alertas("warning", e?.message));
      } else {
        Alertas("success", "Usuario Registrado Correctamente.");
        handleClose();
      }
    } catch (error) {
      Alertas("error", "Error en el registro de usuario.");
    }
  };

  return (
    <Container className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={6}>
            <TextField
              fullWidth
              id="cDocumento"
              name="cDocumento"
              label="NUMERO DE DOCUMENTO"
              type="number"
              value={formik.values?.cDocumento}
              onChange={formik.handleChange}
              error={
                formik.touched?.cDocumento && Boolean(formik.errors?.cDocumento)
              }
              helperText={
                formik.touched?.cDocumento && formik.errors?.cDocumento
              }
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <FormControl fullWidth className="mb-2 mt-2">
              <InputLabel id="demo-simple-select-label">PERFIL</InputLabel>
              <Select
                fullWidth
                id="idRole"
                name="idRole"
                labelId="demo-simple-select-label"
                label="PERFIL"
                value={formik.values?.idRole}
                onChange={formik.handleChange}
                error={formik.touched?.idRole && Boolean(formik.errors?.idRole)}
                //helperText={formik.touched?.idRole && formik.errors?.idRole}
              >
                <MenuItem value={"1"}>SuperUsuario</MenuItem>
                <MenuItem value={"2"}>Administrador</MenuItem>
                <MenuItem value={"3"}>Asistente</MenuItem>
                <MenuItem value={"4"}>Ninguno</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              fullWidth
              id="cNombres"
              name="cNombres"
              label="NOMBRES"
              type="text"
              value={formik.values?.cNombres}
              onChange={formik.handleChange}
              error={
                formik.touched?.cNombres && Boolean(formik.errors?.cNombres)
              }
              helperText={formik.touched?.cNombres && formik.errors?.cNombres}
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              id="cApellidos"
              name="cApellidos"
              label="APELLIDOS"
              type="text"
              value={formik.values?.cApellidos}
              onChange={formik.handleChange}
              error={
                formik.touched?.cApellidos && Boolean(formik.errors?.cApellidos)
              }
              helperText={
                formik.touched?.cApellidos && formik.errors?.cApellidos
              }
              className="mb-2 mt-2"
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <TextField
              fullWidth
              id="cDireccion"
              name="cDireccion"
              label="DIRECCION"
              type="text"
              value={formik.values?.cDireccion}
              onChange={formik.handleChange}
              error={
                formik.touched?.cDireccion && Boolean(formik.errors?.cDireccion)
              }
              helperText={
                formik.touched?.cDireccion && formik.errors?.cDireccion
              }
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              id="cCelular"
              name="cCelular"
              label="NUMERO DE CELULAR"
              type="number"
              value={formik.values?.cCelular}
              onChange={formik.handleChange}
              error={
                formik.touched?.cCelular && Boolean(formik.errors?.cCelular)
              }
              helperText={formik.touched?.cCelular && formik.errors?.cCelular}
              className="mb-2 mt-2"
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <TextField
              fullWidth
              id="cEmail"
              name="cEmail"
              label="E-MAIL (USUARIO)"
              type="text"
              value={formik.values?.cEmail}
              onChange={formik.handleChange}
              error={formik.touched?.cEmail && Boolean(formik.errors?.cEmail)}
              helperText={formik.touched?.cEmail && formik.errors?.cEmail}
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              id="cPasswordAnt"
              name="cPasswordAnt"
              label="CONTRASEÑA ANTERIOR"
              type="password"
              value={formik.values?.cPasswordAnt}
              onChange={formik.handleChange}
              error={
                formik.touched?.cPasswordAnt &&
                Boolean(formik.errors?.cPasswordAnt)
              }
              helperText={
                formik.touched?.cPasswordAnt && formik.errors?.cPasswordAnt
              }
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              id="cPasswordNew"
              name="cPasswordNew"
              label="NUEVA CONTRASEÑA"
              type="password"
              value={formik.values?.cPasswordNew}
              onChange={formik.handleChange}
              error={
                formik.touched?.cPasswordNew &&
                Boolean(formik.errors?.cPasswordNew)
              }
              helperText={
                formik.touched?.cPasswordNew && formik.errors?.cPasswordNew
              }
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              id="cPasswordNewC"
              name="cPasswordNewC"
              label="CONFIRMAR NUEVA CONTRASEÑA"
              type="password"
              value={formik.values?.cPasswordNewC}
              onChange={formik.handleChange}
              error={
                formik.touched?.cPasswordNewC &&
                Boolean(formik.errors?.cPasswordNewC)
              }
              helperText={
                formik.touched?.cPasswordNewC && formik.errors?.cPasswordNewC
              }
              className="mb-2 mt-2"
            />
          </Col>
          <Col md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={Swichs?.lRecuperarUltimoPass}
                  onChange={ChangeStateSwitch}
                  name="lRecuperarUltimoPass"
                />
              }
              label="RECUPERAR ULTIMA CONTRASEÑA"
            />
          </Col>
          <Col md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={Swichs?.lEstado}
                  onChange={ChangeStateSwitch}
                  name="lEstado"
                />
              }
              label="ESTADO DEL CLIENTE"
            />
          </Col>
        </Row>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          className="mt-2"
        >
          Editar Usuario
        </Button>
      </form>
    </Container>
  );
};
