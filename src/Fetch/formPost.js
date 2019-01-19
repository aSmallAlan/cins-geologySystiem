import 'whatwg-fetch'
import 'es6-promise'
export default function post( ...args ) {
    const [ url, body, token, verifyKey ] = [ args[0], args[1], args[2], args[3] ];


    let formData = new FormData();
    body.image.forEach((file) => {
        formData.append('image', file);
    });
    formData.append('area_detail', body.area_detail);
    formData.append('depth', body.depth);
    formData.append('pol_type', body.pol_type);
    formData.append('lit_des', body.lit_des);
    formData.append('lit_com', body.lit_com);
    formData.append('pal_fea', body.pal_fea);
    formData.append('lit_fea', body.lit_fea);
    formData.append('por_fea', body.por_fea);
    var result = null ;
    result = fetch(url, {
        method: 'POST',
        body: formData
    });
    return result
}
