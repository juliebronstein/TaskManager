import React from "react";
import Input from "./Input";
import Checkbox from "./CheckBox";
import Select from "./Select";


const FormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "select":
      return <Select {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
      return null;
  }
};

export default FormikControl;