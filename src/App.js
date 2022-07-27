import Routes from './Routes'
import GlobalProvider from "./context/GlobalProvider";
import UserProvider from "./context/UserProvider";

import "./App.css";

const App = () => {
  return (
   <GlobalProvider>
    <UserProvider>
      <Routes/>
    </UserProvider>
   </GlobalProvider>
  )
}

export default App;
