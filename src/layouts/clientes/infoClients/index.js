import { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { Card, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import ClientsContext from "../../../context/Clients/ClientsContext";
import historial from "../../transaccionesAhorros/table/tableHistory";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "40px",
    },
  },
});

function infoClients() {
  const classes = useStyles();
  const { clients, editClient } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);

  const i = clients.map((e) => e.id).indexOf(id);
  const { columns, rows } = historial();

  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={12} md={5.7}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDTypography fontWeight="regular" variant="h6" color="text">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={10} className={classes.root}>
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
                  Informaci??n del Cliente {id}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid item xs={12}>
                  <MDBox coloredShadow="secondary" pb={2}>
                    <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                      Cliente # {id}
                    </MDTypography>
                    {getInfo("Nombres:", clients[i].firstName)}
                    {getInfo("Apellidos:", clients[i].lastName)}
                    {getInfo("Documento de Identidad:", clients[i].identification)}
                    {getInfo("Tel??fono:", clients[i].mobile)}
                    {getInfo("2do Tel??fono:", clients[i].secondMobile)}
                    {getInfo("Tarifa:", clients[i].tariff)}
                    {getInfo("Estado Civil:", clients[i].civil)}
                    {getInfo("Fecha de Nacimiento:", clients[i].birthDate)}
                    {getInfo("Fecha de Afiliaci??n:", clients[i].creationDate)}
                    {getInfo("Direcci??n:", clients[i].address)}
                    {getInfo("Correo Electr??nico:", clients[i].email)}
                    <Divider />
                    {clients[i].identificationSpouse && (
                      <>
                        {getInfo("Nombres del Conyugue:", clients[i].firstNameSpouse)}
                        {getInfo("Apellidos del Conyugue:", clients[i].lastNameSpouse)}
                        {getInfo(
                          "Documento de  Identidad del Conyugue:",
                          clients[i].identificationSpouse
                        )}
                        {getInfo("Tel??fono del Conyugue:", clients[i].mobileSpouse)}
                        <Divider />
                      </>
                    )}
                    {getInfo("Parentesco:", clients[i].relationShip)}
                    {getInfo("Nombres del Pariente:", clients[i].firstNameRelationShip)}
                    {getInfo("Apellidos del Pariente:", clients[i].lastNameRelationShip)}
                    {getInfo("Tel??fono del Pariente:", clients[i].mobileRelationShip)}
                    {getInfo(
                      "Documento de Identidad del Pariente:",
                      clients[i].identificationRelationShip
                    )}
                    <Divider />
                    {getInfo("Saldo de Ahorros:", clients[i].savingBalance)}
                    {getInfo("Saldo de Cr??dito:", clients[i].creditBalance)}
                  </MDBox>
                </Grid>
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
                  Historial Estado de Cuenta Ahorros
                </MDTypography>
              </MDBox>
              <MDBox coloredShadow="secondary" pt={3} pb={2}>
                <div>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted
                    showTotalEntries={false}
                    noEndBorder
                    entriesPerPage={false}
                    defaultEntries={5}
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <MDButton
              color="secondary"
              component={Link}
              to="/clientes"
              sx={{ marginLeft: "65px", width: "12%" }}
            >
              REGRESAR
            </MDButton>
            <MDButton
              color="success"
              component={Link}
              to="/agregar-clientes"
              sx={{ marginLeft: "15px", width: "12%" }}
              onClick={() => editClient(clients[i])}
            >
              EDITAR
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default infoClients;
