# 计算属性

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
          value: 0
        },
        fields: [
          { component: "span", text: "15 + " },
          { component: "el-input-number", model: ["value"] },
          { component: "span", text: " = " },
          {
            component: "span",
            text: {
              $type: "func",
              $arguments: {
                value: { $type: "bind", $source: "model.value" },
                constvalue: 15
              },
              $result: "constvalue + value"
            }
          }
        ]
      };
    }
  };
</script>
```

:::
