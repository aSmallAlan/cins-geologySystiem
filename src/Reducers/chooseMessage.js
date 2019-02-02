import * as actionTypes from '../Constants/chooseMessage';
const initialState = {};

//地区保存
export function regionData(state = initialState, action){
    switch (action.type) {
        case actionTypes.REGIONMESSAGE_SET:{
            //保存井号信息
            return action.data
        }

        default:
            return state
    }
}
//偏光类型
export function poltypeData(state = initialState, action){
    switch (action.type) {
        case actionTypes.POLTYPEMESSAGE_SET:{
            //保存井号信息
            return action.data
        }

        default:
            return state
    }
}
//岩性
export function lithosData(state = initialState, action){
    switch (action.type) {
        case actionTypes.LITHOSMESSAGE_SET:{
            //保存井号信息
            return action.data
        }

        default:
            return state
    }
}
