import SocketProvider from "./SocketProvider";
import HostProvider from "./HostProvider";
import GameCodeProvider from "./CodeProvider";
import React from "react";

const Providers: React.FC<{}> = ({ children }) => {
  return (
    <SocketProvider>
      <HostProvider>
        <GameCodeProvider>{children}</GameCodeProvider>
      </HostProvider>
    </SocketProvider>
  );
};

export default Providers;
