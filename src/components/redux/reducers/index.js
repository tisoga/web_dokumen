import { combineReducers } from "redux"
import categoryReducer from './categoryReducer'
import menuReducer from './menuReducer'
import stepReducer from './stepReducer'

const rootReducer = combineReducers({
    category: categoryReducer,
    menu: menuReducer,
    detail: stepReducer
})

export default rootReducer