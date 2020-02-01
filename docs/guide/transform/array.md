# 数组

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
