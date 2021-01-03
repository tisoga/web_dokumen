import { SETCATEGORY, SETSELECTEDCATEGORY } from '../actions/categoryActions'

const initialState = {
    selected: "Web",
    content: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETCATEGORY:
            return {
                ...state, content: action.payload
            }
        case SETSELECTEDCATEGORY:
            return {
                ...state, selected: action.payload
            }
        default:
            return state
    }

}

export default reducer