/**
 * 用于存放来自 components 的请求
 */

import {
  httpGet,
  httpPostJson,
  httpPut,
  httpDelete
} from '@/plugIns/api'

async function getPosts({page = 1, limit = 5} = {}) {
  return httpGet(`/posts?page=${page}&limit=${limit}`)
}

async function publishPost(param) {
  return httpPostJson('/posts', param)
}

async function editPost(id, param) {
  console.log('param', param)
  return httpPut(`/posts/${id}`, param)
}

async function deletePost(id) {
  return httpDelete(`/posts/${id}`)
}

export default {
  install: (app) => {
    // 在这里编写插件代options码
    app.provide('api', {
      getPosts,
      publishPost,
      editPost,
      deletePost,
    })
  }
}
