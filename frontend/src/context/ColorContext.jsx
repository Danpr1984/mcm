import { createContext, useState } from "react";

export const ColorContext = createContext({
  assignTrack: "",
  setAssignTrack: () => {},
});

export default function ColorContextProvider({ children }) {
  const [assignTrack, setAssignTrack] = useState("");

  const value = {
    assignTrack,
    setAssignTrack,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
