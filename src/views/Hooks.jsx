import { withHooks, useData } from "vue-hooks";
import vjform from "../../package/vjform";

// eslint-disable-next-line no-unused-vars
const component = withHooks(h => {
  const data = useData({
    formState: {},
    params: {
      times: { timeSpans: "", timeUnits: "" }
    },
    schema: {},
    datasource: {
      regions: {
        type: "object",
        data: [
          {
            value: "cn-north-1",
            description: "华北-北京",
            properties: {
              Standard: [
                { key: 1, name: "选项1", address: "sssss", date: "2020-01-01" },
                { key: 2, name: "选项2", address: "sssss", date: "2020-01-01" },
                { key: 3, name: "选项3", address: "sssss", date: "2020-01-01" },
                { key: 4, name: "选项4", address: "sssss", date: "2020-01-01" },
                { key: 5, name: "选项5", address: "sssss", date: "2020-01-01" }
              ],
              disks: [
                { instanceType: "ssd", iops: 400 },
                { instanceType: "local", size: 40 }
              ]
            }
          },
          {
            value: "cn-south-1",
            description: "华南-上海",
            properties: {
              Standard: [
                { key: 1, name: "选项x", address: "sssss", date: "2020-01-01" },
                { key: 2, name: "选项y", address: "sssss", date: "2020-01-01" }
              ],
              disks: [
                { value: "ssd", instanceType: "ssd", iops: 400 },
                { value: "local", instanceType: "local", size: 40 }
              ]
            }
          }
        ]
      },
      tabledata: {
        type: "request",
        autoload: true,
        watchs: ["params.times"],
        url: "/data/tabledata.json",
        method: "GET",
        defaultData: []
      }
    },
    watchs: {
      "model.Region.value": {
        "Standard.vmInstanceType": null
      },
      "model.Standard.diskInstanceType.instanceType": {
        "Standard.diskSize": 40,
        "Standard.iops": 500
      }
    },
    model: {},
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
                component: "el-select",
                model: ["Region"],
                children: {
                  $type: "array",
                  $data: { $type: "bind", $source: "sourcedata.regions" },
                  $field: {
                    component: "el-option",
                    fieldOptions: {
                      props: {
                        label: {
                          $type: "bind",
                          $source: "scope.description"
                        },
                        value: {
                          $type: "bind",
                          $source: "scope"
                        }
                      }
                    }
                  }
                }
              },
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
                    highlightCurrentRow: true,
                    data: {
                      $type: "bind",
                      $source: "model.Region.properties.Standard"
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
              },
              {
                component: "el-select",
                model: ["Standard.diskInstanceType"],
                fieldOptions: { props: { valueKey: "instanceType" } },
                children: {
                  $type: "array",
                  $data: {
                    $type: "bind",
                    $source: "model.Region.properties.disks"
                  },
                  $field: {
                    component: "el-option",
                    fieldOptions: {
                      props: {
                        label: {
                          $type: "bind",
                          $source: "scope.instanceType"
                        },
                        value: {
                          $type: "bind",
                          $source: "scope"
                        }
                      }
                    }
                  }
                }
              },
              {
                component: "span",
                text: {
                  $type: "bind",
                  $source: "model.Standard.diskInstanceType.instanceType"
                }
              }
            ]
          }
        ]
      }
    ]
  });

  const changed = value => {
    console.log(value);
  };

  const stateChanged = () => {};

  const changeValue = () => {
    data.model.Standard.diskInstanceType = { instanceType: "local", size: 40 };
  };

  const changeParams = () => {
    data.params.times = { timeSpans: "1", timeUnits: "1" };
  };

  return (
    <div>
      <vjform
        fields={data.fields}
        value={data.model}
        params={data.params}
        datasource={data.datasource}
        watchs={data.watchs}
        schema={data.schema}
        onInput={changed}
        on-state-changed={stateChanged}
      ></vjform>
      <div>{JSON.stringify(data.model)}</div>
      <hr></hr>
      <el-button onClick={changeValue}>change</el-button>
      <el-button onClick={changeParams}>change params</el-button>
    </div>
  );
});

component.components = { vjform };

export default component;
