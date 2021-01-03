export const SETCATEGORY = 'SETCATEGORY';
export const SETSELECTEDCATEGORY = 'SETSELECTEDCATEGORY'

export const setCategory = (val) => {
    return {
        type: SETCATEGORY,
        payload: val
    }
}

export const setSelectedCategory = (val) => {
    return {
        type: SETSELECTEDCATEGORY,
        payload: val
    }
}