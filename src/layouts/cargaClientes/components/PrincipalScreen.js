import React, { useState } from "react";
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UploadClientsScreen from "./UploadClientsScreen";
import SavingHistoryScreen from "./SavingHistoryScreen";

const useStyles = makeStyles({
  root: {
    "& .excel-import-container": {
      padding: "25px",
      margin: "40px 60px 60px 60px",
      boxShadow: "0 0 20px rgba(66, 50, 98, 0.35)",
      border: "1px solid #eaeaea",
      borderRadius: "10px",
    },
    "& .file-upload": {
      display: "grid",
      gridGap: "10px",
    },
    "& .MuiTypography-root": {
      color: "black",
    },
    "& #excel-upload": {
      width: "100%",
      height: "25px",
      border: "1px solid #cdcdcd",
      borderRadius: "4px",
      fontFamily: "arial, sans-serif",
      fontSize: "75%",
    },
    "& .excel-table": {
      width: "100%",
      fontSize: "75%",
    },
    "& .excel-table tr:first-of-type": {
      display: "none",
    },
    "& .excel-table tr": {
      backgroundColor: "#c6e6f5",
    },
    "& .excel-table td": {
      padding: "5px 10px",
    },
    "& .excel-table tr:nth-of-type(2)": {
      backgroundColor: "#3d5662 !important",
      color: "#fff",
    },
    "& .excel-table td:nth-of-type(1)": {
      display: "none",
    },
    "& .excel-table tr:nth-of-type(even)": {
      backgroundColor: "#e6fbff",
    },
    "& .excel-table-import": {
      margin: "15px 0px",
      maxHeight: "400px",
      overflowY: "scroll",
    },
    "& .AlertDialog": {
      margin: "10px 0px 0px 60px",
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      marginBottom: "40px",
      borderRadius: 8,
    },
  },
});

export default function PrincipalScreen() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6}>
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
                Carga de Clientes
              </MDTypography>
            </MDBox>
            <MDBox pt={3} className={classes.root}>
              <div className="AlertDialog">
                <MDButton variant="outlined" color="info" onClick={handleClickOpen}>
                  <InfoOutlinedIcon sx={{ marginRight: 1 }} />
                  INFORMACI??N IMPORTANTE
                </MDButton>
                <Dialog onClose={handleClose} open={open} sx={{ background: "#B2C6C6" }}>
                  <DialogTitle onClose={handleClose}>INSTRUCCIONES</DialogTitle>
                  <DialogContent dividers>
                    <MDTypography gutterBottom>
                      Descargar la plantilla y colocar la informaci??n en el archivo EXCEL con la
                      misma estructura.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Revisar todos los datos con mucho cuidado. NO SE PODR?? REVERTIR LOS CAMBIOS.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Tener cuidado con el formato de la fecha. Las celdas correspondientes del
                      excel deben estar en <b>general</b> o en <b>texto</b>
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Para cargar el historial de ahorros completo de todos los clientes, repita los
                      pasos anteriores.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Primero debe cargar los datos de los clientes y despu??s el historial de
                      ahorro.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Finalmente, seleccione el bot??n <b>Subir archivo</b> y se cargar??n todos los
                      datos de los clientes.
                    </MDTypography>
                  </DialogContent>
                  <DialogActions>
                    <MDButton autoFocus onClick={handleClose} color="info">
                      OK
                    </MDButton>
                  </DialogActions>
                </Dialog>
              </div>

              <UploadClientsScreen />
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
                Cargar Historial de Ahorros
              </MDTypography>
            </MDBox>
            <MDBox pt={3} className={classes.root}>
              <SavingHistoryScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
