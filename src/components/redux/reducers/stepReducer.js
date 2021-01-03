const { SETSTEP } = require("../actions/stepAction");

const initialState = {
    isLoading: false,
    selectedIdMenu: '',
    title: 'Silahkan Pilih Dokumen',
    steps: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETSTEP:
            return action.payload
        default:
            return state
    }
}

export default reducer