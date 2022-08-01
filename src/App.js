import GlobalProvider from './context/GlobalProvider'
import UserProvider from './context/UserProvider'

import Routing from './Routes'

const App = () => (
  <GlobalProvider>
    <UserProvider>
      <Routing />
    </UserProvider>
  </GlobalProvider>
)

export default App
