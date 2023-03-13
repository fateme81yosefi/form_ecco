import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const EditedObjProvider = (props) => {
  

  let [EditedObj, setEditedObj] = useState([]);

  
  return (
    <EditedObjContext.Provider value={[EditedObj, setEditedObj]}>
      {props.children}
    </EditedObjContext.Provider>
  );
};