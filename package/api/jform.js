import Axios from "axios";

const axios = Axios.create({
  ...{ timeout: 30000, withCredentials: true }
});

// 获取标签keys
export function loadSourceData({ url, method, params, data, headers }) {
  return axios({
    url,
    method,
    params,
    data,
    headers
  });
}
