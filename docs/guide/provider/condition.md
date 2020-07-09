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

## 使用 json-schema 验证作为条件

定义一个`displayOptions`属性，包含 `model` 和 `schema`

`model` 是组件的 `model` 里的某个属性，支持路径，`schema` 是这个属性 json-schema 验证条件，当指定 `model` 的属性值符合 `schema` 里的验证条件，可显示组件

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
