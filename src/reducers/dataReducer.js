const defaultState = {
    apiData : {},
    error : null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                // apiData: action.apiData,
                apiData : action.apiData["current"]["data"]["pt2-scaled"]
            };

        case 'FETCH_ERROR':
            return {
            ...state,
            err : action.err
            };

    default:
        return state;
    }
}