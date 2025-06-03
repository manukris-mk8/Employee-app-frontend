import { Sidebar } from "../sidebar/Sidebar"
import './Layout.css'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";


const Layout = () => {

    const navigate = useNavigate()

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        if (token) {
            return true
        }
        return false;
    }
    const loggedIn = isLoggedIn();

    if (!loggedIn) {
        return <Navigate to='/login' />

    }

    const token = localStorage.getItem("token") || null
    const userDetails = token && JSON.parse(token)

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="rightside">
                <div className="logout-class">
                    <h2>{`Hi, ${userDetails.name}`}</h2>
                    <MdLogout size={40} onClick={handleLogout} />
                </div>
                <div className='right-header'></div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;