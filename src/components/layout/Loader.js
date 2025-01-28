import React from "react";

const loaderContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
};

const loaderStyle = {
  border: "4px solid rgba(0, 0, 0, 0.3)",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};

const loadingTextStyle = {
  fontSize: "18px",
  marginTop: "10px",
  color: "#00008B"
};

const Loader = () => {
  return (
    <>
        <div className="loader-container" style={loaderContainerStyle}>
          <div className="loader" style={loaderStyle}></div>
          <p style={loadingTextStyle}>Loading...</p>
          <style>
            {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
          </style>
        </div>
    </>
  );
};

export default Loader;
