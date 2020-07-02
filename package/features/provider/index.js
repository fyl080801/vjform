import { getFeature } from "../../feature/map";
import "./fieldOptions";
import "./displayOptions";
import "./model";
import "./text";
import "./errorOptions";

export default function() {
  const providers = [];

  getFeature("provider").forEach(instance => {
    providers.push(instance);
  });

  return providers.sort((a, b) => {
    a.index - b.index;
  });
}
