import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Input from "../../../../../elements/Input";

export default function FormListGuarantor(props) {
  const {
    valFirstName,
    valLastName,
    valMobile,
    valRelationShip,
    handleInputChange,
    errFirstName,
    errLastName,
    errMobile,
    errRelationShip,
  } = props;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Input
          label="Nombres"
          name="firstNameGuarantor"
          value={valFirstName}
          onChange={handleInputChange}
          error={errFirstName}
        />
        <Input
          label="Apellidos"
          name="lastNameGuarantor"
          value={valLastName}
          onChange={handleInputChange}
          error={errLastName}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          label="Cédula de Identidad"
          name="mobileGuarantor"
          value={valMobile}
          onChange={handleInputChange}
          error={errMobile}
        />
        <Input
          label="Parentesco"
          name="relationShipGuarantor"
          value={valRelationShip}
          onChange={handleInputChange}
          error={errRelationShip}
        />
      </Grid>
    </Grid>
  );
}

FormListGuarantor.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valLastName: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  valRelationShip: PropTypes.string.isRequired,
  handleInputChange: PropTypes.string.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errRelationShip: PropTypes.string.isRequired,
};