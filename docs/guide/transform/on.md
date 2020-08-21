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

## 交互行为

点击弹窗

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
          dialogShow: false
        },
        fields: [
          {
            component: "el-button",
            fieldOptions: {
              props: {
                type: "warning"
              },
              on: {
                click: {
                  $type: "update",
                  $model: "dialogShow",
                  $result: "true"
                }
              }
            },
            children: [{ component: "span", text: "对话框" }]
          },
          {
            component: "el-dialog",
            fieldOptions: {
              props: {
                title: "提示",
                visible: { $type: "bind", $source: "model.dialogShow" },
                width: "30%"
              },
              on: {
                close: {
                  $type: "update",
                  $model: "dialogShow",
                  $result: "false"
                }
              }
            },
            children: [
              {
                component: "span",
                text: "文字......"
              },
              {
                component: "span",
                fieldOptions: { slot: "footer", class: "dialog-footer" },
                children: [
                  {
                    component: "el-button",
                    text: "取消",
                    fieldOptions: {
                      on: {
                        click: {
                          $type: "update",
                          $model: "dialogShow",
                          $result: "false"
                        }
                      }
                    }
                  },
                  {
                    component: "el-button",
                    text: "确定",
                    fieldOptions: {
                      props: { type: "primary" },
                      on: {
                        click: {
                          $type: "update",
                          $model: "dialogShow",
                          $result: "false"
                        }
                      }
                    }
                  }
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
