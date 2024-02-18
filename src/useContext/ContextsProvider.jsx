import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const ContextsProvider = ({ children }) => {
  const [notificationData, setNotificationData] = useState({});
  const [editedTaskID, setEditedTaskID] = useState('');
  const [taskStatus, setTaskStatus] = useState({});
  const [currentTask, setCurrentTask] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [originalTasks, setOriginalTasks] = useState([]);
  const [errorText, setErrorText] = useState('')
  const [searchedTasks, setSearchedTasks] = useState([])

  return (
    <Context.Provider value={{ notificationData, setNotificationData, editedTaskID, setEditedTaskID, taskStatus, setTaskStatus, originalTasks, setOriginalTasks, currentTask, setCurrentTask, loggedUser, setLoggedUser, errorText, setErrorText, searchedTasks, setSearchedTasks }}>
      {children}
    </Context.Provider>
  );
};

export const useContexts = () => useContext(Context);