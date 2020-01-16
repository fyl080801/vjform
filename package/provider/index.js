import store from "./store";
import { register } from "./register";
import "./providers/fieldOptions";
import "./providers/displayOptions";
import "./providers/model";

export { register };

export default function(field) {
  store.forEach(factory => {
    (factory.call(this, field) || function() {}).call(this, field);
  });
}
