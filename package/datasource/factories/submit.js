import {
  cloneDeep,
  forEach,
  get,
  isArray,
  isObject,
  isString
} from "lodash-es";
import qs from "querystring";
import parse from "url-parse";
// import transform from "../../transform";
import { register } from "../register";

const pathTraversal = owner => {
  const result = {};

  const eachPath = (node, path) => {
    if (!isObject(node) && !isArray(node)) {
      let objectPath = "";
      path.forEach(item => {
        objectPath += isString(item) ? `.${item}` : `[${item}]`;
      });
      result[objectPath.substring(1)] = node;
    } else {
      forEach(node, (propValue, key) => {
        const nextpath = cloneDeep(path);
        nextpath.push(key);
        eachPath(propValue, nextpath);
      });
    }
  };

  eachPath(owner, []);

  return result;
};

register("submit", function(getOptions, context) {
  const options = getOptions();
  const { watchs = [], dev } = options;

  const instance = {
    loading: true,
    data: null,
    watchs: []
  };

  const doSubmit = () => {
    if (dev) {
      return;
    }

    instance.loading = true;

    const clonedOptions = getOptions(); // transform.call(context, options);

    const parsedUrl = parse(clonedOptions.url);
    const orgquery =
      parsedUrl.query.indexOf("?") === 0 ? parsedUrl.query.substring(1) : "";

    parsedUrl.set(
      "query",
      qs.stringify(Object.assign({}, qs.parse(orgquery), clonedOptions.params))
    );

    const dlform = document.createElement("form");
    dlform.style = "display:none;";
    dlform.method = clonedOptions.method || "POST";
    dlform.action = parsedUrl.href;
    dlform.target = clonedOptions.target;

    const pathObject = pathTraversal(clonedOptions.data);

    Object.keys(pathObject).forEach(key => {
      const hdnFilePath = document.createElement("input");
      hdnFilePath.type = "hidden";
      hdnFilePath.name = key;
      hdnFilePath.value = get(clonedOptions.data, key);
      dlform.appendChild(hdnFilePath);
    });

    const container =
      document.getElementById(clonedOptions.container) || document.body;
    container.appendChild(dlform);
    dlform.submit();
    container.removeChild(dlform);
  };

  this.$nextTick(() => {
    watchs.forEach(watch => {
      instance.watchs.push(
        this.$watch(
          () => get(context, watch),
          () => doSubmit()
        )
      );
    });
  });

  instance.submit = doSubmit;

  return instance;
});
