import React, { useContext, useEffect, useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import {VscFilterFilled} from 'react-icons/vsc';
import { TaskContext } from '../../context/TasksContext';
const Tasks = () => {
  const [show, setShow] = useState(false);
  const [editTask,setEditTask]=useState(null)
  const {setTaskFilter } = useContext(TaskContext);

    return (
      <>
      <div className='col-12 col-md-10 pt-5 pt-md-0 main d-flex flex-column align-item-center vh-100 '>
        <div className='col-10 d-flex justify-content-between align-item-center ps-2' >
          <div className='d-none col-4 d-md-flex fs-4'>Task List</div>
          <div className='d-flex flex-row justify-content-center align-item-center col-12 col-md-8 px-2'>
            <button  onClick={() => setTaskFilter('All')} className='chips col-3'>All</button>
            <button  onClick={() => setTaskFilter('notDone')} className='chips col-3 col-md-3 text-nowrap'>To Do</button>
            <button onClick={() => setTaskFilter('done')} className='chips col-3'>Done</button>
            <button className='chips col-3 col-md-2'><VscFilterFilled/></button>             
          </div>
        </div>
          <Task  setEditTask={setEditTask} setShow={setShow} />
          <AddTask editTask={editTask} setEditTask={setEditTask} show={show} setShow={setShow} />        
      </div>
    </>
    );
}

export default Tasks;
