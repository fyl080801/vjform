# 事件

## 简单事件

button click

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
            component: "el-button",
            fieldOptions: {
              on: {
                click: {
                  $type: "on",
                  $result: "alert('xxx')"
                }
              },
              props: {
                type: "primary"
              }
            },
            children: [
              {
                component: "span",
                text: "点击触发一个事件"
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

## model 值转换

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
          triggerChecked: false
        },
        fields: [
          {
            component: "el-button",
            model: [
              "triggerChecked",
              {
                on: "click",
                handler: {
                  $type: "on",
                  $arguments: {
                    value: {
                      $type: "bind",
                      $source: "model.triggerChecked"
                    }
                  },
                  $result: "!value"
                }
              }
            ],
            fieldOptions: {
              props: {
                type: {
                  $type: "func",
                  $arguments: {
                    value: {
                      $type: "bind",
                      $source: "model.triggerChecked"
                    }
                  },
                  $result: "value ? 'success' : 'danger'"
                }
              }
            },
            children: [
              {
                component: "span",
                text: "点击后改变值和样式："
              },
              {
                component: "span",
                text: {
                  $type: "func",
                  $arguments: {
                    value: {
                      $type: "bind",
                      $source: "model.triggerChecked"
                    }
                  },
                  $result: "value ? '是' : '否'"
                }
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
