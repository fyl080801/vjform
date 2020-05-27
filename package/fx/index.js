import { register } from "./register";
import store from "./store";
import "./functions/if";
import "./functions/map";
import "./functions/text";
import "./functions/reduce";
import "./functions/equal";
import "./functions/filter";
import "./functions/get";

export { register };

export default () => {
  const stored = [];
  store.forEach((value, key) => {
    stored.push({
      ...value,
      name: key,
      description: value.description || key
    });
  });

  return stored;
};
