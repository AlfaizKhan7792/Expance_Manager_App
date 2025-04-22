import React from 'react'
import HomePage from './pages/HomePage'
import AddTransaction from './pages/AddTransaction'
import AddCategories from './components/AddCategories'
import ViewDetails from './pages/ViewDetails'
import { HashRouter as Router , Routes , Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import PrivateComponent from './components/PrivateComponent'
import PageNotFound from './pages/PageNotFound'
import AutoLogout from './components/AutoLogout'

const App = () => {
  return (
    <Router>
<Navbar />
<AutoLogout />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
      <Route path='/' element={<PrivateComponent />}>
      <Route path='' element={<HomePage />} />
        <Route path='add-transaction' element={<AddTransaction />} />
        <Route path='add-categories' element={<AddCategories /> } />
        <Route path='view-details' element={<ViewDetails />} />
      </Route>
<Route path='/login' element={<LoginPage />} />
<Route path='/register' element={<RegisterPage />} />
      </Routes>     
     <ToastContainer />
    </Router>
  )
}

export default App
