/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Todos los Inputs
    "& .MuiFormControl-root": {
      width: "90%",
      margin: "12px",
    },
    // ButtonGroup
    "& .ControlTariff": {
      margin: "10px 0px 10px 50px",
      paddingBottom: "3px",
      width: "70%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
    },
    // ButtonGroup
    "& #demo-controlled-radio-buttons-group": {
      color: "grey",
      margin: "10px 0px 5px 15px",
    },
    // ButtonGroup
    "& .MuiRadio-root": {
      margin: "0px 10px 0px 40px",
    },
    // ButtonGroup
    "& .MuiTypography-root": {
      color: "#8C8F90",
      fontSize: "15px",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      margin: "10px 0px 10px 50px",
      width: "70%",
    },
    // Selector
    "& #demo-simple-select": {
      height: 44,
      marginLeft: "8px",
    },
    // DatePicker
    "& .Calendario": {
      width: "70%",
      margin: "15px 0px 10px 50px",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "30%",
      color: "black",
      // margin: "10px",
    },
    // Buttons
    "& .MuiButton-containedPrimary": {
      background: "#42a5f5",
      margin: "25px 14px 20px 60px",
    },
    // Buttons
    "& .MuiButton-containedSuccess": {
      background: "#f57c00",
      margin: "25px 0px 20px 14px",
    },
    // Buttons
    "& .MuiButton-containedWarning": {
      background: "#e3f2fd",
      width: "60%",
      margin: "0px 0px 0px 75px",
    },
  },
});

export default function Form(props) {
  const classes = useStyles();

  const { children, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
