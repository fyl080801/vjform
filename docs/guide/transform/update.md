# 更新

用于更新 model 的值，由组件事件触发

## 示例

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
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
            component: 'el-button',
            fieldOptions: {
              on: {
                click: {
                  $type: 'update',
                  $model: 'num',
                  $arguments: {
                    org: { $type: 'bind', $source: 'model.num' }
                  },
                  $result: 'ADDITION(org, 1)'
                }
              },
              props: {
                type: 'primary'
              }
            },
            children: [
              {
                component: 'span',
                text: '点击更新值'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

:::

## 交互行为

点击弹窗

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
          dialogShow: false
        },
        fields: [
          {
            component: 'el-button',
            fieldOptions: {
              props: {
                type: 'warning'
              },
              on: {
                click: {
                  $type: 'update',
                  $model: 'dialogShow',
                  $result: 'true'
                }
              }
            },
            children: [{ component: 'span', text: '对话框' }]
          },
          {
            component: 'el-dialog',
            fieldOptions: {
              props: {
                title: '提示',
                visible: { $type: 'bind', $source: 'model.dialogShow' },
                width: '30%'
              },
              on: {
                close: {
                  $type: 'update',
                  $model: 'dialogShow',
                  $result: 'false'
                }
              }
            },
            children: [
              {
                component: 'span',
                text: '文字......'
              },
              {
                component: 'span',
                fieldOptions: { slot: 'footer', class: 'dialog-footer' },
                children: [
                  {
                    component: 'el-button',
                    text: '取消',
                    fieldOptions: {
                      on: {
                        click: {
                          $type: 'update',
                          $model: 'dialogShow',
                          $result: 'false'
                        }
                      }
                    }
                  },
                  {
                    component: 'el-button',
                    text: '确定',
                    fieldOptions: {
                      props: { type: 'primary' },
                      on: {
                        click: {
                          $type: 'update',
                          $model: 'dialogShow',
                          $result: 'false'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
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
