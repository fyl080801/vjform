import feature from "../../feature";

const resolveHandlers = (origin = {}, events) => {
  return Object.keys(events).reduce((pre, key) => {
    const current = pre[key] || function() {};

    pre[key] = function() {
      const pro = new Promise(resolve => {
        resolve.apply(null, arguments);
      });
      events[key].forEach(evt => {
        pro.then(function() {
          evt.apply(null, arguments);
        });
      });
      pro.then(function() {
        current.apply(null, arguments);
      });
    };

    return pre;
  }, origin);
};

feature.provider(function() {
  return function(field) {
    const { events } = field;

    if (events === undefined || !Array.isArray(events) || events.length <= 0) {
      return;
    }

    const ons = {};
    const natives = {};

    events.forEach(cur => {
      const { name, handler, native } = cur;
      if (typeof handler !== "function") {
        return;
      }
      if (!native) {
        ons[name] = ons[name] || [];
        ons[name].push(handler);
      } else {
        natives[name] = natives[name] || [];
        natives[name].push(handler);
      }
    });

    if (Object.keys(ons).length > 0) {
      field.fieldOptions = {
        ...field.fieldOptions,
        on: resolveHandlers({ ...field.fieldOptions.on }, ons)
      };
    }

    if (Object.keys(natives).length > 0) {
      field.fieldOptions.nativeOn = {
        ...field.fieldOptions,
        nativeOn: resolveHandlers({ ...field.fieldOptions.nativeOn }, natives)
      };
    }
  };
});
