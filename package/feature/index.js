import provider from "./provider";
import datasource from "./datasource";
import transform from "./transform";
import functional from "./functional";
import { getFeature } from "./map";

const registers = {
  provider,
  datasource,
  transform,
  functional
};

export default type => {
  return (registers[type] || function() {})(getFeature(type));
};
