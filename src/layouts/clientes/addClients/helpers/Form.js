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
      margin: "10px 0px 32px 50px",
      paddingBottom: "20px",
      width: "70%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
    },
    // ButtonGroup
    "& #demo-controlled-radio-buttons-group": {
      color: "grey",
      margin: "15px 0px 15px 15px",
    },
    // ButtonGroup
    "& .MuiRadio-root": {
      margin: "2px 10px 0px 40px",
    },
    // ButtonGroup
    "& .MuiTypography-root": {
      color: "#8C8F90",
      fontSize: "15px",
    },
    // ButtonGroup
    "& .MuiTouchRipple-root": {
      color: "black",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      margin: "10px 0px 40px 50px",
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
      width: "20%",
      color: "black",
      margin: "100px 10px 0px 15px",
      "&:hover": {
        backgroundColor: "#929CA2",
      },
    },
    // Subtítulo
    "& .Subtitles": {
      fontSize: 20,
      color: "white",
      textAlign: "center",
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
