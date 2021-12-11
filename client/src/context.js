import React, { useState, useContext } from "react";
const RoleContext = React.createContext(undefined);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const handleRole = (role) => {
    setRole(role);
  };
  const data = [role, handleRole];
  return <RoleContext.Provider value={data}> {children} </RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole can only be used inside RoleProvider");
  }
  return context;
};
