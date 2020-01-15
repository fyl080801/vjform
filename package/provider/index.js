import store from "./store";
import { register } from "./register";
import { isEmpty } from "lodash-es";
import "./providers/fieldOptions";
import "./providers/displayOptions";
import "./providers/model";

export { register };

export default function(field) {
  store.forEach(factory => {
    if (isEmpty(field.component)) {
      return;
    }

    (factory.call(this, field) || function() {}).call(this, field);
  });
}
