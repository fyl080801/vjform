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
      @setup="onSetup"
    ></v-jform>
  </div>
</template>

<script>
import { provider, transform } from '../extends/scopedSlot'

export default {
  data() {
    return {
      params: {},
      model: {
        list: [
          { key: 1, name: 'xxx' },
          { key: 2, name: 'yyy' }
        ]
      },
      components: {},
      datasource: {
        tabledata: {
          type: 'request',
          autoload: true,
          url: '/data/tabledata.json',
          method: 'GET',
          defaultData: []
        }
      },
      listeners: [],
      fields: [
        {
          component: 'div',
          children: [
            {
              component: 'el-table',
              fieldOptions: {
                props: {
                  data: { $type: 'bind', $source: 'datasource.tabledata.data' }
                }
              },
              children: [
                {
                  component: 'el-table-column',
                  fieldOptions: {
                    props: { property: 'name', label: '姓名' }
                  }
                },
                {
                  component: 'el-table-column',
                  fieldOptions: {
                    props: { property: 'address', label: '地址' }
                  }
                },
                {
                  component: 'el-table-column',
                  fieldOptions: {
                    props: { property: 'date', label: '日期' }
                  }
                },
                {
                  component: 'el-table-column',
                  fieldOptions: { props: { label: '操作' } },
                  children: [
                    {
                      component: 'div',
                      fieldOptions: { scopedSlot: true },
                      children: [
                        {
                          component: 'el-button',
                          text: '明细',
                          fieldOptions: {
                            on: {
                              click: {
                                $type: 'on',
                                $arguments: {
                                  detail: {
                                    $type: 'bind',
                                    $source: 'scope.row'
                                  }
                                },
                                $result: 'alert(JSON.stringify(detail))'
                              }
                            },
                            props: { type: 'text' }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { component: 'hr' },
            {
              component: 'el-table',
              fieldOptions: {
                props: {
                  data: { $type: 'bind', $source: 'model.list' }
                }
              },
              children: [
                {
                  component: 'el-table-column',
                  fieldOptions: {
                    props: { property: 'name', label: '姓名' }
                  },
                  children: [
                    {
                      component: 'el-input',
                      fieldOptions: {
                        scopedSlot: true,
                        on: {
                          input: {
                            $type: 'update',
                            $model: {
                              $type: 'func',
                              $arguments: {
                                idx: { $type: 'bind', $source: 'scope.$index' }
                              },
                              $result: '"list[" + idx + "].name"'
                            },
                            $arguments: {
                              val: { $type: 'bind', $source: 'arguments[0]' }
                            },
                            $result: 'val'
                          }
                        },
                        props: {
                          value: {
                            $type: 'func',
                            $arguments: {
                              idx: {
                                $type: 'bind',
                                $source: 'scope.$index'
                              },
                              list: { $type: 'bind', $source: 'model.list' }
                            },
                            $result: 'list[+idx].name'
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  component: 'el-table-column',
                  fieldOptions: { props: { label: '操作' } },
                  children: [
                    {
                      component: 'div',
                      fieldOptions: { scopedSlot: true },
                      children: [
                        {
                          component: 'el-button',
                          text: '明细',
                          fieldOptions: {
                            on: {
                              click: {
                                $type: 'on',
                                $arguments: {
                                  detail: {
                                    $type: 'bind',
                                    $source: 'scope.row'
                                  }
                                },
                                $result: 'alert(JSON.stringify(detail))'
                              }
                            },
                            props: { type: 'text' }
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
          component: 'el-button',
          events: [
            {
              name: 'click',
              handler: {
                $type: 'update',
                $model: 'list[0].name',
                $result: '"vbbbbbb"'
              }
            }
          ]
        }
      ],
      options: {}
    }
  },
  methods: {
    onSetup(builder) {
      builder.transform(transform)
      builder.provider(provider)
    }
  }
}
</script>
