# 数组

## 简单定义数组

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
        model: {},
        fields: [
          {
            component: "ul",
            children: {
              $type: "array",
              $data: [1, 2, 3, 4, 5],
              $field: {
                component: "li",
                text: { $type: "bind", $source: "scope" }
              }
            }
          }
        ]
      };
    }
  };
</script>
```

:::

## 绑定数组数据

::: demo

```html
<template>
  <div>
    <vjform v-model="model" :params="params" :fields="fields" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          selected: null
        },
        params: {
          data: [
            { key: 1, text: "选项 1" },
            { key: 2, text: "选项 2" },
            { key: 3, text: "选项 3" },
            { key: 4, text: "选项 4" }
          ]
        },
        fields: [
          {
            component: "el-select",
            model: ["selected"],
            children: {
              $type: "array",
              $data: { $type: "bind", $source: "params.data" },
              $field: {
                component: "el-option",
                fieldOptions: {
                  props: {
                    value: { $type: "bind", $source: "scope.key" },
                    label: { $type: "bind", $source: "scope.text" }
                  }
                }
              }
            }
          },
          { component: "p", text: { $type: "bind", $source: "model.selected" } }
        ]
      };
    }
  };
</script>
```

:::
