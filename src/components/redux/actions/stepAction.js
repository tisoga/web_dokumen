export const SETSTEP = 'SETSTEP'

export const setStep = (val) => {
    return {
        type: SETSTEP,
        payload: val
    }
}