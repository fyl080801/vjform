<template>
  <div id="app">
    <v-form :fields="fields" :value="model" @input="changed" />
    <span>{{ JSON.stringify(model) }}</span>
  </div>
</template>

<script>
import VForm from "./components/VForm.vue";

export default {
  name: "app",
  components: {
    VForm
  },
  data() {
    return {
      model: {
        text: "xxxxxx",
        list: [
          { key: 1, value: "111", children: [1, 2, 3, 4] },
          { key: 2, value: "222", children: [4, 5, 6] }
        ]
      },
      fields: [
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
    changed() {
      // console.log(value);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
