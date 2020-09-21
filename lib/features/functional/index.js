import { getFeature } from "../../feature/map";
import "./if";
import "./map";
import "./text";
import "./reduce";
import "./equal";
import "./filter";
import "./find";
import "./get";
import "./includes";
import "./addition";
import "./division";
import "./multiply";
import "./subtraction";

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
