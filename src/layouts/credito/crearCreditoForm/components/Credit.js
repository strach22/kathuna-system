/* eslint-disable no-use-before-define */
import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import DatePickerH from "elements/DatePickerH";
import SelectG from "elements/SelectG";
import useForm from "elements/hooks/useForm";
import Form from "layouts/credito/helpers/Form";
import listItems from "layouts/credito/helpers/sociosItems";

// Context
import ClientsContext from "context/Clients/ClientsContext";

export default function Credit() {
  const { clients, addClientCredit, controlInfo } = useContext(ClientsContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const errorValues = {
    loanValue: "",
    timePayYear: "",
    timePayMonth: "",
    guarantor: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[1-9]{1}[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio llenar con Números este Campo";
    if ("timePayYear" in fieldValues)
      tempo.timePayYear = /^[0-9]+$/.test(fieldValues.timePayYear)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("timePayMonth" in fieldValues)
      tempo.timePayMonth = /^[0-9]+$/.test(fieldValues.timePayMonth)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("guarantor" in fieldValues)
      tempo.guarantor =
        fieldValues.guarantor.length !== 0 ? "" : "Es obligatorio escoger una opción";
    if (/^[0]+$/.test(fieldValues.timePayYear) && /^[0]+$/.test(fieldValues.timePayMonth)) {
      tempo.timePayMonth = "Es Obligatorio Llenar este campo";
      tempo.timePayYear = "Es Obligatorio Llenar este campo";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      creationDate: new Date(),
      approvalDate: "",
      rejectionDate: "",
      initialDate: "",
      loanValue: "0",
      timePayYear: "0",
      timePayMonth: "0",
      guarantor: "",
      auxGuarantor: [],
    },
    true,
    validate,
    errorValues
  );

  const { sociosItems } = listItems();

  useEffect(() => {
    const completeName = `${clients[id - 1].firstName} ${clients[id - 1].lastName}`;
    values.auxGuarantor = sociosItems.filter((val) => val.title !== completeName);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const interes =
        clients[id].tariff === "Particular"
          ? controlInfo.particularCreditInterest / 100
          : controlInfo.partnerCreditInterest / 100;
      const periods = values.timePayYear * 12 + parseInt(values.timePayMonth, 10);
      const periodicFee = values.loanValue * (interes / (1 - (interes + 1) ** -periods));
      const periodicFeeDesgravamen =
        periodicFee + ((controlInfo.desgravament / 100) * values.loanValue) / periods;
      const folders = clients.map((client) => client.credits).flat();

      values.id = String(folders.length + 1);
      const newCreationDate = values.creationDate
        .toISOString()
        .split("T")[0]
        .replace("-", "/")
        .replace("-", "/");
      values.creationDate = newCreationDate;
      values.loanValue = parseFloat(values.loanValue, 10);
      values.periods = periods;
      values.state = "Creado";
      values.actualLoan = periodicFeeDesgravamen * periods;
      values.monthlyPayment = periodicFeeDesgravamen;
      values.interest = interes;
      values.creditHistory = [];
      values.reserve = 0;

      delete values.timePayMonth;
      delete values.timePayYear;

      addClientCredit(id, values);
      navigate(`/creditos/ver/${id}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Crédito:
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Tiempo a Pagar:
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha del Crédito:
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={2.5}>
          <InputValue
            className="InputLoanValue"
            name="loanValue"
            value={values.loanValue}
            onChange={handleInputChange}
            error={errors.loanValue}
            icon="$"
            position="start"
          />
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={6}>
              <InputValue
                className="InputTimeValue"
                name="timePayYear"
                value={values.timePayYear}
                onChange={handleInputChange}
                error={errors.timePayYear}
                icon="años"
                position="end"
              />
            </Grid>
            <Grid item xs={6} className="hola">
              <InputValue
                className="InputTimeValue"
                name="timePayMonth"
                value={values.timePayMonth}
                onChange={handleInputChange}
                error={errors.timePayMonth}
                icon="meses"
                position="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={2.5}>
          <DatePickerH
            name="creationDate"
            label="Fecha del Crédito"
            value={values.creationDate}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12}>
              <MDTypography className="Subtitles2" variant="h5">
                Garante:
              </MDTypography>
            </Grid>
            <Grid item xs={12}>
              <SelectG
                name="guarantor"
                label="Garante"
                value={values.guarantor}
                onChange={handleInputChange}
                options={values.auxGuarantor}
                error={errors.guarantor}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={11}>
            <Link to="/creditos">
              <MDButton
                size="large"
                onClick={resetForm}
                sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
              >
                REGRESAR
              </MDButton>
            </Link>
            <MDButton
              variant="text"
              size="large"
              type="submit"
              sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
            >
              GENERAR
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}
