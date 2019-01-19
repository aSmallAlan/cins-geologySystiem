import get from "../get";
import post from '../post';
import update from '../update'
import formPost from '../formPost';
import deletePost from '../delete'
import {IP} from "../../Constants/ip";

//获取地区选择信息
export  function getRegions(body) {
    let url = IP + '/regions/';
    let result = get(url, body);
    return result;
}

//添加薄片
export function createRocks( body='',  token='', verify='',) {
    const url = IP + '/rocks/';
    const result = formPost(url, body, token, verify );
    return result;
}

//获取偏光类型
export function getPoltypes(body) {
    let url = IP + '/poltypes/';
    let result = get(url, body);
    return result;
}
//获取岩性
export function getLithos(body) {
    let url = IP + '/lithos/';
    let result = get(url, body);
    return result;
}
//筛选搜索
export function getRocksByCondition(body) {
    let url = IP + '/rocks/';
    let result = get(url, body);
    return result;
}
//删除薄片
export function fetchDeleteRocks(body) {
    let url = IP + '/rocks/' + body.id;
    let result = deletePost(url);
    return result;
}
//获取每个图片的所有信息
export function fetchTargetRocks(body) {
    let url = IP + '/rocks/' + body.id;
    let result = get(url);
    return result;
}
//修改薄片信息
export function fetchUpdateRocks(title, body) {
    let url = IP + '/rocks/' + title.id + '/';
    let result = update(url, body);
    return result;
}
