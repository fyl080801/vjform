# Vue JSON form

[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/vjform.svg?style=flat-square
[npm-url]: https://npmjs.org/package/vjform
[david-image]: https://img.shields.io/david/fyl080801/vjform.svg?style=flat-square
[david-url]: https://david-dm.org/fyl080801/vjform
[snyk-image]: https://snyk.io/test/npm/vjform/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/vjform
[download-image]: https://img.shields.io/npm/dm/vjform.svg?style=flat-square
[download-url]: https://npmjs.org/package/vjform

> 通过 JSON 呈现任何组件与定义脚本的实现

**使用任何 Vue 组件或 html 元素构建视图**

开发 vue 项目时，可能会遇到以下需求场景

1. 界面以及功能需要通过加载配置动态呈现
2. 定义的配置需要进行存储
3. 需要通过可视化界面编辑配置

普通 JSON 数据虽然可以描述对象的属性与结构，但是对象方法的定义、程序逻辑的实现以及对象属性与数据的关联关系在序列化成 JSON 数据后无法保存，即使将这些定义可以单独序列化成二进制或 base64 格式的数据，但是如果需要使用编辑器编辑配置时，这些定义也不好描述。

使用 Vue JSON form 组件可以解决 JSON 格式的这些弊端，组件支持用特定 JSON 表示属性值，最终在运行时解析属性转换成真正的值或方法。

## 特性

- 支持呈现 Vue 组件和 html 元素
- 支持将固定参数（params）、表单对象（model）、数据源（datasource）、数组元素（scope）、函数参数（arguments）这些数据关联到组件元素属性上实现值的联动
- 支持绑定值、计算属性、数组、事件定义，将以上数据关联到对象属性上
- 基于 JSON schema 对 model 数据进行验证
- 数据源数据支持远程数据获取、刷新和进行表单提交行为
- 通过监听（watchs）实现数据变化时更新关联数据，实现联动
- 除了绑定、计算属性、数组、事件定义故有功能，本组件支持二次开发，实现特殊的属性值处理方法

## 文档

待更新...

## 指南

### 通过 npm 安装

```bash
npm i vjform
```

### 项目中引用

```js
import Vue from "vue";
import vjform from "vjform";

Vue.component("vjform", vjform);
```

### 基础示例

呈现一个简单的表单

template

```vue
<template>
  <vjform v-model="model" :schema="schema" :fields="fields"></vjform>
</template>
```

script

```js
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
          // 通过定义 model，显示并响应输入的结果
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
```

### 表达式示例

通过 `bind` 转换实现将某个值绑定到某个对象的属性上，在值变化时属性值也会保持一致

支持 `bind` `func` `array` `on` 转换，具体先看 `App.vue` 里的示例

```vue
<template>
  <vjform v-model="model" :schema="schema" :fields="fields"></vjform>
</template>
```

script

```js
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
        },
        {
          component: 'p',
          // 支持特定属性的简易定义，这里同定义 innerText 效果一样
          text: {
            $type: 'bind',
            $source: 'model.firstName'
          }
        }
      ]
    };
  }
};
```

## 依赖

### Ajv

基于 JSON schema 验证 json 格式

### Lodash

使用了 `get` `set` `forEach` 等 API

### Vue

基于 `v2.5.9` 测试，理论上支持高于 `v2.4.0` 版本

### Axios

数据源支持基于使用 Axios 更新数据
