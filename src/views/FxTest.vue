<template>
  <div>
    <vjform
      :fields="fields"
      v-model="model"
      :params="params"
      :datasource="datasource"
      :watchs="watchs"
      :inits="inits"
      :components="components"
      :schema="schema"
    ></vjform>
    <p>{{ JSON.stringify(model) }}</p>
  </div>
</template>

<script>
import vjform from "../../package/vjform";

export default {
  components: { vjform },
  data() {
    return {
      fields: [
        {
          component: "p",
          text: {
            $type: "func",
            $arguments: {
              text1: { $type: "bind", $source: "model.text1" },
              text2: { $type: "bind", $source: "model.text2" }
            },
            $result: "TEXT(text1,text2)"
          }
        }
      ],
      model: {
        text1: "sss",
        text2: "xxxx"
      },
      params: {},
      datasource: {},
      watchs: {},
      inits: {},
      components: {},
      schema: {}
    };
  }
};
</script>

<style></style>
