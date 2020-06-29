import { getFeature } from "../../feature/map";
import "./if";
import "./map";
import "./text";
import "./reduce";
import "./equal";
import "./filter";
import "./get";

export default () => {
  const stored = [];

  getFeature("functional").forEach((value, key) => {
    stored.push({
      ...value,
      name: key,
      description: value.description || key
    });
  });

  return stored;
};
