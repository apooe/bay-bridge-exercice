import React from "react";
import loader from "./loader.gif";

const Loader = () => {
  return (
    <div
      className={
        "d-flex justify-content-center align-items-center text-center p-5"
      }
      style={{ height: "100vh" }}
    >
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
