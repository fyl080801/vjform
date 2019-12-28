import "./providers/fieldOptions";
import "./providers/model";

import store from "./store";
import { isEmpty } from "lodash-es";

export default function(field) {
  store.forEach(factory => {
    if (isEmpty(field.component)) {
      return;
    }

    (factory.call(this, field) || function() {}).call(this, field);
  });
}
