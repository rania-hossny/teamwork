import React, { useState,useEffect } from 'react'
import './Navbar.css';
import { Link, NavLink,useHistory } from 'react-router-dom';
import { Container, NavDropdown } from 'react-bootstrap';
import image from './image.jpg'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as IconName from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import axios from "axios"


function Header() {
  const history=useHistory();
  const [showLinks, setShowLinks] = useState(false);
  const id=localStorage.getItem("id")
  const name=localStorage.getItem("name")
  let local=JSON.parse(localStorage.getItem("user-info"))
  // console.warn(local.user.url);
  // const url = local.user.url;
  const token=localStorage.getItem("token")
  const [url, setUrl] = useState("");
  

  
useEffect(() => {
  getUsers();
}, [name])
function getUsers() {
  fetch("https://boiling-shelf-43809.herokuapp.com/user/"+id+"/profile"
  , {
    headers:{
      "authorization":`${token}`
    }
  }
  ).then((result) => {
    result.json().then((resp) => {
      // console.warn(resp)
      // console.warn(resp.profile)
      setUrl(resp.profile.url)
    })
  })
}
function logout(){
  // const deviceToken=localStorage.getItem("deviceToken")
  // const formData = new FormData();
  // formData.append("token",deviceToken)
  // axios({
  //   method:"POST",
  //   url:"https://boiling-shelf-43809.herokuapp.com/notifications/unsubscribe",
  //   data:formData,
  //   headers:{
  //     "authorization":`${token}`
  //   }
  // }).then(res=>console.log(res.data)) 
  history.push("/")
  localStorage.clear();
}

let menu
if(localStorage.getItem("user-info")){
  // let user=JSON.parse(localStorage.getItem("user-info"))
  // const { id} = user;
 

  menu=(
    <>
    <div className="logo">
                ma<p>T </p> es
              </div>
          
      <div className="navbarSupportedContent">

        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink className="nav-link" to={"/Profile/"+id}>
              <BsIcons.BsFillPersonFill /> Profile
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Teams" exact>
              <IoIcons.IoMdPeople /> Teams
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Calendar" exact>
              <AiIcons.AiFillCalendar /> Calendar
              </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Message" exact>
              <AiIcons.AiFillMessage /> Messages
              </NavLink>
          </li>
         
        </ul>


      </div>
      <div className="navbar1">
        
        <div className="right" >
        {/* <span className="search">
            <input type="text" placeholder="search..."/>
          </span> */}
          <span className="notif">
            <AiIcons.AiFillBell />
          </span>
          <img src={url} style={{width:"50px",height:"50px",borderRadius:"50%",marginLeft:"10px"}}/>
         <NavDropdown  title={name ? name :"user" }>
          <NavDropdown.Item> <Link className="profileLink" to={"/Profile/"+id}><FaUser /> My Profile</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={logout} > <IconName.BsBoxArrowRight /> Logout</NavDropdown.Item>
        </NavDropdown>
        


        </div>

      </div>


    </>
  )
}
else{
  menu=(
    <>
    <div className="logo">
                ma<p>T</p>es
             </div> 
             <div class="nav">
            <ul>
            <li><NavLink to="/FormLogin">Sign in</NavLink></li>
            <li>|</li>
            <li className="child"><NavLink to="/Form">Sign Up</NavLink></li>
            </ul>
            </div>

    </>
  )
}

  return (
    <nav className=" navbar-expand-lg navbar-mainbg">
    {menu}
   </nav>
    
  )
}
export default Header;