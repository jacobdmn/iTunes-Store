import React, { useContext } from "react";
import { UserContext } from "./data";

const Test = () => {
  const { setData_GLOBAL } = useContext(UserContext);
  // alert(setData_GLOBAL);
  return <div></div>;
};

export default Test;
