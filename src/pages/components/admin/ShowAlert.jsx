import React, { useEffect, useState } from 'react'
import { useContexts } from '../../../useContext/ContextsProvider'
import { Alert } from '@mui/material';

const ShowAlert = () => {
    const { errorText } = useContexts()
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (errorText !== '') {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorText]);

    return (
        <div>
            {showAlert && (
                <Alert severity="error">
                    {errorText}
                </Alert>
            )}
        </div>
    )
}

export default ShowAlert