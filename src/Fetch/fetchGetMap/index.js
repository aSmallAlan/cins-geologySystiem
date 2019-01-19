import get from "../get";
import post from '../post';
import {IP} from "../../Constants/ip";

//获取地区选择信息
export  function getInitialMaps(body) {
    let url = IP + '/maps/';
    let result = get(url, body);
    return result;
}
