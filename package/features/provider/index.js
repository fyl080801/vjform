import { getFeature } from "../../feature/map";
import { getMapDefault } from "../../utils/helpers";
import "./fieldOptions";
import "./displayOptions";
import "./model";
import "./text";
import "./errorOptions";

const getProviders = () => {
  const stored = getFeature("provider");
  return getMapDefault(stored, "providers", []);
};

export default function() {
  const providers = [];

  getProviders().forEach(instance => {
    providers.push(instance);
  });

  return providers.sort((a, b) => {
    a.index - b.index;
  });
}
