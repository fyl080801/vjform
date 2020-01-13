import axios from "axios";
import parse from "url-parse";
import Vue from "vue";

class AxiosFactory {
  constructor(opt) {
    let instance = axios.create({
      ...{ timeout: 30000, withCredentials: true },
      ...opt
    });
    instance.interceptors.request.use(
      this.handleReqSuccess.bind(instance),
      this.handleReqError.bind(instance)
    );
    instance.interceptors.response.use(
      this.handleResSuccess.bind(instance),
      this.handleResError.bind(instance)
    );
    return instance;
  }

  handleReqSuccess(config) {
    if (this.defaults && this.defaults.pure) return config;
    const ENV = getComponentEnv(
      this.defaults && this.defaults.extra && this.defaults.extra.componentName
    );

    return tranformAuthTypeConfig(tranformEnvConfig(config, ENV));
  }

  handleReqError(error) {
    if (this.defaults && this.defaults.pure) return Promise.reject(error);
    return Promise.reject(error);
  }

  handleResSuccess(response) {
    if (this.defaults && this.defaults.pure) return response;
    if (response.data.error) {
      return Promise.reject(response.data.error);
    }

    return response.data.result ? response.data.result : response.data;
  }

  handleResError(error) {
    if (this.defaults && this.defaults.pure) return Promise.reject(error);
    return Promise.reject(error);
  }
}

function tranformEnvConfig(config, prefix) {
  let parsed = parse(config.baseURL);

  if (["stag", "test", "ite"].indexOf(prefix) > -1) {
    let hostArray = parsed.host.split(".");
    hostArray[0] = hostArray[0] + "-" + prefix;
    parsed.set("host", hostArray.join("."));
    parsed.set("protocol", "http:");
  } else if (prefix === "locale") {
    config.baseURL = "";
    return config;
  }

  config.baseURL = parsed.href;
  return config;
}

function tranformAuthTypeConfig(config) {
  if (Vue.prototype.$JELEMENT_BIZ_TYPE === "back") {
    config.headers["Auth-Type"] = "back";
  } else {
    config.headers["Auth-Type"] = "console";
  }
  return config;
}

function getComponentEnv(componentName) {
  const env = Vue.prototype.$JELEMENT_BIZ_ENV;
  if (typeof env === "string") {
    return env;
  }

  if (typeof env === "object" && env !== null && env[componentName]) {
    return env[componentName];
  }

  return "prod";
}

export default AxiosFactory;
