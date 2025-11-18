import React from "react";
import { Toaster as ReactHotToast } from "react-hot-toast";

const Toaster = () => {
  return (
    <ReactHotToast
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default Toaster;
