# 基础示例

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
          component: "div",
          children: [
            {
              component: "h1",
              fieldOptions: { domProps: { innerText: "一级标题" } }
            },
            {
              component: "h2",
              fieldOptions: { domProps: { innerText: "二级标题" } }
            },
            {
              component: "h3",
              fieldOptions: { domProps: { innerText: "三级标题" } }
            },
            {
              component: "p",
              fieldOptions: { domProps: { innerText: "段落文本" } }
            },
            {
              component: "span",
              text: '文本...'
            },
            {
              component: 'hr'
            },
            {
              component: 'ul',
              children: [
                { component: 'li', text: '列表项' },
                { component: 'li', text: '列表项' },
                { component: 'li', text: '列表项' },
                { component: 'li', text: '列表项' }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
```

:::
