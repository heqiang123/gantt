const tree = {
  treedata600: [
    {
      label: 'AG600-001',
      children: [
        {
          label: 'CA-31-001'
          // children: [
          //   {
          //     label: 'AOL-CAS-52-001001'
          //   },
          //   {
          //     label: 'AOL-CAS-52-001002'
          //   },
          //   {
          //     label: 'AOL-CAS-52-001003'
          //   },
          //   {
          //     label: 'AOL-CAS-52-001004'
          //   },
          //   {
          //     label: 'AOL-CAS-52-001005'
          //   },
          //   {
          //     label: 'AOL-CAS-52-001006'
          //   }
          // ]
        },
        {
          label: 'CA-41-001'
        },
        {
          label: 'CA-51-001'
        },
        {
          label: 'CA-52-001'
        },
        {
          label: 'CA-53-001'
        },
        {
          label: 'CA-54-001'
        }
        // {
        //   label: 'CA-52,55站位,A'
        // }
      ]
    },
    {
      label: 'AG600-002'
    },
    {
      label: 'AG600-003'
    },
    {
      label: 'AG600-011'
    }
    // {
    //   label: 'AG600-003'
    // },
    // {
    //   label: 'AG600-004'
    // },
    // {
    //   label: 'AG600-005'
    // },
    // {
    //   label: 'AG600-006'
    // },
    // {
    //   label: 'AG600-007'
    // }
  ],
  treedata700: [
    {
      label: 'AG700-001',
      children: [
        {
          label: 'CA-52,31站位'
        },
        {
          label: 'CA-52,41站位',
          children: [
            {
              label: 'AOL-CAS-52-001001'
            },
            {
              label: 'AOL-CAS-52-001002'
            },
            {
              label: 'AOL-CAS-52-001003'
            },
            {
              label: 'AOL-CAS-52-001004'
            },
            {
              label: 'AOL-CAS-52-001005'
            },
            {
              label: 'AOL-CAS-52-001006'
            }
          ]
        },
        {
          label: 'CA-52,51站位'
        },
        {
          label: 'CA-52,52站位'
        }
      ]
    },
    {
      label: 'AG700-002'
    }
  ],
  treedata800: [
    {
      label: 'AG800-001',
      children: [
        {
          label: 'CA-31-001'
        },
        {
          label: 'CA-41-001'
        },
        {
          label: 'CA-51-001'
        },
        {
          label: 'CA-52-001'
        },
        {
          label: 'CA-53-001'
        },
        {
          label: 'CA-54-001'
        }
      ]
    },
    {
      label: 'AG800-002'
    }
  ],
  treedata: [
    {
      label: 'BBOM-AG600-001',
      children: [
        {
          label: 'CA-52,31站位'
        },
        {
          label: 'CA-52,41站位',
          children: [
            {
              label: 'AOL-CAS-52-001001'
            },
            {
              label: 'AOL-CAS-52-001002'
            },
            {
              label: 'AOL-CAS-52-001003'
            },
            {
              label: 'AOL-CAS-52-001004'
            },
            {
              label: 'AOL-CAS-52-001005'
            },
            {
              label: 'AOL-CAS-52-001006'
            }
          ]
        },
        {
          label: 'CA-52,51站位'
        },
        {
          label: 'CA-52,52站位'
        },
        {
          label: 'CA-52,53站位'
        },
        {
          label: 'CA-52,54站位'
        }
      ]
    },
    {
      label: 'AG700-002'
    }
  ],
  mlutiData: [
    {
      label: '方案一',
      children: [
        {
          label: 'AG600-001'
        },
        {
          label: 'AG700-001'
        },
        {
          label: 'AG800-001'
        }
      ]
    },
    {
      label: '方案二'
    }

  ]
}

export default [
  {
    url: '/cmm/tree/part\.*',
    type: 'get',
    response: config => {
      let viewData = ''
      switch (config.query.data) {
        case 'AG600':
          viewData = tree.treedata600
          break
        case 'AG700':
          viewData = tree.treedata700
          break
        case 'AG':
          viewData = tree.treedata
          break
        default:
          viewData = tree.treedata800
          break
      }
      return {
        status: 200,
        data: viewData,
        message: '查询成功'
      }
    }
  },
  {
    url: '/cmm/tree/mlutiPart',
    type: 'get',
    response: config => {
      const mlutiPart = tree.mlutiData
      return {
        status: 200,
        data: mlutiPart,
        message: '查询成功'
      }
    }
  }
]
