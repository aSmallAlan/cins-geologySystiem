import 'whatwg-fetch'
import 'es6-promise'

export default function fetchDelete(url, token) {
    var result = fetch(url, {
        headers: {
            'Authorization': token
        },
        method: 'DELETE'
    });
    return result;
}
