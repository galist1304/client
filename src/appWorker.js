export default () => {
    self.addEventListener('message', e => {
        if (!e) return;
        let { time, taskText, userID, taskID } = e.data;

        const selectedTime = time.getTime()
        console.log(selectedTime);
        const delay = Math.max(selectedTime - Date.now(), 0);

        setTimeout(() => {
            if (time && taskText) {
                postMessage({ taskText, userID, taskID });
            }
        }, delay);
    });
}