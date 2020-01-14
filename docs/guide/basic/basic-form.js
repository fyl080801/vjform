export default {
  data() {
    return {
      model: {},
      fields: [
        {
          component: "div",
          children: [
            {
              component: "h1",
              fieldOptions: { domProps: { innerText: "h1 text" } }
            },
            {
              component: "p",
              fieldOptions: { domProps: { innerText: "p text" } }
            },
            {
              component: "span",
              fieldOptions: { domProps: { innerText: "span text" } }
            }
          ]
        }
      ]
    };
  }
};
