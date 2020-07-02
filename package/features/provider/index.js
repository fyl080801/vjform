import { getFeature } from "../../feature/map";
import { getMapDeault } from "../../utils/helpers";
import "./fieldOptions";
import "./displayOptions";
import "./model";
import "./text";
import "./errorOptions";

const getProviders = () => {
  const stored = getFeature("provider");
  return getMapDeault(stored, "providers", []);
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
