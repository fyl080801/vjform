import { getMapDefault } from "../utils/helpers";

const store = new Map();

export const getFeature = type => {
  return getMapDefault(store, type, new Map());
};

export default store;
