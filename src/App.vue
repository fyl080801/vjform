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
        text: "xxxxxx"
      },
      fields: [
        {
          component: "div",
          fieldOptions: {},
          children: [
            {
              component: "input",
              model: [
                "text"
                // {
                //   $type: "on",
                //   $arguments: {
                //     value: {
                //       $type: "bind",
                //       $source: { $type: "arguments", $path: 0 },
                //       $path: "target.value"
                //     }
                //   },
                //   $result: "value"
                // }
              ]
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
                    $source: { $type: "static", $path: "mydata" },
                    $path: "text"
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
                          innerText: (() => {
                            return "asdasdasdasd";
                          })()
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
    changed(value) {
      console.log(value);
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
