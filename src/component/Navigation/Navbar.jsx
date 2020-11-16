import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../Logo/logo192.png';

import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as IoIcons from 'react-icons/io';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import {IconContext} from 'react-icons';
import { AppBar, IconButton, InputBase, Toolbar } from '@material-ui/core';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = ()=> setSidebar(!sidebar);
  return (
    <>
    <IconContext.Provider value={{style:{margin:"2px"} }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
        <img src={logo} alt="Chitter-Chatter logo"/>
        <Link to="#" className='menu-bars'>
          <IconButton>
          <MenuIcon onClick={showSidebar}/>
          </IconButton>
        </Link>
        <div className="searchContainer">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"

              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        {/* <div class="searchContainer">
          <FaIcons.FaSearch/>
          <input class="searchBox" type="search" name="search" placeholder="Search..."/>
        </div> */}
        <div>
        <AiIcons.AiOutlineHome />
        <HiIcons.HiUsers />
        <AiIcons.AiOutlineMail />
        <IoIcons.IoMdNotificationsOutline/>
        </div>
        </Toolbar>
      </AppBar>
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
