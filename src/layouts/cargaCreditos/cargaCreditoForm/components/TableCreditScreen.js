/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import React, { useContext, useEffect, useReducer, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ExcelExport from "layouts/cargaClientes/element/ExcelExport";
import ActionReduce from "layouts/cargaClientes/element/ActionReduce";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import DatePickerH from "elements/DatePickerH";
import SelectG from "elements/SelectG";
import listItems from "layouts/credito/helpers/sociosItems";
import { useParams } from "react-router-dom";
import ClientsContext from "context/Clients/ClientsContext";

// eslint-disable-next-line react/prop-types
export default function TableCreditScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);

  const errorValues = {
    id: "",
    loanValue: "",
    interest: "",
    periods: "",
    actualLoan: "",
    guarantor: "",
    monthlyPaymentValue: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("id" in fieldValues)
      tempo.id = /^[0-9]+$/.test(fieldValues.id) ? "" : "Es Obligatorio Llenar este campo";
    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[1-9]{1}[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("actualLoan" in fieldValues)
      tempo.actualLoan = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.actualLoan)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("monthlyPaymentValue" in fieldValues)
      tempo.monthlyPaymentValue = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.monthlyPaymentValue)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("interest" in fieldValues)
      tempo.interest = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.interest)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("periods" in fieldValues)
      tempo.periods = /^[0-9]+$/.test(fieldValues.periods)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("guarantor" in fieldValues)
      tempo.guarantor =
        fieldValues.guarantor.length !== 0 ? "" : "Es obligatorio escoger una opción";
    if (fieldValues.periods === "0") tempo.periods = "Es Obligatorio llenar este Campo";
    if (fieldValues.id === "0") tempo.id = "Es Obligatorio llenar este Campo";
    if (fieldValues.interest === "0.00") tempo.interest = "Es Obligatorio llenar este Campo";
    if (fieldValues.monthlyPaymentValue === "0.00")
      tempo.monthlyPaymentValue = "Es Obligatorio llenar este Campo";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      initialDate: new Date(),
      id: "0",
      loanValue: "0",
      interest: "0.00",
      periods: "0",
      actualLoan: "0.00",
      monthlyPaymentValue: "0.00",
      guarantor: "",
      state: "",
      identificationGuarantor: "",
      auxGuarantor: [],
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const { clients, addClientCredit } = useContext(ClientsContext);

  const { sociosItems } = listItems();

  useEffect(() => {
    const completeName = `${clients[id - 1].firstName} ${clients[id - 1].lastName}`;
    values.auxGuarantor = sociosItems.filter((val) => val.title !== completeName);
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.actualLoan === "0.00") values.state = "Finalizado";
      else values.state = "Entregado";

      values.identificationGuarantor = values.auxGuarantor.filter(
        (val) => val.title === values.guarantor
      );

      const credit = {
        id: values.id,
        initialDate: values.initialDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/"),
        loanValue: values.loanValue,
        interest: values.interest,
        periods: values.periods,
        actualLoan: values.actualLoan,
        state: values.state,
        guarantor: values.guarantor,
        identificationGuarantor: values.identificationGuarantor[0].ci,
        monthlyPaymentValue: values.monthlyPaymentValue,
        creditHistory: dataBase,
      };

      addClientCredit(id, credit);
      // navigate("/creditos");
    }
  };

  const uploadFile = (e) => {
    setLoading(true);
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (!err) {
        const { cols, rows } = resp;
        setState({
          cols: cols,
          rows: rows,
        });
        const data = [...rows];
        data.shift();

        for (let i = 0; i < data.length; i += 1) {
          const value = data[i].map((val) => val);

          const dataCreditsTempo = {
            id: String(value[0]),
            transactionDate: String(value[1]),
            value: String(value[2]),
            paymentType: String(value[3]),
            observation: String(value[4]),
          };

          dispatch({
            type: "CLIENT_DATA",
            payload: dataCreditsTempo,
          });
        }
      }
      setLoading(false);
    });
  };

  return (
    <div className="excel-import-container">
      <div className="file-upload">
        <MDTypography variant="h5" sx={{ marginBottom: 2 }}>
          CARGAR CREDITO DEL CLIENTE
        </MDTypography>

        <form onSubmit={handleUpload}>
          <Grid container>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles" variant="h5">
                Número de Carpeta:
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles" variant="h5">
                Fecha del Crédito:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
              <InputValue
                className="InputId"
                name="id"
                value={values.id}
                onChange={handleInputChange}
                error={errors.id}
                icon="#"
                position="start"
              />
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <DatePickerH
                name="initialDate"
                label="Fecha del Crédito"
                value={values.initialDate}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Valor del Crédito:
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Cuotas:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
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
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <InputValue
                className="InputLoanValue"
                name="periods"
                value={values.periods}
                onChange={handleInputChange}
                error={errors.periods}
                icon="#"
                position="start"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Deuda Pendiente:
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Valor del Pago Mensual:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
              <InputValue
                className="InputLoanValue"
                name="actualLoan"
                value={values.actualLoan}
                onChange={handleInputChange}
                error={errors.actualLoan}
                icon="$"
                position="start"
              />
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <InputValue
                className="InputLoanValue"
                name="monthlyPaymentValue"
                value={values.monthlyPaymentValue}
                onChange={handleInputChange}
                error={errors.monthlyPaymentValue}
                icon="$"
                position="start"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Interés:
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Garante:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container sx={{ marginBottom: "40px" }}>
            <Grid item xs={3.38}>
              <InputValue
                className="interestValueClass"
                name="interest"
                value={values.interest}
                onChange={handleInputChange}
                error={errors.interest}
                icon="%"
                position="end"
              />
            </Grid>
            <Grid item xs={2}>
              {}
            </Grid>
            <Grid item xs={5.62}>
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
        </form>

        <ExcelExport
          filename="Credito-del-Cliente.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <Grid container sx={{ marginTop: "3%" }}>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "2%" }} />}
        {loading && <MDTypography>Cargando ...</MDTypography>}
      </Grid>
      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}
