# 按条件显示

::: demo

```html
<template>
  <div>
    <vjform v-model="model" :fields="fields" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          show: false
        },
        fields: [
          {
            component: "el-checkbox",
            model: ["show"],
            children: [{ component: "span", text: "是否显示" }]
          },
          {
            component: "p",
            displayOptions: {
              model: "show",
              schema: {
                type: "boolean",
                const: true
              }
            },
            text: "显示的内容..."
          }
        ]
      };
    }
  };
</script>
```

:::
