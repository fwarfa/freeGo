const hazardReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_HAZARD':
            return action.payload;
        case 'CLEAR_HAZARD':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default hazardReducer;