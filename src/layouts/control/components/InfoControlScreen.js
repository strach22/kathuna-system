/* eslint-disable no-use-before-define */
import { useEffect, useState, useContext } from "react";
import { Alert, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import useForm from "elements/hooks/useForm";
import Input from "elements/Input";
import InputPassword from "elements/InputPassword";

import ClientsContext from "context/Clients/ClientsContext";
import Form from "layouts/control/helpers/Form";

export default function InfoControlScreen() {
  const { controlInfo, uploadControlInfo } = useContext(ClientsContext);
  const errorValues = {
    nameVerification: "Colocar Contraseña",
    email: "",
    ruc: "",
    mobile: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("nameVerification" in fieldValues)
      tempo.nameVerification =
        fieldValues.nameVerification === "123" ? "" : "La Contraseña es Incorrecta";
    if ("email" in fieldValues)
      tempo.email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        fieldValues.email
      )
        ? ""
        : "La dirección de email no es válido";
    if ("ruc" in fieldValues)
      tempo.ruc = /^[0-9]{13}$/.test(fieldValues.ruc)
        ? ""
        : "Este campo es obligatorio llenar con 13 dígitos";
    if ("mobile" in fieldValues)
      tempo.mobile = /^[0-9]{10}$/.test(fieldValues.mobile)
        ? ""
        : "Este campo es obligatorio llenar con 10 dígitos";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      nameBank: controlInfo.nameBank,
      nameSlogan: controlInfo.nameSlogan,
      nameLocation: controlInfo.nameLocation,
      legalRepresentative: controlInfo.legalRepresentative,
      email: controlInfo.email,
      ruc: controlInfo.ruc,
      mobile: controlInfo.mobile,
      city: controlInfo.city,
      nameVerification: "",
    },
    true,
    validate,
    errorValues
  );

  const [read, setRead] = useState("true");
  const [verification, setVerification] = useState(false);
  const [errorNow, setErrorNow] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.email !== "La dirección de email no es válido") {
      if (errors.ruc !== "Este campo es obligatorio llenar con 13 dígitos") {
        if (errors.mobile !== "Este campo es obligatorio llenar con 10 dígitos") {
          setRead("true");
          errors.nameVerification = "Colocar Contraseña";
          const newControlInfo = controlInfo;
          newControlInfo.nameBank = values.nameBank;
          newControlInfo.nameSlogan = values.nameSlogan;
          newControlInfo.nameLocation = values.nameLocation;
          newControlInfo.legalRepresentative = values.legalRepresentative;
          newControlInfo.email = values.email;
          newControlInfo.ruc = values.ruc;
          newControlInfo.mobile = values.mobile;
          newControlInfo.city = values.city;
          uploadControlInfo(newControlInfo);
        }
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    errors.nameVerification = "Colocar Contraseña";
    if (read === "true") {
      setVerification(!verification);
      values.nameVerification = "";
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (values.nameVerification === "123") {
      setRead("false");
      setVerification(false);
      values.nameVerification = "";
    } else {
      setErrorNow(errors.nameVerification);
    }
  };

  useEffect(() => {
    setErrorNow("");
  }, [values.nameVerification]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            Nombre de la Caja de Ahorros
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="Caja de Ahorro"
            name="nameBank"
            value={values.nameBank}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            SLOGAN
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="SLOGAN"
            name="nameSlogan"
            value={values.nameSlogan}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            Ubicación
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="Ubicación"
            name="nameLocation"
            value={values.nameLocation}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            Representante Legal
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="Representante Legal"
            name="legalRepresentative"
            value={values.legalRepresentative}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            E-mail
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="correo@mail.com"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            RUC
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="RUC"
            name="ruc"
            value={values.ruc}
            onChange={handleInputChange}
            error={errors.ruc}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            Teléfono
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="Teléfono"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
            read={read}
          />
        </Grid>

        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h6">
            Ciudad, País
          </MDTypography>
        </Grid>
        <Grid item xs={8.5}>
          <Input
            label="Ciudad"
            name="city"
            value={values.city}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>

        <Grid item xs={3}>
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            onClick={handleEdit}
            sx={{ background: "#53B74B", "&:hover": { background: "#8CBC89" } }}
          >
            EDITAR
          </MDButton>
        </Grid>

        <Grid item xs={3}>
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            GUARDAR
          </MDButton>
        </Grid>

        {verification && (
          <Grid item xs={12}>
            <MDBox
              mx={5}
              mt={7}
              py={4}
              px={3}
              variant="gradient"
              borderRadius="xxl"
              coloredShadow="dark"
              sx={{ background: "#F2F4F2" }}
            >
              <Grid container>
                <Grid item xs={5}>
                  <InputPassword
                    label="Password"
                    name="nameVerification"
                    value={values.nameVerification}
                    onChange={handleInputChange}
                    error={errorNow}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MDButton
                    className="BottomVerification"
                    variant="text"
                    size="large"
                    onClick={handleVerification}
                  >
                    VERIFICAR
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {read === "false" && (
          <Grid item xs={12}>
            <Alert severity="success">Puede Editar el Nombre de la Caja de Ahorros</Alert>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
