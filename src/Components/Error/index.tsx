import React from "react";

const Error = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: "#B71111" }}>Error Reported</h3>
      <p style={{ fontWeight: "bold" }}>
        Please refresh page to process further
      </p>
    </div>
  );
};
export default Error;
