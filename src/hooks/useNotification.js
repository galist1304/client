import { useState } from "react";
import worker from "../appWorker";
import WebWorker from "../webWorker";
import { useContexts } from "../useContext/ContextsProvider";
import useLogin from "./useLogin";

const useNotification = () => {
    const [time, setTime] = useState('');
    const { setNotificationData, taskStatus, currentTask, loggedUser } = useContexts();
    const { fetchUserData } = useLogin()

    const webWorker = new WebWorker(worker);

    // Posts a message to the web worker
    const addNotification = () => {
        console.log(currentTask.text);
        console.log(time);
        webWorker.postMessage({ time, taskText: currentTask.text, userID: currentTask.userID, taskID: currentTask._id });
    }

    // check if the user can get the reminder 
    const handleMessage = (event) => {
        console.log(event.data);
        if (taskStatus[event.data.taskID] !== undefined) {
            console.log("in");
            fetchUserData();
        }

        if (!taskStatus[event.data.taskID] && loggedUser.userID == event.data.userID) {
            const data = { ...event.data, taskText: currentTask.text }
            setNotificationData(data);
        }
    };

    webWorker.addEventListener('message', handleMessage);

    return { setTime, addNotification }
}

export default useNotification;