/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";
import clients from "../../../data/clients.json";

export default function data() {
  return {
    columns: [
      { Header: "código", accessor: "id", align: "left", width: "15%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients.map((cliente) => ({
      id: cliente.id,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identification: cliente.identification,
      accion: (
        <Link to={`${cliente.id}`}>
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            Depositar
          </MDTypography>
        </Link>
      ),
    })),
  };
}
