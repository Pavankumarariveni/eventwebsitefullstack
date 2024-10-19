import Cookies from 'js-cookie'

import { IoMdMenu,IoMdHeart,IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import './index.css'
import { useNavigate } from 'react-router-dom';



const Navbar = () => { 
    const back = useNavigate()
    const onClickLogout = () => {
        
        Cookies.remove('jwt_token')
        back('/login')

    }
    
    return (
        <nav className="nav-con">
            <h1 className="logo">BookUsNow</h1>
            <div className="nav-rem-con">
                <div className="categories-con">
                    <IoMdMenu className="categories-logo"/>
                    <h1 className="categories-head">Categories</h1>
                </div>
                <div className="search-con">
                    <input className="search-input" type="search" placeholder="Search Here.."/>
                    <IoIosSearch className="search-logo"/>
                </div>
                <div className="fav-con">
                    <IoMdHeart className="fav-logo"/>
                    <h1 className="fav-head">Favorites</h1>
                </div>
                <button onClick={onClickLogout} className="nav-btn">Logout</button>
            </div>
            <div className="sm-logo">
                <IoIosSearch className="logo-sm"/>
                <IoMdHeart className="logo-sm"/>
                <MdLogout onClick={onClickLogout} className="logo-sm"/>
            </div>
        </nav>
)}

export default Navbar