<template>
  <div>
    <vjform
      :fields="fields"
      :value="model"
      :params="params"
      :datasource="datasource"
      :components="components"
      :schema="schema"
    ></vjform>
    <div>{{ JSON.stringify(model) }}</div>
  </div>
</template>

<script>
import vjform from "../../package";

export default {
  components: { vjform },
  props: {
    model: [Object, Array],
    params: { type: [Object, Array], default: () => ({}) },
    fields: { type: Array, default: () => [] },
    schema: { type: Object, default: () => ({}) },
    datasource: { type: Object, default: () => ({}) },
    components: { type: Object, default: () => ({}) }
  }
};
</script>
