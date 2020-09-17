<template>
  <div>
    <vjform
      :fields="fields"
      :value="model"
      :params="params"
      :datasource="datasource"
      :components="components"
    ></vjform>
    <div>{{ JSON.stringify(model) }}</div>
  </div>
</template>

<script>
import vjform from "../../lib";

export default {
  components: { vjform },
  props: {
    model: [Object, Array],
    params: { type: [Object, Array], default: () => ({}) },
    fields: { type: Array, default: () => [] },
    datasource: { type: Object, default: () => ({}) },
    components: { type: Object, default: () => ({}) }
  }
};
</script>
