import * as actionTypes from '../Constants/wellData';

//保存井号信息
export function reduxSetWellData(data) {
    return {
        type: actionTypes.WELLDATA_SET,
        data
    }
}

