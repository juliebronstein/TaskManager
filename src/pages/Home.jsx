import React, {  useState } from 'react';
import Tasks from '../components/Task/Tasks';
import SideBar from '../components/Sidebar/SideBare';
const Home = () => {
const [toggle,setToggle]=useState(false)
    return (
      <>
      <div className='col-12 d-flex flex-column flex-md-row'>
      <SideBar className={`${toggle?"":"d-none"}`} seToggle={setToggle}/>
      <Tasks className={`${!toggle?"":"d-none"}`}  seToggle={setToggle}/>
      </div></>
    );
}

export default Home;
