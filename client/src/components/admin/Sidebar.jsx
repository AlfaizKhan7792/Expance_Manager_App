import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BanknoteArrowUp, BanknoteArrowDown, User, CircleAlert, LogOut } from 'lucide-react';
import {useDispatch} from "react-redux"
import { LogoutUser } from '../../features/Auth/AuthSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  const menuItems = [
    { name: "Dashboard", path: "/", icon:<LayoutDashboard /> },
    { name: "All-Users", path: "/all-users", icon:<Users /> },
    { name: "Total-Income", path: "/total-income", icon:<BanknoteArrowUp /> },
    { name: "Total-Expense", path: "/total-expense", icon:<BanknoteArrowDown /> },
    { name: "Single-User", path: "/user-trans", icon:<User /> },
    { name: "About-Us", path: "/about-us", icon:<CircleAlert /> }
  ];

  const handleLogout = () =>{
dispatch(LogoutUser())
  }

  return (
 <>
    <aside className="h-screen bg-white border-r px-4 py-6 hidden md:block">
   <div className="flex h-[95vh] items-center justify-between flex-col ">
      <span>
       <Link to="/">
        <div className="text-xl font-bold text-red-800 mb-10">Expense_Manager_App</div>
      </Link>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`block font-medium transition duration-300 ${
                location.pathname === item.path
                  ? 'text-red-800 font-semibold'
                  : 'text-gray-700 hover:text-red-800'
              }`}
            >
            <span className='flex items-center gap-3' >{item.icon} {item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
     </span>
      <button onClick={handleLogout}  className='flex items-center justify-center border border-red-800 p-2 font-bold  text-red-800 hover:text-white hover:bg-red-800 w-full text-sm rounded-md' ><LogOut /></button>
   </div>
    </aside>
 </>
  );
};

export default Sidebar;
