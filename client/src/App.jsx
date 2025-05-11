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
import Dashboard from './pages/Dashboard'
import AllUsers from './components/admin/AllUsers'
import IncomeList from './components/admin/IncomeList'
import ExpenseList from './components/admin/ExpenseList'
import UserTrans from './components/admin/UserTrans'
import AboutUs from './components/admin/AboutUs'
import {useSelector} from "react-redux"

const App = () => {

  const {All_Users} = useSelector(state => state.Auth)
  const isAdmin = All_Users?.admin === true

  return (
    <Router>
{!isAdmin && <Navbar />}
<AutoLogout />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
      <Route path='/' element={<PrivateComponent />}>
      <Route path='' element={<HomePage />} />
        <Route path='add-transaction' element={<AddTransaction />} />
        <Route path='add-categories' element={<AddCategories /> } />
        <Route path='view-details' element={<ViewDetails />} />
      </Route>
      <Route path='/' element={<PrivateComponent />} >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/total-income' element={<IncomeList />} />
        <Route path='/total-expense' element={<ExpenseList />} />
        <Route path='/user-trans' element={<UserTrans />} />
        <Route path='/about-us' element={<AboutUs />} />
      </Route>
<Route path='/login' element={<LoginPage />} />
<Route path='/register' element={<RegisterPage />} />
      </Routes>     
     <ToastContainer />
    </Router>
  )
}

export default App
