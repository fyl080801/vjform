<template>
  <div id="app">
    <j-form
      :fields="fields"
      :value="model"
      :datasource="datasource"
      :watchs="watchs"
      :schema="schema"
      @input="changed"
      @state-changed="stateChanged"
    />
    <button @click="setModel">change</button>
    <span>{{ JSON.stringify(model) }}</span>
  </div>
</template>

<script>
import JForm from "../package/index";

export default {
  name: "app",
  components: {
    JForm
  },
  data() {
    return {
      schema: {
        type: "object",
        properties: {
          text: { type: "string", minLength: 1 }
        }
      },
      datasource: {
        testsource: {
          type: "object",
          data: [
            { id: 1, text: "option-1" },
            { id: 2, text: "option-2" }
          ]
        },
        requestsource: {
          type: "request",
          // watchs: ["model.text"],
          url: "https://www.baidu.com",
          method: "GET",
          defaultData: []
        }
      },
      watchs: {
        "model.text": {
          subtext: {
            $type: "func",
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
        list: [
          { key: 1, value: "111", children: [1, 2, 3, 4] },
          { key: 2, value: "222", children: [4, 5, 6] }
        ]
      },
      fields: [
        {
          component: "p",
          fieldOptions: {
            domProps: {
              innerText: {
                $type: "bind",
                $source: "model.subtext"
              }
            }
          }
        },
        {
          component: "p",
          fieldOptions: {
            domProps: {
              innerText: {
                $type: "bind",
                $source: "state.valid"
              }
            }
          }
        },
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
                  fieldOptions: { props: { labelWidth: "120px" } },
                  children: [
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "input1:" } },
                      children: [
                        {
                          component: "el-input",
                          model: ["text"],
                          fieldOptions: {
                            props: {
                              placeholder: "input-text",
                              clearable: true
                            }
                          }
                        }
                      ]
                    },
                    {
                      component: "el-form-item",
                      fieldOptions: { props: { label: "选择1:" } },
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
                            $data: { $type: "bind", $source: "model.list" },
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
                      component: "el-form-item",
                      fieldOptions: { props: { label: "选择1级联:" } },
                      children: [
                        {
                          component: "el-select",
                          model: ["selectcase"],
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
                }
              ]
            }
          ]
        },
        {
          component: "ul",
          children: {
            $type: "array",
            $data: {
              $type: "bind",
              $source: "model.list"
            },
            $field: {
              component: "li",
              fieldOptions: {
                key: { $type: "bind", $source: "scope.key" },
                domProps: { id: { $type: "bind", $source: "index" } }
              },
              children: [
                {
                  component: "span",
                  fieldOptions: {
                    domProps: {
                      innerText: {
                        $type: "bind",
                        $source: "scope.value"
                      }
                    }
                  }
                },
                {
                  component: "ul",
                  children: {
                    $type: "array",
                    $data: { $type: "bind", $source: "scope.children" },
                    $field: {
                      component: "li",
                      fieldOptions: {
                        domProps: {
                          innerText: {
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
          }
        },
        {
          component: "div",
          fieldOptions: {},
          children: [
            {
              component: "input",
              model: ["text"]
            },
            {
              component: "input",
              model: [
                "text",
                {
                  on: "input",
                  handler: value => {
                    return value.target.value;
                  }
                }
              ]
            },
            {
              component: "input",
              fieldOptions: {
                domProps: { value: { $type: "bind", $source: "model.text" } }
              }
            },
            {
              component: "p",
              fieldOptions: {
                domProps: {
                  innerText: {
                    $type: "bind",
                    $source: "model.text"
                  }
                }
              }
            },
            {
              component: "h1",
              fieldOptions: { domProps: { innerText: "title" } }
            },
            {
              component: "ul",
              children: {
                $type: "array",
                $data: {
                  $type: "bind",
                  $source: "sourcedata.testsource"
                },
                $field: {
                  component: "li",
                  children: [
                    {
                      component: "span",
                      fieldOptions: {
                        domProps: {
                          innerText: { $type: "bind", $source: "scope.text" }
                        }
                      }
                    }
                  ]
                }
              }
            },
            {
              component: "ul",
              children: [
                {
                  component: "li",
                  children: [
                    {
                      component: "span",
                      fieldOptions: { domProps: { innerText: "xxxxxx" } }
                    }
                  ]
                },
                {
                  component: "li",
                  children: [
                    {
                      component: "span",
                      fieldOptions: { domProps: { innerText: "xxxxxx" } }
                    }
                  ]
                },
                {
                  component: "li",
                  children: [
                    {
                      component: "span",
                      fieldOptions: {
                        domProps: {
                          innerText: {
                            $type: "func",
                            $arguments: {
                              value: { $type: "bind", $source: "model.text" }
                            },
                            $result: "value + '_ssss'"
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
    };
  },
  methods: {
    setModel() {
      this.model.list.push({
        key: this.model.list.length + 1,
        value: "222",
        children: [4, 5, 6]
      });
      this.model.list[0].children.splice(0, 1);
      this.model.list[0].value = "ccccccc"; // 不变化
      this.model.list = JSON.parse(JSON.stringify(this.model.list));
    },
    changed() {
      // console.log(value);
    },
    stateChanged(state) {
      console.log(state);
    }
  }
};
</script>
