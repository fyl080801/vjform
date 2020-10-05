# 绑定

## 将值关联到一个属性上

通过 `bind` 转换可以将某个值绑定到属性上，具体定义如下

```json
{
  "$type": "bind",
  "$source": "<属性>"
}
```

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
          text: ''
        },
        fields: [
          {
            component: 'input',
            model: ['text'],
            fieldOptions: {
              domProps: {
                placeholder: '请输入文字'
              }
            }
          },
          {
            component: 'p',
            fieldOptions: {
              domProps: {
                innerText: {
                  $type: 'bind',
                  $source: 'model.text'
                }
              }
            }
          }
        ]
      }
    }
  }
</script>
```

:::
