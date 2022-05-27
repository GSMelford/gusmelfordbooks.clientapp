import axios from 'axios'

const defaultConfig = {
  baseURL: 'https://dev.gusmelford.com/gusmelfordbooks/',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const defaultAxios = axios.create(defaultConfig)
