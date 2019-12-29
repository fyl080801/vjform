import "./providers/bind";
import { cloneDeep } from "lodash-es";

export default function(fields) {
  const cloned = cloneDeep(fields);
  return cloned;
}
