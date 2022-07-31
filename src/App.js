import GlobalProvider from "./context/GlobalProvider"
import UserProvider from "./context/UserProvider"

import Routes from './Routes'

const App = () => (
  <GlobalProvider>
    <UserProvider>
      <Routes />
    </UserProvider>
  </GlobalProvider>
)

export default App
