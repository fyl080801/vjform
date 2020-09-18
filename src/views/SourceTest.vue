<template>
  <div>
    <vjform
      :fields="fields"
      v-model="model"
      :params="params"
      :datasource="datasource"
      :components="components"
    ></vjform>
    <p>{{ JSON.stringify(datasource) }}</p>
  </div>
</template>

<script>
import vjform from "../../lib";

export default {
  components: { vjform },
  data() {
    return {
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
                  children: [
                    {
                      component: "el-input",
                      model: ["obj.text"]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          component: "p",
          text: {
            $type: "func",
            $arguments: {
              input: { $type: "bind", $source: "datasource.obj.data" },
              org: { $type: "bind", $source: "datasource.obj.data" }
            },
            $result: "JSON.stringify(org)"
          }
        },
        {
          component: "p",
          text: {
            $type: "func",
            $arguments: {
              modeldata: { $type: "bind", $source: "model" }
            },
            $result: "JSON.stringify(modeldata)"
          }
        }
      ],
      model: {
        obj: { text: "sss", num: 1 }
      },
      params: {},
      datasource: {
        obj: {
          type: "object",
          data: { $type: "bind", $source: "model.obj" }
        }
      },
      components: {}
    };
  }
};
</script>

<style></style>
