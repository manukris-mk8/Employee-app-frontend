import './Sidebar.css'
import kvLogo from '../../assets/kv-logo.png'
import icon from '../../assets/icon.svg'
import { useLocation } from 'react-router-dom'

export const Sidebar = () => {
    const path = useLocation()
    const urlPath = path.pathname;
    return (
       <div className='sidebar'>
        <img className='logo' src={kvLogo} alt="kv-logo" />
        <nav className={urlPath=='/profile'?'navbar-alt':'navbar'}>
            <img src={icon} alt="emp-icon" />
            <a href="/employees">Employee List</a>    
        </nav>
       </div>
    )
}