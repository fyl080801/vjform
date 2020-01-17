<template>
  <div id="app">
    <vjform
      :fields="fields"
      :value="model"
      :params="params"
      :datasource="datasource"
      :watchs="watchs"
      :schema="schema"
      @input="changed"
      @state-changed="stateChanged"
    />
    <div>{{ JSON.stringify(model) }}</div>
    <div>{{ JSON.stringify(formState) }}</div>
  </div>
</template>

<script>
import vjform from "../package/index";

export default {
  name: "app",
  components: {
    vjform
  },
  data() {
    return {
      formState: {},
      params: {
        list: [
          { key: 1, value: "选项1", children: [1, 2, 3, 4] },
          { key: 2, value: "选项2", children: [5, 6, 7] }
        ]
      },
      schema: {
        type: "object",
        properties: {
          text: { type: "string", minLength: 1 }
        }
      },
      datasource: {
        requestsource: {
          type: "request",
          autoload: true,
          url: "/data/testdata.json",
          method: "GET",
          defaultData: []
        }
      },
      watchs: {
        "model.text": {
          subtext: {
            $func: true,
            $arguments: {
              val: { $type: "bind", $source: "model.text" }
            },
            $result: "val ? val.length : 0"
          }
        },
        "model.select": {
          selectcase: null
        }
      },
      model: {
        text: "xxxxxx",
        subtext: "",
        select: null,
        selectcase: null,
        radiovalue: null,
        checklist: []
      },
      fields: [
        {
          component: "el-row",
          children: [
            {
              component: "el-col",
              fieldOptions: {
                props: { span: 12 }
              },
              children: [
                {
                  component: "el-form",
                  fieldOptions: {
                    props: { labelWidth: "120px", size: "small" }
                  },
                  children: [
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "文本输入:" } },
                      children: [
                        {
                          component: "el-input",
                          model: ["text"],
                          fieldOptions: {
                            attrs: {
                              placeholder: "input-text"
                            },
                            props: {
                              clearable: true
                            }
                          }
                        },
                        {
                          component: "p",
                          fieldOptions: {
                            domProps: {
                              innerText: {
                                $type: "func",
                                $arguments: {
                                  value: {
                                    $type: "bind",
                                    $source: "model.subtext"
                                  }
                                },
                                $result: "'输入了：' + value + ' 个字'"
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "级联选择:" } },
                      children: [
                        {
                          component: "el-col",
                          fieldOptions: { props: { span: 6 } },
                          children: [
                            {
                              component: "el-select",
                              model: ["select"],
                              fieldOptions: {
                                props: {
                                  placeholder: "select-text",
                                  valueKey: "key"
                                }
                              },
                              children: {
                                $type: "array",
                                $data: {
                                  $bind: true,
                                  $source: "params.list"
                                },
                                $field: {
                                  component: "el-option",
                                  fieldOptions: {
                                    props: {
                                      label: {
                                        $type: "bind",
                                        $source: "scope.value"
                                      },
                                      value: {
                                        $type: "bind",
                                        $source: "scope"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        },
                        {
                          component: "el-col",
                          fieldOptions: { props: { span: 6 } },
                          children: [
                            {
                              component: "el-select",
                              model: "selectcase",
                              fieldOptions: {
                                props: {
                                  placeholder: "select-text"
                                }
                              },
                              children: {
                                $type: "array",
                                $data: {
                                  $type: "bind",
                                  $source: "model.select.children"
                                },
                                $default: [],
                                $field: {
                                  component: "el-option",
                                  fieldOptions: {
                                    props: {
                                      label: {
                                        $type: "bind",
                                        $source: "scope"
                                      },
                                      value: {
                                        $type: "bind",
                                        $source: "scope"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "远程数据:" } },
                      children: [
                        {
                          component: "el-select",
                          model: ["remoteselected"],
                          fieldOptions: {
                            props: {
                              placeholder: "select-text",
                              valueKey: "key"
                            }
                          },
                          children: {
                            $type: "array",
                            $data: {
                              $bind: true,
                              $source: "sourcedata.requestsource"
                            },
                            $field: {
                              component: "el-option",
                              fieldOptions: {
                                props: {
                                  label: {
                                    $type: "bind",
                                    $source: "scope.text"
                                  },
                                  value: {
                                    $type: "bind",
                                    $source: "scope.key"
                                  }
                                }
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "html选中:" } },
                      children: [
                        {
                          component: "input",
                          model: ["checked"],
                          fieldOptions: { domProps: { type: "checkbox" } }
                        },
                        {
                          component: "input",
                          model: ["checked"],
                          fieldOptions: { domProps: { type: "radio" } }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      displayOptions: {
                        model: "checked",
                        schema: { type: "boolean", const: true }
                      },
                      fieldOptions: { props: { label: "选项组:" } },
                      children: [
                        {
                          component: "el-checkbox-group",
                          model: ["checklist"],
                          children: {
                            $type: "array",
                            $data: ["选项1", "选项2", "选项3"],
                            $field: {
                              component: "el-checkbox",
                              fieldOptions: {
                                props: {
                                  label: { $type: "bind", $source: "scope" }
                                }
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "数组属性选中:" } },
                      children: [
                        {
                          component: "input",
                          model: ["sub[0].checked"],
                          fieldOptions: { domProps: { type: "checkbox" } }
                        },
                        {
                          component: "el-switch",
                          model: ["sub[0].checked"]
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "单选组:" } },
                      children: [
                        {
                          component: "el-radio-group",
                          model: ["radiovalue"],
                          children: {
                            $array: true,
                            $data: ["选项1", "选项2", "选项3"],
                            $field: {
                              component: "el-radio",
                              fieldOptions: {
                                props: {
                                  label: { $type: "bind", $source: "scope" }
                                }
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "事件触发:" } },
                      children: [
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
                              fieldOptions: {
                                domProps: { innerText: "点击触发一个事件" }
                              }
                            }
                          ]
                        },
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
                              fieldOptions: {
                                domProps: { innerText: "点击后改变值和样式：" }
                              }
                            },
                            {
                              component: "span",
                              fieldOptions: {
                                domProps: {
                                  innerText: {
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
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // setModel() {
    //   this.model.list.push({
    //     key: this.model.list.length + 1,
    //     value: "222",
    //     children: [4, 5, 6]
    //   });
    //   this.model.list[0].children.splice(0, 1);
    //   this.model.list[0].value = "ccccccc"; // 不变化
    //   this.model.list = JSON.parse(JSON.stringify(this.model.list));
    // },
    changed() {},
    stateChanged(state) {
      this.formState = state;
    }
  }
};
</script>
