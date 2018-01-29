import {stringify} from "qs";
import request from "../utils/request";

export async function queryRule(params) {
  return request(`/member/getData?${stringify(params)}`);
}

export async function loadMember(params) {
  return request(`/member/find/` + params);
}

export async function submitMemberForm(params) {
  return request('/member/add', {
    method: 'POST',
    body: params,
  });
}

export async function updateMemberForm(params) {
  return request('/member/update', {
    method: 'PUT',
    body: params,
  });
}

export async function removeRule(params) {
  return request('/order', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeMember(params) {
  return request(`/member/delete/` + params,{
    method: 'DELETE',
  });
}

export async function addRule(params) {
  return request('/order', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
