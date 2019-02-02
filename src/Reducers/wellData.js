import * as actionTypes from '../Constants/wellData';
const initialState = {};

export default function mapData(state = initialState, action){
    switch (action.type) {
        case actionTypes.WELLDATA_SET:{
            console.log('action.data', action.data);
            //保存井号信息
            return action.data
        }

        default:
            return state
    }
}
