# 数值交互 (v-model)

## 简单定义

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <hr />
    <p>基本的 model 定义: {{ model.text }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: { text: "" },
        fields: [
          {
            component: "p",
            children: [
              {
                component: "input",
                model: ["text"],
                fieldOptions: { attrs: { placeholder: "基本的 model 定义" } }
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

## 自定义事件

通过 model 属性数组第二个参数来定义在什么事件里触发值的改变，需要在事件里返回新值

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <hr />
    <p>结果通过自定义处理方法: {{ model.num }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: { num: 0 },
        fields: [
          {
            component: "p",
            children: [
              {
                component: "el-input-number",
                model: [
                  "num",
                  {
                    on: "input",
                    handler: value => {
                      return value;
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

::: demo

```html
<template>
  <div>
    <v-jform v-model="model" :fields="fields" />
    <hr />
    <p>改变返回的新值: {{ model.triggerChecked }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: { triggerChecked: false },
        fields: [
          {
            component: "el-button",
            model: [
              "triggerChecked",
              {
                on: "click",
                handler: () => {
                  return !this.model.triggerChecked;
                }
              }
            ],
            children: [
              {
                component: "span",
                text: "点击后改变值"
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
