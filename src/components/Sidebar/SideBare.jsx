import React, { useContext, useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";
import pic from "../../img/logo.png";
import { TaskContext } from "../../context/TasksContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import AddCategory from "../Category/AddCategory";
import Collaps from "../form/Collaps";
import 'animate.css';


const SideBar = ({className,seToggle}) => {
  const {setSelectedCateId,categories } = useContext(TaskContext);
  const hadlerFilter= id => setSelectedCateId(id)
  const handelSetAllTasks=()=>setSelectedCateId("All")
  const [options,setOptions]=useState([null])
useEffect(()=>{
  setOptions(
    categories.map((cate) => {
      return {
        id: cate.catId,
        value: cate.title,
        color:cate.color,
      };
    })
  );
},[categories])
// animate__animated animate__fadeInLefte animate__delay-2s
  return (
    
    <div className={` ${className} d-md-flex col-12 col-md-2 vh-100 sidebare `}>
      <img className="col-4 md-2 md-md-0 col-md-6" src={pic} alt="" onClick={()=>{seToggle(false)}}/> 
      <div className="d-flex flex-column sid-content col-9">
        <div className="cursor-pointer mb-1 ps-3 f-sidebare color-perpul mt-2 mt-md-0" onClick={()=>{
          handelSetAllTasks();
          seToggle(false)
        }}>
         <BsClipboard2Check className="icon"/>
          Tasks
        </div>
        <div className="collaps">
        <Collaps title="Categories" options={options} handelClick={hadlerFilter} className={"f-sidebare"} seToggle={seToggle}>
          <AddCategory className="col-10 text-center mt-2 add" />
        </Collaps></div>
        <div className="cursor-pointer mt-1 ps-3 f-sidebare">
          <IoSettingsOutline className="icon" />
          Setting
        </div>
      </div>
      <span
        className="logout ps-3"
        onClick={() => {
          signOut(auth);
        }}
      >
        {" "}
        Logout <MdLogout className="CiLogout" />
      </span>
    </div>
  );
};

export default SideBar;
