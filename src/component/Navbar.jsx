import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as IoIcons from 'react-icons/io';
import { SidebarData } from './SidebarData';
import './Navbar.css'
import {IconContext} from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = ()=> setSidebar(!sidebar);
  return (
    <>
    <IconContext.Provider value={{color:'#fff'}}>
      <div className="navbar">
        <div>
        <img src="src/component/logo.png" alt="Chitter-Chatter logo"/>
        <Link to="#" className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        </div>
        <div class="searchContainer">
          <FaIcons.FaSearch/>
          <input class="searchBox" type="search" name="search" placeholder="Search..."/>
        </div>
        <div>
        <AiIcons.AiOutlineHome />
        <HiIcons.HiUsers />
        <AiIcons.AiOutlineMail />
        <IoIcons.IoMdNotificationsOutline/>
        </div>
      </div>
      <nav className ={sidebar ? 'nav-menu active':'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to ="#" className='menu-bars'>
              <AiIcons.AiOutlineClose/>
            </Link>
          </li>
          {SidebarData.map((item,index)=>{
            return (
              <li key={index} className={item.cName}>
                <Link to = {item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
