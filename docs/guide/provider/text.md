# 文本内容

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
        model: {},
        fields: [
          {
            component: 'p',
            fieldOptions: {
              domProps: {
                innerText: '通过 innerText 属性显示'
              }
            }
          },
          {
            component: 'p',
            text: '通过 text 属性显示'
          }
        ]
      }
    }
  }
</script>
```

:::
