import store from "./store";
import { register } from "./register";
import "./providers/fieldOptions";
import "./providers/displayOptions";
import "./providers/model";
import "./providers/text";
import "./providers/errorOptions";

export { register };

export default function(field) {
  store.forEach(factory => {
    (factory.call(this, field) || function() {}).call(this, field);
  });
}
