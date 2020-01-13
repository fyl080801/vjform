import "./factories/object";
import "./factories/request";
import "./factories/submit";
import store from "./store";

// model先赋个初值，不然如果数据源autoload可能取不到数据
// 也把props赋过去，从服务端或固定的数据从服务端返回也可用作参数
export default function(context) {
  return function(options) {
    const fakesource = function() {
      return null;
    };

    const instance = (store.get(options.type) || fakesource).call(
      this,
      options,
      context
    );

    return instance;
  };
}
