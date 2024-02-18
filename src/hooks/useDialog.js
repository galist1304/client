import { useState } from "react";


const useDialog = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSettingReminder, setIsSettingReminder] = useState(false);
    const [editedTaskStatus, setEditedTaskStatus] = useState('');
    const [isAddNotification, setIsAddNotification] = useState(false);
    const [isDeleteCompleted, setIsDeleteCompleted] = useState(false);

    return {isEditing, editedTaskStatus, isSettingReminder, isAddNotification, isDeleteCompleted, setIsDeleteCompleted, setIsAddNotification, setIsSettingReminder, setIsEditing, setEditedTaskStatus}
}

export default useDialog