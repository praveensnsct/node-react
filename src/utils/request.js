import 'whatwg-fetch';
import merge from 'deepmerge';

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  const { status } = response;

  if (status === 200) {
    return await response.json();
  } else if (status >= 400) {
    const data = await response.json();
    const error = new Error(response.statusText);
    error.displayMessage = data && data.displayMessage;
    throw error;
  } else {
    return null;
  }
}

function getTokenValuesForHeaders() {
  return localStorage.getItem('token');
}

/**
 * Authorization header
 */
function mergeOptions(options) {
  const token = getTokenValuesForHeaders();
  const standardOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    credentials: 'include'
  };
  const finalOptions = merge.all([{}, standardOptions, options]);
  return finalOptions;
}

function stringify(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

/**
 * Requests a URL, returning a promise
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           The response data
 */
export default async function request(
  url,
  options = {},
  params = null,
) {
  let uri = url;
  if (params) {
    uri = `${uri}?${stringify(params)}`;
  }
  const response = await fetch(uri, mergeOptions(options));
  return await checkStatus(response);
}
