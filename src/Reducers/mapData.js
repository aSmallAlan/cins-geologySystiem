import * as actionTypes from '../Constants/mapData';
const initialState = {};

export default function mapData(state = initialState, action){
    switch (action.type) {
        case actionTypes.MAPDATA_SET:{
            console.log('action.data', action.data);
            // 保存登录信息
            return action.data
        }

        default:
            return state
    }
}
