import { register } from "../register";
import { get } from "lodash-es";
import { loadSourceData } from "../../api/vjform";

register("request", function(getOptions, context) {
  const options = getOptions();
  const { watchs = [], autoload } = options;

  const instance = {
    loading: false,
    data: null,
    watchs: []
  };

  const load = () => {
    if (options.dev) {
      return;
    }

    instance.loading = true;

    return loadSourceData(options)
      .then(res => {
        instance.loading = false;
        instance.data =
          get(res, options.dataPath || "data") || options.defaultData;
      })
      .catch(() => {
        instance.loading = false;
        if (options.errorData !== undefined) {
          instance.data = options.errorData;
        }
        // TODO: should emit 'error' event to component
      });
  };

  this.$nextTick(() => {
    const clonedOptions = getOptions();

    instance.data = clonedOptions.defaultData || null;

    watchs.forEach(watch => {
      instance.watchs.push(
        this.$watch(
          () => get(context, watch),
          () => load()
        )
      );
    });

    if (autoload) {
      load();
    }
  });

  instance.load = load;

  return instance;
});
