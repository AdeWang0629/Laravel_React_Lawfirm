import axios from 'axios';
import constants from './constants';

let token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

export default axios;

export function getCustomRequest(URL) {
  return axios.get(`/${URL}`,{
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
  }).then(response => response);
}

export function retriveCustomRequest(URL, payload){
  return axios.get(`/${URL}/${payload}`,{
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
  }).then(response => response);
}

export function postCustomRequest(URL, payload) {
  return axios.post(`/${URL}`,payload,{
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
  }).then(response => response);
}

export function putCustomRequest(URL, id ,payload) {
  return axios.put(`/${URL}/${id}`,payload,{
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
  }).then(response => response);
}

export function deleteCustomRequest(URL, id) {
  return axios.delete(`/${URL}/${id}`,{
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
  }).then(response => response);
}

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;

axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}