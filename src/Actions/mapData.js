import * as actionTypes from '../Constants/mapData';

export function reduxSetMapData(data) {
    return {
        type: actionTypes.MAPDATA_SET,
        data
    }
}

