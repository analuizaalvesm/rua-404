import Footer from './components/custom/Footer/Footer'
import Navbar from './components/custom/NavBar/NavBar'
import { UserProvider } from './context/useAuth'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <UserProvider>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </UserProvider>
  )
}
