import { Sidebar } from "../sidebar/Sidebar"
import './Layout.css'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";


const Layout = () => {
    // console.log("layout rendered");

    const navigate = useNavigate()

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        // console.log(token);
        if (token) {
            return true
        }
        return false;
    }
    const loggedIn = isLoggedIn();

    if (!loggedIn) {
        return <Navigate to='/login' />

    }

    const userName = localStorage.getItem("username") || 'User';

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="rightside">
                <div className="logout-class">
                    {/* <Button text="Logout" className={"logout-btn"} type={"submit"} onClick={handleLogout} /> */}
                    {/* <button> */}
                    {/* <img width={40} height={40} className="logout-btn" src={logoutIcon} alt="logout" onClick={handleLogout}/> */}
                    <h2>{`Hi, ${userName}`}</h2>


                    <MdLogout size={40} onClick={handleLogout} />
                    {/* </button> */}
                </div>
                <div className='right-header'></div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;