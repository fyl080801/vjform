import AxiosFactory from "./axios";

const axios = new AxiosFactory({
  pure: true
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
