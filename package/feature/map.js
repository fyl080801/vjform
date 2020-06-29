import { getMapDeault } from "../utils";

const store = new Map();

export const getFeature = type => {
  return getMapDeault(store, type, new Map());
};

export default store;
