/* eslint-disable no-use-before-define */
import { useEffect, useState, useContext } from "react";
import { Alert, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import InputPassword from "elements/InputPassword";

import ClientsContext from "context/Clients/ClientsContext";
import Form from "layouts/control/helpers/Form";

export default function ControlScreen() {
  const { controlInfo, uploadControlInfo } = useContext(ClientsContext);
  const errorValues = {
    nameVerification: "Colocar Contraseña",
    partnerCreditInterest: "",
    partnerSavingInterest: "",
    particularCreditInterest: "",
    particularSavingInterest: "",
    desgravament: "",
    latePayment: "",
    reserveInterest: "",
    proofPaymentValue: "",
    timeSavingInterest: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("particularSavingInterest" in fieldValues)
      tempo.particularSavingInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(
        fieldValues.particularSavingInterest
      )
        ? ""
        : "Verifique el formato";
    if ("particularCreditInterest" in fieldValues)
      tempo.particularCreditInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(
        fieldValues.particularCreditInterest
      )
        ? ""
        : "Verifique el formato";
    if ("partnerSavingInterest" in fieldValues)
      tempo.partnerSavingInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.partnerSavingInterest)
        ? ""
        : "Verifique el formato";
    if ("partnerCreditInterest" in fieldValues)
      tempo.partnerCreditInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.partnerCreditInterest)
        ? ""
        : "Verifique el formato";
    if ("desgravament" in fieldValues)
      tempo.desgravament = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.desgravament)
        ? ""
        : "Verifique el formato";
    if ("latePayment" in fieldValues)
      tempo.latePayment = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.latePayment)
        ? ""
        : "Verifique el formato";
    if ("proofPaymentValue" in fieldValues)
      tempo.proofPaymentValue = /^[0-9]+$/.test(fieldValues.proofPaymentValue)
        ? ""
        : "Verifique el formato";
    if ("timeSavingInterest" in fieldValues)
      tempo.timeSavingInterest = /^[0-9]+$/.test(fieldValues.timeSavingInterest)
        ? ""
        : "Verifique el formato";
    if ("reserveInterest" in fieldValues)
      tempo.reserveItnerest = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.reserveInterest)
        ? ""
        : "Verifique el formato";
    if ("nameVerification" in fieldValues)
      tempo.nameVerification =
        fieldValues.nameVerification === "123" ? "" : "La Contraseña es Incorrecta";

    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      particularSavingInterest: controlInfo.particularSavingInterest,
      particularCreditInterest: controlInfo.particularCreditInterest,
      partnerSavingInterest: controlInfo.partnerSavingInterest,
      partnerCreditInterest: controlInfo.partnerCreditInterest,
      desgravament: controlInfo.desgravament,
      latePayment: controlInfo.latePayment,
      reserveInterest: controlInfo.reserveInterest,
      proofPaymentValue: controlInfo.proofPaymentValue,
      timeSavingInterest: controlInfo.timeSavingInterest,
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

    const auxVerification = Object.keys(errors).map((key) => {
      if (key === "nameVerification") return true;
      if (errors[key] === "Verifique el formato") return false;
      return true;
    });

    const auxValidation = auxVerification.filter((key) => key === false);

    if (auxValidation.length === 0) {
      setRead("true");
      errors.nameVerification = "Colocar Contraseña";

      const newControlInfo = controlInfo;
      newControlInfo.particularSavingInterest = parseFloat(values.particularSavingInterest, 10);
      newControlInfo.particularCreditInterest = parseFloat(values.particularCreditInterest, 10);
      newControlInfo.partnerSavingInterest = parseFloat(values.partnerSavingInterest, 10);
      newControlInfo.partnerCreditInterest = parseFloat(values.partnerCreditInterest, 10);
      newControlInfo.desgravament = parseFloat(values.desgravament, 10);
      newControlInfo.latePayment = parseFloat(values.latePayment, 10);
      newControlInfo.proofPaymentValue = values.proofPaymentValue;
      newControlInfo.timeSavingInterest = values.timeSavingInterest;
      newControlInfo.reserveInterest = parseFloat(values.reserveInterest, 10);

      uploadControlInfo(newControlInfo);
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
        <Grid item xs={12}>
          <MDTypography className="title" variant="h5">
            INTERÉS PARA CAJA DE AHORRO
          </MDTypography>
        </Grid>

        <Grid item xs={2.9}>
          <MDTypography className="Subtitles2" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularSavingInterest"
            value={values.particularSavingInterest}
            onChange={handleInputChange}
            error={errors.particularSavingInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={1.7}>
          <MDTypography className="Subtitles2" variant="h6">
            Socios
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="partnerSavingInterest"
            value={values.partnerSavingInterest}
            onChange={handleInputChange}
            error={errors.partnerSavingInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={2.9}>
          <MDTypography className="Subtitles2" variant="h6" sx={{ marginTop: "25px" }}>
            Periodo en días para
          </MDTypography>
          <MDTypography className="Subtitles2" variant="h6">
            Empiezar Interés
          </MDTypography>
        </Grid>

        <Grid item xs={3.7} sx={{ marginTop: "25px" }}>
          <InputValue
            className="InputInterest"
            name="timeSavingInterest"
            value={values.timeSavingInterest}
            onChange={handleInputChange}
            error={errors.timeSavingInterest}
            icon="#"
            position="start"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title2" variant="h5">
            INTERÉS PARA CRÉDITOS
          </MDTypography>
        </Grid>

        <Grid item xs={2.9}>
          <MDTypography className="Subtitles2" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularCreditInterest"
            value={values.particularCreditInterest}
            onChange={handleInputChange}
            error={errors.particularCreditInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={1.7}>
          <MDTypography className="Subtitles2" variant="h6">
            Socios
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="partnerCreditInterest"
            value={values.partnerCreditInterest}
            onChange={handleInputChange}
            error={errors.partnerCreditInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title2" variant="h5">
            INTERÉS VARIOS
          </MDTypography>
        </Grid>

        <Grid item xs={2.9}>
          <MDTypography className="Subtitles2" variant="h6">
            Fondo Desgravament
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="desgravament"
            value={values.desgravament}
            onChange={handleInputChange}
            error={errors.desgravament}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={1.7}>
          <MDTypography className="Subtitles2" variant="h6">
            Interés Encaje
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="reserveInterest"
            value={values.reserveInterest}
            onChange={handleInputChange}
            error={errors.reserveInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={2.9} sx={{ marginTop: "25px" }}>
          <MDTypography className="Subtitles2" variant="h6">
            Interés por Mora
          </MDTypography>
        </Grid>

        <Grid item xs={9} sx={{ marginTop: "25px" }}>
          <InputValue
            className="InputInterest"
            name="latePayment"
            value={values.latePayment}
            onChange={handleInputChange}
            error={errors.latePayment}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title2" variant="h5">
            COMPROBANTES DE PAGO
          </MDTypography>
        </Grid>

        <Grid item xs={2.9} sx={{ marginBottom: "60px" }}>
          <MDTypography className="Subtitles2" variant="h6">
            Último Valor de Factura
          </MDTypography>
        </Grid>

        <Grid item xs={9}>
          <InputValue
            className="InputInterest"
            name="proofPaymentValue"
            value={values.proofPaymentValue}
            onChange={handleInputChange}
            error={errors.proofPaymentValue}
            icon="#"
            position="start"
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
            <Alert severity="success">Puede Editar el porcentaje de interés</Alert>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
