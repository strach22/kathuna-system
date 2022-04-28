/* eslint-disable object-shorthand */
import React, { useReducer, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ActionReduce from "../element/ActionReduce";
import ExcelExport from "../element/ExcelExport";

export default function TableHistoryScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [dataBase, dispatch] = useReducer(ActionReduce);
  // const { uploadClients } = useContext(ClientsContext);

  const handleUpload = () => {
    // if (dataBase) uploadClients(dataBase);
    if (dataBase) console.log(dataBase);
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

          const savingHistoryTempo = {
            identification: value[0],
            type: value[1],
            transactionDate: value[2],
            transactionValue: value[3],
            actualBalance: value[4],
            observation: value[5],
          };

          dispatch({
            type: "SAVING_HISTORY",
            payload: savingHistoryTempo,
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
          CARGAR HISTORIAL DE AHORROS DEL CLIENTE
        </MDTypography>
        <ExcelExport
          filename="Historial-de-Ahorros.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <Grid container>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "4%" }} />}
        {loading && <MDTypography>Cargando ...</MDTypography>}
      </Grid>

      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}

TableHistoryScreen.propTypes = {
  worksheets: PropTypes.string.isRequired,
};