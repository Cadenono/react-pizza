import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
  const override = `
    display: block;
 margin: "5px";
    border-color: red;
  `;
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading text-center">
      <SyncLoader color="orange" loading={loading} css="" size={4} />
    </div>
  );
}

export default Loader;
