import './Sidebar.css'
import kvLogo from '../../assets/kv-logo.png'
import icon from '../../assets/icon.svg'

export const Sidebar = () => {
    return (
       <div className='sidebar'>
        <img className='logo' src={kvLogo} alt="kv-logo" />
        <nav>
            <img src={icon} alt="emp-icon" />
            <a href="">Employee List</a>    
        </nav>
       </div>
    )
}