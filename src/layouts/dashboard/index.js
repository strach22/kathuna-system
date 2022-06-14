import { useContext } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import MDbutton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import InfoIcon from "examples/Cards/IconInfo";

// Data
import ClientsContext from "context/Clients/ClientsContext";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const { controlInfo, editSystemData, systemData } = useContext(ClientsContext);
  const { ahorros, creditos, gastos, total } = reportsLineChartData;

  const openSB = () => {
    const newSystemData = systemData;
    newSystemData.SBstate = true;
    editSystemData(newSystemData);
  };
  const closeSB = () => {
    const newSystemData = systemData;
    newSystemData.SBstate = false;
    editSystemData(newSystemData);
  };

  const renderSB = (
    <MDSnackbar
      color={systemData.SBinfo.color}
      icon={systemData.SBinfo.icon}
      title={systemData.SBinfo.tittle}
      content={systemData.SBinfo.content}
      open={systemData.SBstate}
      onClose={closeSB}
      close={closeSB}
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDbutton onClick={openSB}>Aplastar</MDbutton>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <Link to="/transacciones-ahorros">
                <InfoIcon icon="iso" title="Ahorros" count={`$ ${controlInfo.totalTransactions}`} />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/creditos">
                <InfoIcon
                  color="success"
                  icon="credit_card"
                  title="Créditos"
                  count={`$ ${controlInfo.totalCredits}`}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/gastos">
                <InfoIcon
                  color="warning"
                  icon="paid"
                  title="Gastos"
                  count={`$ ${controlInfo.totalExpenses}`}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <InfoIcon
                color="dark"
                icon="attach_money"
                title="Total"
                count={`$ ${(
                  controlInfo.totalTransactions +
                  controlInfo.totalCredits -
                  controlInfo.totalExpenses
                ).toFixed(2)}`}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Gráfica Ahorros"
                  description="Last Campaign Performance"
                  date="Actualizado"
                  chart={ahorros}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Gráfica créditos"
                  description="+15 % increase in today ahorros."
                  date="Actualizado"
                  chart={creditos}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="warning"
                  title="Gráfica Gastos"
                  description="Last Campaign Performance"
                  date="Actualizado"
                  chart={gastos}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Gráfica Total"
                  description="Last Campaign Performance"
                  date="Actualizado"
                  chart={total}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {renderSB}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
