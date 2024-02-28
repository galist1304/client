import { useEffect, useState } from "react";
import { useContexts } from "../useContext/ContextsProvider";
import { apiRequest } from "../apiRequest";
import useLogin from "./useLogin";

const useTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [taskBody, setTaskBody] = useState({});
  const [taskText, setTaskText] = useState("");
  const [activeTasks, setActiveTasks] = useState(0);
  const [users, setUsers] = useState([])
  const { taskStatus, setTaskStatus, originalTasks, setOriginalTasks, setErrorText, setSearchedTasks, setCurrentTask } = useContexts()
  const { fetchUserData } = useLogin()

  // gets the user's tasks from the database
  const getTasks = async () => {
    const isValidToken = await fetchUserData()
    const data = await apiRequest('GET', "https://127.20.10.3:8000/tasks", null, isValidToken);
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
  };

  // updates the the task in the database by id
  const updateTask = async (task, taskID, isStatusUpdate) => {
    const isValidToken = await fetchUserData();
    setCurrentTask(prevCurrentTask => ({
      ...prevCurrentTask,
      text: task.text
    }));
    if (taskID) {
      const data = await apiRequest('PATCH', `https://127.20.10.3:8000/tasks/update/${taskID}`, task, isValidToken);
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
    }
  };

  // filters the tasks by category
  const handleFilterClicked = (category) => {
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
      setUserTasks(filteredTasks);
      setSearchedTasks(filteredTasks);
    } else {
      getTasks()
    }
  };

  // Deletes all the completed tasks
  const deleteCompletedTasks = async () => {
    const isValidToken = await fetchUserData()
    try {
      const data = await apiRequest('DELETE', "https://127.20.10.3:8000/tasks/deleteCompleted", null, isValidToken);
      console.log(data);
      await getTasks();
    } catch (error) {
      console.log(error);
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
    const isValidToken = await fetchUserData()
    if (taskBody.text !== undefined) {
      const data = await apiRequest('POST', "https://127.20.10.3:8000/tasks", taskBody, isValidToken);
      if (data == '400: Invalid username') {
        setErrorText('Username does not exist.');
      } else {
        setTaskBody({})
        getTasks();
      }
    }
  };

  // defines the body to send with the request and calls the updateTask function with the body and the id
  const handleCheckBoxClick = (taskText, isChecked, taskID) => {
    const updatedTask = {
      text: taskText,
      status: isChecked ? "Completed" : "Active",
    };
    updateTask(updatedTask, taskID, true);
  };

  // deletes the task in the database by id
  const handleDeleteClick = async (taskID) => {
    const isValidToken = await fetchUserData()
    console.log(isValidToken);
    const data = await apiRequest('DELETE', `https://127.20.10.3:8000/tasks/delete/${taskID}`,null, isValidToken);
    console.log(data);
    delete taskStatus[taskID];
    setUserTasks(userTasks.filter((task) => task._id !== taskID));
    setOriginalTasks(originalTasks.filter((task) => task._id !== taskID));
    setSearchedTasks(userTasks.filter((task) => task._id !== taskID))
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
    const isValidToken = await fetchUserData()
    if (search !== '') {
      const data = await apiRequest('GET', `https://127.20.10.3:8000/users/usersList?search=${search}`, null, isValidToken);
      setUsers(data.usersList)
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
