# 输入交互

## 文本输入

html input

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <p>{{ model.text }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          text: ""
        },
        fields: [
          {
            component: "input",
            model: ["text"],
            fieldOptions: {
              domProps: {
                placeholder: "请输入文字"
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

## 下拉选择

html select

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <p>{{ model.selected }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          selected: null
        },
        fields: [
          {
            component: "select",
            model: ["selected"],
            children: [
              {
                component: "option",
                text: "选项 1",
                fieldOptions: {
                  attrs: {
                    value: 1
                  }
                }
              },
              {
                component: "option",
                text: "选项 2",
                fieldOptions: {
                  attrs: {
                    value: 2
                  }
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

## 组件输入

使用 element 组件

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <p>{{ model.text }}</p>
    <p>{{ model.selected }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          text: "",
          selected: null
        },
        fields: [
          {
            component: "el-form",
            fieldOptions: {
              props: {
                labelWidth: "120px"
              }
            },
            children: [
              {
                component: "el-form-item",
                fieldOptions: {
                  props: {
                    label: "文本输入:"
                  }
                },
                children: [
                  {
                    component: "el-input",
                    model: ["text"],
                    fieldOptions: {
                      attrs: {
                        placeholder: "输入文字"
                      }
                    }
                  }
                ]
              },
              {
                component: "el-form-item",
                fieldOptions: {
                  props: {
                    label: "选项:"
                  }
                },
                children: [
                  {
                    component: "el-select",
                    model: ["selected"],
                    children: [
                      {
                        component: "el-option",
                        fieldOptions: {
                          props: {
                            value: 1,
                            label: "选项 1"
                          }
                        }
                      },
                      {
                        component: "el-option",
                        fieldOptions: {
                          props: {
                            value: 2,
                            label: "选项 2"
                          }
                        }
                      }
                    ]
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
