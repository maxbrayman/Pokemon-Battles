import React, { createContext, useContext, useState } from "react";

const GameCodeContext = createContext<{
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>> | null;
}>({ code: "", setCode: null });

export const useGameCode = () => {
  return useContext(GameCodeContext);
};

const GameCodeProvider: React.FC<{}> = ({ children }) => {
  const [code, setCode] = useState<string>("");
  return (
    <GameCodeContext.Provider value={{ code, setCode }}>
      {children}
    </GameCodeContext.Provider>
  );
};

export default GameCodeProvider;
