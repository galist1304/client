import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContexts } from "../useContext/ContextsProvider";

const useTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [taskBody, setTaskBody] = useState({});
  const [taskText, setTaskText] = useState("");
  const [activeTasks, setActiveTasks] = useState(0);
  const [users, setUsers] = useState([])
  const { taskStatus, setTaskStatus, originalTasks, setOriginalTasks, setErrorText, setSearchedTasks, setCurrentTask } = useContexts()

  const navigate = useNavigate("");

  // gets the user's tasks from the database
  const getTasks = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/tasks", {
        withCredentials: true,
      });
      console.log(data.tasks);
      setUserTasks(data.tasks);
      setOriginalTasks(data.tasks);
      setSearchedTasks(data.tasks);

      // checks for each task, if the status is 'Completed' then initialTaskStatus[task._id] = true, else false
      const initialTaskStatus = {};
      data.tasks.forEach((task) => {
        initialTaskStatus[task._id] = task.status === "Completed";
      });
      setTaskStatus(initialTaskStatus);

      // counts the number of active tasks
      setActiveTasks(0);
      data.tasks.forEach((task) => {
        if (task.status === "Active") {
          setActiveTasks((prevActiveTasksCount) => prevActiveTasksCount + 1);
        }
      });
    } catch (error) {
      console.log(error);
      if (
        [
          "Token not found in cookie",
          "Invalid token",
          "Invalid token format: Not enough segments",
        ].includes(error.response.data.detail)
      ) {
        const confirm = window.confirm('You need to login in order to access this feature.')
        if (confirm) {
          navigate("/");
        }
      }
    }
  };

  // updates the the task in the database by id
  const updateTask = async (task, taskID, isStatusUpdate) => {
    console.log(task.text);
    setCurrentTask(prevCurrentTask => ({
      ...prevCurrentTask,
      text: task.text
    }));
    if (taskID) {
      try {
        const { data } = await axios.patch(
          `http://127.0.0.1:8000/tasks/update/${taskID}`,
          task,
          { withCredentials: true }
        );
        console.log(data);
        if (isStatusUpdate) {
          // changes the task status (boolean) to the opposite, to update the checkbox
          setTaskStatus((prevTaskStatus) => ({
            ...prevTaskStatus,
            [taskID]: !prevTaskStatus[taskID],
          }));

          // changes the task status to 'Active' or 'Completed' in originalTasks
          setOriginalTasks((prevOriginalTasks) =>
            prevOriginalTasks.map((task) => {
              if (task._id === taskID) {
                return {
                  ...task,
                  status: task.status === "Active" ? "Completed" : "Active"
                };
              }
              return task;
            })
          );
        }
        setCurrentTask(data.updatedTask)
      } catch (error) {
        console.log(error);
        if (
          [
            "Token not found in cookie",
            "Invalid token",
            "Invalid token format: Not enough segments",
          ].includes(error.response.data.detail)
        ) {
          const confirm = window.confirm('You need to login in order to access this feature.')
          if (confirm) {
            navigate("/");
          }
        }
      }
    }
  };

  // filters the tasks by category
  const handleFilterClicked = (category) => {
    console.log(originalTasks);
    if (category !== "All") {

      // checks for each task, if the status is 'Completed' then true, else false
      const initialTaskStatus = {};
      originalTasks.forEach((task) => {
        initialTaskStatus[task._id] = task.status === "Completed";
      });
      const filteredTasks = originalTasks.filter(
        (task) => task.status === category
      );

      setTaskStatus(initialTaskStatus);
      console.log(filteredTasks);
      setUserTasks(filteredTasks);
      setSearchedTasks(filteredTasks);
    } else {
      getTasks()
    }
  };

  // Deletes all the completed tasks
  const deleteCompletedTasks = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/tasks/deleteCompleted",
        { withCredentials: true }
      );
      console.log(response);
      await getTasks();
    } catch (error) {
      console.log(error);
      if (
        [
          "Token not found in cookie",
          "Invalid token",
          "Invalid token format: Not enough segments",
        ].includes(error.response.data.detail)
      ) {
        const confirm = window.confirm('You need to login in order to access this feature.')
        if (confirm) {
          navigate("/");
        }
      }
    }
  };

  // updates the task body when the 'enter' key is clicked
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.value = "";
      setTaskBody((prevData) => ({
        ...prevData,
        text: taskText,
        status: "Active",
      }));
    }
  };

  // adds a task in the database and calls the getTasks function to get all the user's tasks
  const addTask = async () => {
    try {
      if (taskBody.text !== undefined) {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/tasks",
          taskBody,
          { withCredentials: true }
        );
        console.log(data);
        getTasks();
      }
    } catch (error) {
      console.log(error);
      if (
        [
          "Token not found in cookie",
          "Invalid token",
          "Invalid token format: Not enough segments",
        ].includes(error.response.data.detail)
      ) {
        const confirm = window.confirm('You need to login in order to access this feature.')
        if (confirm) {
          navigate("/");
        }
      } if (error.response.data.detail == '400: Invalid username') {
        setErrorText('Username does not exist.');
      }
    }
  };

  // defines the body to send with the request and calls the updateTask function with the body and the id
  const handleCheckBoxClick = (taskText, isChecked, taskID) => {
    const updatedTask = {
      text: taskText,
      status: isChecked ? "Completed" : "Active",
    };
    console.log(taskID);
    updateTask(updatedTask, taskID, true);
  };

  // deletes the task in the database by id
  const handleDeleteClick = async (taskID) => {
    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:8000/tasks/delete/${taskID}`,
        { withCredentials: true }
      );
      console.log(data);
      delete taskStatus[taskID];
      setUserTasks(userTasks.filter((task) => task._id !== taskID));
      setOriginalTasks(originalTasks.filter((task) => task._id !== taskID));
      setSearchedTasks(userTasks.filter((task) => task._id !== taskID))
    } catch (error) {
      console.log(error);
      if (
        [
          "Token not found in cookie",
          "Invalid token",
          "Invalid token format: Not enough segments",
        ].includes(error.response.data.detail)
      ) {
        const confirm = window.confirm('You need to login in order to access this feature.')
        if (confirm) {
          navigate("/");
        }
      }
    }
  };

  // counts the number of active tasks
  useEffect(() => {
    setActiveTasks(originalTasks.filter(task => task.status === "Active").length)
  }, [originalTasks]);

  // filters the tasks based on the value of the input
  const searchTasks = (search) => {
    if (search.length > 0) {
      setSearchedTasks(userTasks.filter(task => task.text.includes(search)))
    }
    else {
      setSearchedTasks(userTasks)
    }
  }

  // Filters the users based on the value of the input
  const searchUsers = async (search) => {
    if(search !== ''){
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/users/usersList?search=${search}`, { withCredentials: true })
        console.log(data.usersList);
        setUsers(data.usersList)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return {
    userTasks,
    originalTasks,
    taskStatus,
    taskBody,
    activeTasks,
    users,
    setTaskText,
    setTaskBody,
    getTasks,
    updateTask,
    handleFilterClicked,
    deleteCompletedTasks,
    handleKeyPress,
    addTask,
    handleCheckBoxClick,
    handleDeleteClick,
    searchTasks,
    searchUsers
  };
};

export default useTasks;
