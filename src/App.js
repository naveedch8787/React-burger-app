import "./App.css";
import React from "react";

import Index from "./components/Index"
import GlobalProvider from "./context/GlobalProvider";
import UserProvider from "./context/UserProvider";

function App() {
  return (
   <>
   <GlobalProvider>
    <UserProvider>
      <Index/>
    </UserProvider>
   </GlobalProvider>

   </>
  );
}

export default App;
