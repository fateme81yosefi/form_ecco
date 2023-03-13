import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const DataProvider = (props) => {
  

  let [Data, setData] = useState([]);

  
  return (
    <DataContext.Provider value={[E, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};