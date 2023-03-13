import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const EditedObjProvider = (props) => {
  

  let [EditedObj, setEditedObj] = useState([]);

  
  return (
    <DataContext.Provider value={[EditedObj, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};