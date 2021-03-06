import { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";

import ClientsContext from "context/Clients/ClientsContext";
import DownloadAmortization from "layouts/credito/download/DownloadAmortization";
import DownloadBillofExchange from "layouts/credito/download/DownloadBillofExchange";
import InfoScreenSecond from "layouts/credito/helpers/InfoScreenSecond";
import MonthlyPaymentHistory from "./MonthlyPaymentHistory";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

export default function PrincipalScreen() {
  const classes = useStyles();
  const { clients } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);
  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);
  const [folderInfo] = clients[i].credits.filter((folder) => folder.id === idF);

  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={6.8}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={5}>
        <MDTypography fontWeight="regular" variant="h5">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6} className={classes.root}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <InfoScreenSecond />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Informaci??n de la Carpeta
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MDBox mt={6} mb={3}>
                <Grid container spacing={1}>
                  {folderInfo.state !== "Denegado" && (
                    <Grid item xs={12} sx={{ display: "flex" }}>
                      <MDBox m={1}>
                        <DownloadAmortization i={i} i2={i2} />
                      </MDBox>
                      {folderInfo.state !== "Creado" && folderInfo.state !== "Aprobado" && (
                        <MDBox m={1}>
                          <DownloadBillofExchange i={i} i2={i2} />
                        </MDBox>
                      )}
                    </Grid>
                  )}
                  <Grid item xs={11}>
                    <MDBox coloredShadow="secondary" pb={2}>
                      <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                        Carpeta # {idF}
                      </MDTypography>
                      {folderInfo.creationDate.length > 0 &&
                        getInfo("Fecha de creaci??n:", folderInfo.creationDate)}
                      {folderInfo.approvalDate.length > 0 &&
                        getInfo("Fecha de aprobaci??n:", folderInfo.approvalDate)}
                      {folderInfo.rejectionDate.length > 0 &&
                        getInfo("Fecha de rechazo:", folderInfo.rejectionDate)}
                      {folderInfo.initialDate.length > 0 &&
                        getInfo("Fecha de inicio:", folderInfo.initialDate)}
                      {getInfo("Cr??dito:", `$ ${folderInfo.loanValue}`)}
                      {getInfo("Pagos Mensuales:", `$ ${folderInfo.monthlyPayment.toFixed(2)}`)}
                      {getInfo("Intereses:", folderInfo.interest)}
                      {getInfo("Cuotas:", folderInfo.periods)}
                      {folderInfo.state !== "Denegado" &&
                        getInfo("Deuda Actual:", `$ ${folderInfo.actualLoan.toFixed(2)}`)}
                      {folderInfo.state !== "Denegado" &&
                        getInfo("Encaje:", `$ ${folderInfo.reserve.toFixed(2)}`)}
                      {getInfo("Estado:", folderInfo.state)}
                      {getInfo("Garante:", folderInfo.guarantor)}
                    </MDBox>
                  </Grid>
                  <Link to={`/creditos/ver/${idC}`}>
                    <MDButton
                      size="medium"
                      variant="text"
                      sx={{
                        margin: "15px",
                        background: "#7B809A",
                        "&:hover": { background: "#99A3A4" },
                      }}
                    >
                      REGRESAR
                    </MDButton>
                  </Link>
                  {folderInfo.state !== "Denegado" &&
                    folderInfo.state !== "Entregado" &&
                    folderInfo.state !== "Finalizado" && (
                      <Link to={`/aprobar-creditos/${idC}-${idF}`}>
                        <MDButton
                          size="medium"
                          color="success"
                          sx={{
                            margin: "15px 0",
                          }}
                        >
                          APROBAR CR??DITOS
                        </MDButton>
                      </Link>
                    )}
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        {folderInfo.state !== "Denegado" &&
          folderInfo.state !== "Creado" &&
          folderInfo.state !== "Aprobado" && (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h5" color="white">
                    Historial de Cuotas
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MonthlyPaymentHistory />
                </MDBox>
              </Card>
            </Grid>
          )}
      </Grid>
    </MDBox>
  );
}
