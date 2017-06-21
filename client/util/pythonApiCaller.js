import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = `http://localhost:8080/api`;

export default function callPythonApi(endpoint, method = 'post', body) {
  console.log('sending to api with body: ' + JSON.stringify(body));
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    // credentials: 'include',
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
//   .then(response => {
//     if (response.ok) {
//       response.json().then(json => {
//         console.log('JSON response: ' + JSON.stringify(json));
//         return json;
//       });
//     }
//   }
// )
// }
