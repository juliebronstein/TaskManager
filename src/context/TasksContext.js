import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "./UserContext";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [categories, setCatergories] = useState([]);
  const [taskFilter, setTaskFilter] = useState("All"); // Default filter is "All"
  const [selectedCateId, setSelectedCateId] = useState("All"); // Default filter is "All"
  const [filteredTasks, setFilteredTasks] = useState([]);

  const getFilteredTasks = (tasks) => {
    if(selectedCateId==="All"){
    if (taskFilter === "All") {
      // Return all tasks when the filter is set to "All"
      return tasks;
    } else if (taskFilter === "notDone") {
      return tasks.filter((task) => task.state === "notDone" );
    } else if (taskFilter === "done") {
      return tasks.filter((task) => task.state === "done" );
    }}
    else{
      if (taskFilter === "All") {
        return tasks.filter((task) =>  task.cateId===selectedCateId )
      } else if (taskFilter === "notDone") {
        return tasks.filter((task) => task.state === "notDone" && task.cateId===selectedCateId );
      } else if (taskFilter === "done") {
        return tasks.filter((task) => task.state === "done" && task.cateId===selectedCateId );
      }
    }
  };

  const getCategoris = async () => {
    try {
      const categoryRef = collection(db, 'category');
      const querySnapshot = await getDocs(categoryRef);
      const categoryData = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Check if the task belongs to the current user
        if (data.userId === currentUser?.uid) {
          let newdata = {
            catId: data.catId,
            color: data.color,
            title: data.title,
            userId: data.userId,
          };
          categoryData.push(newdata);
        }
      });
  
      // Set tasks here after fetching and processing data
      setCatergories(categoryData);
    } catch (error) {
      console.error('Error fetching task data:', error);
      throw error;
    }
  }

  useEffect(() => {
    getCategoris();
  }, [currentUser]);

  useEffect(() => {
    const filtered = getFilteredTasks(tasks);
    setFilteredTasks(filtered);
  }, [tasks, taskFilter , selectedCateId]);

  const getTasks = async () => {
    try {
      const taskRef = collection(db, 'task');
      const querySnapshot = await getDocs(taskRef);
      const taskData = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Check if the task belongs to the current user
        if (data.uId === currentUser?.uid) {
          let cate = categories.find((c) => c.catId === data.cateId);
          let newdata = {
            cateId: data.cateId,
            taskId: data.taskId,
            title: data.title,
            uId: data.uId,
            state: data.state,
            cateTitle: cate?.title,
            cateColor: cate?.color,
          };
          taskData.push(newdata);
        }
      });
        setTasks(taskData);
    } catch (error) {
      console.error('Error fetching task data:', error);
      throw error;
    }
  };
  useEffect(() => {
    // Call the function to set tasks when categories change
    getTasks();
  }, [categories]);



  return (
    <TaskContext.Provider value={{ setTasks, tasks: filteredTasks, setCatergories, categories, taskFilter, setTaskFilter ,selectedCateId, setSelectedCateId }}>
      {children}
    </TaskContext.Provider>
  );
};
