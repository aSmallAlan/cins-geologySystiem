import get from "../get";
import post from '../post';
import update from '../update'
import formPost from '../formPost';
import deletePost from '../delete'
import {IP} from "../../Constants/ip";

//薄片信息



//获取地区选择信息
export  function fetchGetRocks(body) {
    let url = IP + '/rocks/';
    let result = get(url, body);
    return result;
}
//修改薄片信息
export function fetchUpdateRocks(title, body) {
    let url = IP + '/rocks/' + title.id + '/';
    let result = update(url, body);
    return result;
}
//获取偏光类型
export function fetchGetpoltype(body) {
    let url = IP + '/poltypes/';
    let result = get(url, body);
    return result;
}
//获取岩性类型
export function fetchGetlithosType(body) {
    let url = IP + '/lithos/';
    let result = get(url, body);
    return result;
}
//获取地区
export function fetchGetRegion(body) {
    let url = IP + '/regions/';
    let result = get(url, body);
    return result;
}
//删除薄片
export function fetchDeleteRocks(body) {
    let url = IP + '/rocks/' + body.id + '/';
    let result = deletePost(url);
    return result;
}
//添加薄片
export function fetchAddRocks(body) {
    let url = IP + '/rocks/';
    let result = formPost(url, body);
    return result;
}
