# 基本表单

<div>
  <j-form v-model="model" :fields="fields" />
</div>

::: tip aaaa
write something here ~

:::

```vue
<template>
  <div>
    <j-form v-model="model" :fields="fields" />
  </div>
</template>

<script>
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
</script>
```

<script>
import mixin from './basic-form'

export default {
  mixins: [mixin]
}
</script>
