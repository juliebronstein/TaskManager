import React, { useContext, useEffect, useState } from 'react';
import Tasks from '../components/Task/Tasks';
import SideBar from '../components/Sidebar/SideBare';
const Home = () => {


    return (
      <div className='col-12 d-flex flex-row'>
      <SideBar/>
      <Tasks/>
      </div>
    );
}

export default Home;
