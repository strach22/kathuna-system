/* eslint-disable react/prop-types */
import { useContext, useMemo } from "react";

import { useParams, Link } from "react-router-dom";

// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";

import ClientsContext from "context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Carpeta", accessor: "id", align: "left" },
      { Header: "Valor Préstamo", accessor: "loanValue", align: "center" },
      { Header: "Deuda Pendiente", accessor: "actualLoan", align: "center" },
      { Header: "Cuotas", accessor: "periods", align: "center" },
      { Header: "Valor a Pagar Mensaul", accessor: "monthlyPayment", align: "center" },
      { Header: "Estado", accessor: "state", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients[i].credits.map((info) => ({
      id: info.id,
      loanValue: `$ ${info.loanValue}`,
      actualLoan: `$ ${info.actualLoan.toFixed(2)}`,
      periods: info.periods,
      monthlyPayment: `$ ${info.monthlyPayment.toFixed(2)}`,
      state: info.state,
      accion: (
        <>
          <Link to={`/carpeta/${id}-${info.id}`}>
            <MDTypography variant="caption" color="info" fontWeight="medium">
              Ver Carpeta
            </MDTypography>
          </Link>
          <br />
          <Link to={`/credito/${id}-${info.id}`}>
            <MDTypography variant="caption" color="success" fontWeight="medium">
              Pagar Crédito
            </MDTypography>
          </Link>
        </>
      ),
    })),
  };
}
