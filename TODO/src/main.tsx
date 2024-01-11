import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "./UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
