<template>
  <div class="preliminary-page">
    <layout-bord>
      <template slot="tree">
        <div class="search-box-content">
          <dee-form
            :form-data="formData"
            :form="form"
            label-width="60px"
          />
          <div style="text-align: center;">
            <el-button
              class="container-searchBtn"
              type="primary"
              size="small"
              @click="searchData"
            >
              查 询
            </el-button>
          </div>
        </div>
        <el-scrollbar class="scroll-container">
          <el-tree
            ref="tree"
            :data="structureData"
            class="filter-tree"
            default-expand-all
            :render-content="renderStructureContent"
            @node-click="handleClick"
          />
        </el-scrollbar>
      </template>
      <template slot="main">
        <div style="height:100%;padding:8px">
          <dee-tab :tabs="tabs" style="height:100%">
            <table-view slot="0" type="0" />
            <table-view slot="1" type="1" />
            <table-view slot="2" type="2" />
            <table-view slot="3" type="3" />
          </dee-tab>
        </div>

      </template>
    </layout-bord>
  </div>

</template>
<script>
import layoutBord from '@/components/layoutBord'
import tableView from './tableView'
import { dealQuestion } from '@/api/execute'
export default {
  name: 'Requirement',
  components: { layoutBord, tableView },
  filters: {},
  data() {
    return {
      tabs: [
        {
          name: '全部',
          id: '0',
          data: [
            { path: 'assembly.vue' }
          ]
        },
        {
          name: '待提交',
          id: '1',
          data: [
            { path: 'sorting.vue' }
          ]
        },
        {
          name: '已处理',
          id: '2',
          data: [
            { path: 'sorting.vue' }
          ]
        },
        {
          name: '待确认',
          id: '3',
          data: [
            { path: 'sorting.vue' }
          ]
        }
      ],
      structureData: [
        {
          label: '机型',
          children: [
            {
              label: 'AG600',
              children: [
                {
                  label: 'AG6001'
                },
                {
                  label: 'AG6002'
                },
                {
                  label: 'AG6003'
                },
                {
                  label: 'AG6004'
                },
                {
                  label: 'AG6005'
                },
                {
                  label: 'AG6006'
                }
              ]
            }, {
              label: 'AG700',
              children: [
                {
                  label: 'AG7001'
                },
                {
                  label: 'AG7002'
                },
                {
                  label: 'AG7003'
                },
                {
                  label: 'AG7004'
                },
                {
                  label: 'AG7005'
                },
                {
                  label: 'AG7006'
                }
              ]
            },
            {
              label: 'AG800',
              children: [
                {
                  label: 'AG8001'
                },
                {
                  label: 'AG8002'
                },
                {
                  label: 'AG8003'
                },
                {
                  label: 'AG8004'
                },
                {
                  label: 'AG8005'
                },
                {
                  label: 'AG8006'
                }
              ]
            }
          ]
        }
      ],
      formData: [
        {
          split: 1,
          data: [
            {
              title: '关键字',
              key: 'number',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        number: '',
        sorties: ''
      }
    }
  },
  mounted() {
    this.dealQuestion()
  },
  methods: {
    searchData() {

    },
    handleClick() {
      console.log('w')
    },
    renderStructureContent(h, { node, data, store }) {
      return h('div', {
        style: {
          display: 'flex',
          'align-items': 'center'
        }
      }, [
        h('img', {
          attrs: {
            src: '/icons/airplane.png'
          }
        }),
        h('span', {
          style: {
            'margin-left': '8px',
            'font-size': '14px'
          }
        }, [
          data.label
        ])
      ])
    },
    dealQuestion() {
      dealQuestion().then(res => {

      })
    }
  }
}
</script>
<style lang="scss">
.preliminary-page{
    height: 100%;
    .search-box-content{
        padding-top: 20px;
        height: 150px;
        position: relative;
        border-bottom: 1px solid #D8D8D8;
        .container-searchBtn{
           width:180px;
           height:37px;
           border-width: 0;
           background:linear-gradient(178deg,rgba(83,123,196,1) 0%,rgba(62,98,200,1) 100%);
        }
    }
}

</style>
