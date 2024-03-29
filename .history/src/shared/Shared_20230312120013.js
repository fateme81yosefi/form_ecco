import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
export const BrandContext = createContext();
export const PollContext = createContext();

export const DataProvider = (props) => {
  

  let [Data, setData] = useState({});

  
  return (
    <DataContext.Provider value={[Data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};