# JForm

> 通过 JSON 呈现任何组件

**使用任何 Vue 组件或 html 元素**

## 指南

### 通过 npm 安装

待更新...

### 项目中引用

```js
import Vue from "vue";
import JForm from "jform";

Vue.component("jform", JForm);
```

### 基础示例

```vue
<template>
  <jform v-model="model" :schema="schema" :fields="fields"></jform>
</template>

<script>
export default {
  data() {
    return {
      // 数据 model
      model: {},
      // 验证 model 的 schema
      schema: {
        type: "object",
        properties: {
          firstName: {
            type: "string"
          }
        }
      },
      // Vue 组件或 html 元素组成的数组
      fields: [
        {
          component: "input",
          model: ["firstName"],
          // 参考 Vue 关于 render 的 API [Vue's render functions](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)
          fieldOptions: {
            class: ["form-control"]
            attrs: {
              placeholder: "输入文本"
            }
          }
        }
      ]
    };
  }
};
</script>
```

### 表达式示例

```vue
<template>
  <jform v-model="model" :schema="schema" :fields="fields"></jform>
</template>

<script>
export default {
  data() {
    return {
      // 数据 model
      model: {},
      // 验证 model 的 schema
      schema: {
        type: "object",
        properties: {
          firstName: {
            type: "string"
          }
        }
      },
      // Vue 组件或 html 元素组成的数组
      fields: [
        {
          component: "input",
          model: ["firstName"],
          // 参考 Vue 关于 render 的 API [Vue's render functions](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)
          fieldOptions: {
            class: ["form-control"]
            attrs: {
              placeholder: "输入文本"
            }
          }
        },
        {
          component: 'p',
          fieldOptions: {
            domProps: {
              // 定义一个转换, 显示 model 的 firstName 属性
              innerText: {
                $type: 'bind',
                $source: 'model.firstName'
              }
            }
          }
        }
      ]
    };
  }
};
</script>
```

## 特性

- 支持 Vue 组件和 html 元素
- 基于 JSON schema 验证 model 数据
- 定义数据源, 实现更新远程数据和表单提交行为
- 定义转换, 实现数值绑定和数据监听行为
- 支持扩展

## 文档

待更新...

## 依赖

### Ajv

基于 JSON schema 验证 json 格式

### Lodash

使用了 `get` `set` `forEach` 等 API

### Vue

基于 `v2.5.9` 测试，理论上支持高于 `v2.4.0` 版本

### Axios

数据源支持基于使用 Axios 更新数据
