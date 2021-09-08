import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { message } from "./message";

function App() {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then(setData);
  }, []);

  return (
    <>
      <div style={{ fontSize: "7em" }}>
        Data is : {data ? message(data) : "loading"}
      </div>
    </>
  );
}

export default App;
