# 按条件显示

## 使用转换的结果作为条件

组件定义一个 `condition` 属性，可以写固定值，也可以使用转换来决定值，当这个值为真的时候组件被显示

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
            condition: { $type: "bind", $source: "model.show" },
            text: "显示的内容..."
          }
        ]
      };
    }
  };
</script>
```

:::
