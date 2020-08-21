# 更新

用于更新 model 的值，由组件事件触发

## 示例

::: demo

```html
<template>
  <div>
    <vjform v-model="model" :fields="fields" />
    {{ model.num }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          num: 1
        },
        fields: [
          {
            component: "el-button",
            fieldOptions: {
              on: {
                click: {
                  $type: "update",
                  $model: "num",
                  $arguments: {
                    org: { $type: "bind", $source: "model.num" }
                  },
                  $result: "ADDITION(org, 1)"
                }
              },
              props: {
                type: "primary"
              }
            },
            children: [
              {
                component: "span",
                text: "点击更新值"
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

## 定义

| 属性        | 说明            | 类型   |
| ----------- | --------------- | ------ |
| \$type      | 固定值 `update` |        |
| \$model     | model 中的属性  | string |
| \$arguments | 参数            | Object |
| \$result    | 赋给属性的值    | any    |
