import React from "react";
import PropTypes from "prop-types";
import * as ConstDate from "elements/data/ConstDate";
import Input from "elements/Input";
import RadioG from "elements/RadioG";
import SelectG from "elements/SelectG";
import DatePickerH from "elements/DatePickerH";

export default function FormList2(props) {
  const { valTariff, valCivil, valBirthDate, valAddress, handleInputChange, errCivil, errAddress } =
    props;

  return (
    <>
      <RadioG
        name="tariff"
        label="Tarifa"
        value={valTariff}
        onChange={handleInputChange}
        items={ConstDate.tariffItems()}
      />
      <SelectG
        name="civil"
        label="Estado Civil"
        value={valCivil}
        onChange={handleInputChange}
        options={ConstDate.getCivilStatus()}
        error={errCivil}
      />
      <DatePickerH
        name="birthDate"
        label="Fecha de Nacimiento"
        value={valBirthDate}
        onChange={handleInputChange}
      />
      <Input
        label="Dirección"
        name="address"
        value={valAddress}
        onChange={handleInputChange}
        error={errAddress}
        read=""
      />
    </>
  );
}

FormList2.propTypes = {
  valTariff: PropTypes.string.isRequired,
  valCivil: PropTypes.string.isRequired,
  valBirthDate: PropTypes.instanceOf(Date).isRequired,
  valAddress: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errCivil: PropTypes.string.isRequired,
  errAddress: PropTypes.string.isRequired,
};
