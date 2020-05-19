import { register } from "./register";
import store from "./store";
import { cloneDeep } from "lodash-es";
import "./functions/IF";
import "./functions/MAP";
import "./functions/TEXT";

const listFx = () => {
  console.log(store);
  const cloned = cloneDeep(store).reduce((acc, cur) => {
    acc[cur.name] = cur;
    return acc;
  }, {});
  return Object.values(cloned);
};

export { register, listFx };

export default name => {
  return store.find(item => item.name === name).fx;
};
