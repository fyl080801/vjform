# 多个数相加

传递多个数值并把数值相加

## 示例

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          num1: 1,
          num2: 1,
          num3: 1
        },
        fields: [
          { component: "el-input-number", model: ["num1"] },
          { component: "el-input-number", model: ["num2"] },
          { component: "el-input-number", model: ["num3"] },
          {
            component: "p",
            fieldOptions: {
              domProps: {
                innerText: {
                  $type: "func",
                  $arguments: {
                    n1: { $type: "bind", $source: "model.num1" },
                    n2: { $type: "bind", $source: "model.num2" },
                    n3: { $type: "bind", $source: "model.num3" }
                  },
                  $result: "ADDITION(n1, n2, n3)"
                }
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
