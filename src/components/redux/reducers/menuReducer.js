import { SETMENU } from '../actions/menuActions'

const initialState = {
    isLoading: true,
    menu: []
};

const reducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case SETMENU:
            return action.payload
        default:
            return state
    }
}

export default reducer