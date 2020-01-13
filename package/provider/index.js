import store from "./store";
import { isEmpty } from "lodash-es";
import "./providers/fieldOptions";
import "./providers/model";

export default function(field) {
  store.forEach(factory => {
    if (isEmpty(field.component)) {
      return;
    }

    (factory.call(this, field) || function() {}).call(this, field);
  });
}
