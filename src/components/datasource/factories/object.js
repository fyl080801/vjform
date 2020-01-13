import { register } from "../register";

register("object", function(options) {
  return {
    data: options.data
  };
});
