import * as actionTypes from '../Constants/chooseMessage';

//保存井号信息
export function reduxSetRegionData(data) {
    return {
        type: actionTypes.REGIONMESSAGE_SET,
        data
    }
}
//保存岩性信息
export function reduxSetLithosData(data) {
    return {
        type: actionTypes.LITHOSMESSAGE_SET,
        data
    }
}
//保存偏光类型信息
export function reduxSetPoltypeData(data) {
    return {
        type: actionTypes.POLTYPEMESSAGE_SET,
        data
    }
}
