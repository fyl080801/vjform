<template>
  <div>
    <v-jform
      :fields="fields"
      v-model="model"
      :params="params"
      :datasource="datasource"
      :components="components"
      :listeners="listeners"
      :options="options"
    ></v-jform>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      model: {},
      components: {},
      datasource: {},
      listeners: [],
      fields: [
        {
          component: 'div',
          children: [
            {
              component: 'el-tabs',
              children: [
                {
                  component: 'el-tab-pane',
                  options: { direct: true },
                  fieldOptions: { props: { label: 'tab1' } },
                  children: [{ component: 'span', text: 'aaa' }]
                },
                {
                  component: 'el-tab-pane',
                  options: { direct: true },
                  fieldOptions: { props: { label: 'tab2' } },
                  children: [{ component: 'span', text: 'bbb' }]
                }
              ]
            }
          ]
        }
      ],
      options: {
        // directComponents: ['el-tab-pane']
      }
    }
  }
}
</script>
