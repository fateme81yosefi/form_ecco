import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const EditedObjProvider = (props) => {
  

  let [EditedObj, setData] = useState([]);

  
  return (
    <DataContext.Provider value={[Data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};