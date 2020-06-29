import { getFeature } from "../../feature/map";
import transform from "../transform";
import "./object";
import "./request";
import "./submit";

// model先赋个初值，不然如果数据源autoload可能取不到数据
// 也把props赋过去，从服务端或固定的数据从服务端返回也可用作参数
export default function(context) {
  return function(options) {
    const fakesource = function() {
      return null;
    };

    const instance = (
      getFeature("datasource").get(options.type) || fakesource
    ).call(this, () => transform.call(context, options), context);

    return instance;
  };
}
