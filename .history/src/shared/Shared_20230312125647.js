import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const EProvider = (props) => {
  

  let [Data, setData] = useState([]);

  
  return (
    <DataContext.Provider value={[Data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};