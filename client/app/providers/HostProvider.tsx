import React, { createContext, useContext, useState } from "react";

const HostProviderContext = createContext<{
  isHost: boolean;
  setIsHost: React.Dispatch<React.SetStateAction<boolean>> | null;
}>({ isHost: false, setIsHost: null });

export const useHost = () => {
  return useContext(HostProviderContext);
};

const HostProvider: React.FC<{}> = ({ children }) => {
  const [isHost, setIsHost] = useState<boolean>(false);
  return (
    <HostProviderContext.Provider value={{ isHost, setIsHost }}>
      {children}
    </HostProviderContext.Provider>
  );
};

export default HostProvider;
