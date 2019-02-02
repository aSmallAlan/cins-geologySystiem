import { combineReducers } from 'redux';

import wellData from './wellData';
import {regionData, poltypeData, lithosData} from './chooseMessage'

const rootReducer = combineReducers({
    wellData,
    //用户选择的数据
    regionData,
    poltypeData,
    lithosData
});

export default rootReducer;
