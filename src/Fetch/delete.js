import 'whatwg-fetch'
import 'es6-promise'

export default function fetchDelete(url, token) {
    let result = fetch(url, {
        headers: {
            'Authorization': token
        },
        method: 'DELETE'
    });
    return result;
}
