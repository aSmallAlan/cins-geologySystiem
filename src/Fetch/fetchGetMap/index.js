import get from "../get";
import post from '../post';
import {IP} from "../../Constants/ip";

//井号选择


//获取地区选择信息
export  function fetchGetInitialMaps(body) {
    let url = IP + '/maps/';
    let result = get(url, body);
    return result;
}
//关键字搜索
export  function fetchGetTouchMaps(body='',  token='', verify='',) {
    let url = IP + '/maps/';
    let result = post(url, body, token, verify);
    return result;
}
