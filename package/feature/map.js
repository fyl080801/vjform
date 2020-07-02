import { getMapDeault } from "../utils/helpers";

const store = new Map();

export const getFeature = type => {
  return getMapDeault(store, type, new Map());
};

export default store;
