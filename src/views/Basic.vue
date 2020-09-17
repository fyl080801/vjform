<template>
  <div>
    <vjform
      :fields="fields"
      v-model="model"
      :params="params"
      :datasource="datasource"
      :components="components"
      :listeners="listeners"
    ></vjform>
    <div>{{ JSON.stringify(model) }}</div>
    <div>{{ JSON.stringify(formState) }}</div>
  </div>
</template>

<script>
import vjform from "../../lib";
import Text from "../components/Text";

export default {
  components: { vjform },
  data() {
    return {
      formState: {},
      params: {
        list: [
          { key: 1, value: "选项1", children: [1, 2, 3, 4] },
          { key: 2, value: "选项2", children: [5, 6, 7] }
        ]
      },
      components: { text: Text },
      datasource: {
        requestsource: {
          type: "request",
          autoload: true,
          url: "/data/testdata.json",
          method: "GET",
          defaultData: []
        },
        tabledata: {
          type: "request",
          autoload: true,
          url: "/data/tabledata.json",
          method: "GET",
          defaultData: []
        }
      },
      listeners: [
        {
          watch: "model.text",
          immediate: true,
          actions: [
            {
              handler: {
                $type: "update",
                $model: "subtext",
                $arguments: {
                  val: { $type: "bind", $source: "model.text" }
                },
                $result: "val ? val.length : 0"
              }
            },
            {
              async: true,
              handler: {
                $type: "bind",
                $source: "datasource.tabledata.load"
              }
            }
          ]
        },
        {
          watch: { $type: "bind", $source: "model.select.key" },
          actions: [
            {
              handler: { $type: "update", $model: "selectcase", $result: null }
            }
          ]
        }
      ],
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
              model: [
                "ontest",
                { nativeOn: "click", handler: { $type: "on", $result: "true" } }
              ],
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
                          errorOptions: {
                            class: "has-error"
                          },
                          fieldOptions: {
                            on: {
                              blur: {
                                $type: "on",
                                $arguments: {
                                  val: { $type: "bind", $source: "arguments" }
                                },
                                $result: "console.log('绑定了输入参数：', val)"
                              }
                            },
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
                          model: "text",
                          errorOptions: { style: "color: red" },
                          text: {
                            $type: "func",
                            $arguments: {
                              value: {
                                $type: "bind",
                                $source: "model.subtext"
                              }
                            },
                            $result: "'输入了：' + value + ' 个字'"
                          }
                        },
                        {
                          component: "p",
                          text: "输入文字时候会不断发请求，所以有点卡"
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "级联选择:" } },
                      children: [
                        {
                          component: "el-col",
                          fieldOptions: { props: { span: 7 } },
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
                          fieldOptions: { props: { span: 7 } },
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
                          model: ["Standard.remoteselected"],
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
                      condition: { $type: "bind", $source: "model.checked" },
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
                              text: "点击触发一个事件"
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
                        },
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
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "表格数据:" } },
                      children: [
                        {
                          component: "el-table",
                          model: [
                            "Standard.vmInstanceType",
                            {
                              on: "current-change",
                              handler: {
                                $type: "on",
                                $arguments: {
                                  args: { $type: "bind", $source: "arguments" }
                                },
                                $result: "args[0]"
                              }
                            }
                          ],
                          fieldOptions: {
                            props: {
                              border: true,
                              stripe: true,
                              data: {
                                $type: "bind",
                                $source: "sourcedata.tabledata"
                              }
                            }
                          },
                          children: [
                            {
                              component: "el-table-column",
                              fieldOptions: { props: { type: "index" } }
                            },
                            {
                              component: "el-table-column",
                              fieldOptions: {
                                props: { property: "name", label: "姓名" }
                              }
                            },
                            {
                              component: "el-table-column",
                              fieldOptions: {
                                props: { property: "address", label: "地址" }
                              }
                            },
                            {
                              component: "el-table-column",
                              fieldOptions: {
                                props: { property: "date", label: "日期" }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      component: "el-button",
                      text: "连续事件",
                      events: [
                        {
                          name: "click",
                          handler: {
                            $type: "on",
                            $arguments: {
                              arg: { $type: "bind", $source: "arguments[0]" }
                            },
                            $result: "console.log(arg)"
                          }
                        },
                        {
                          name: "click",
                          handler: { $type: "on", $result: "alert('1')" }
                        },
                        {
                          name: "click",
                          handler: { $type: "on", $result: "alert('2')" }
                        }
                      ],
                      fieldOptions: {
                        on: { click: { $type: "on", $result: "alert('3')" } }
                      }
                    },
                    {
                      component: "el-form-item",
                      children: [
                        {
                          component: "text",
                          fieldOptions: { props: { value: "哈哈哈!!!" } }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
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
  },
  methods: {
    changed() {},
    stateChanged(state) {
      this.formState = state;
    }
  }
};
</script>
