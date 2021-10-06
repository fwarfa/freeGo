import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HazardManagement = () => {

    const dispatch = useDispatch();
    const hazards = useSelector(store => store.dashBoardReducer);


    useEffect(() => {
    dispatch({ type: "FETCH_DASHBOARD"})
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default HazardManagement
