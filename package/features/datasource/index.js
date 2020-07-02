import { getFeature } from "../../feature/map";
import transform from "../transform";
import "./object";
import "./request";
import "./submit";

// model先赋个初值，不然如果数据源autoload可能取不到数据
// 也把props赋过去，从服务端或固定的数据从服务端返回也可用作参数
export const createInstance = function(context) {
  return function(options) {
    const fakesource = {
      factory() {
        return null;
      }
    };

    const instance = (
      getFeature("datasource").get(options.type) || fakesource
    ).factory.call(this, () => transform.call(context, options), context);

    return instance;
  };
};

export default () => {
  const stored = [];

  getFeature("datasource").forEach((value, key) => {
    stored.push({
      ...value,
      name: key,
      description: value.description || key
    });
  });

  return stored;
};
