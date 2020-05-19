import { register } from "./register";
import store from "./store";
import { cloneDeep } from "lodash-es";
import "./functions/IF";
import "./functions/MAP";
import "./functions/TEXT";
import "./functions/REDUCE";

const listFx = () => {
  const cloned = cloneDeep(store).reduce((acc, cur) => {
    acc[cur.name] = cur;
    return acc;
  }, {});
  return Object.values(cloned).map(item =>
    Object.assign(item, { description: item.description || item.name })
  );
};

export { register, listFx };

export default name => {
  return store.find(item => item.name === name).fx;
};
