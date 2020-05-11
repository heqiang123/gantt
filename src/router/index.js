import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ipad from '@/layout/ipad.vue'
import defaultLay from '@/layout/default.vue'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'home' },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/configuration',
    name: 'plan',
    meta: { title: '计划中心', icon: 'form' },
    children: [
      {
        path: 'configuration',
        name: 'configuration',
        component: () => import('@/views/mating/requirement'),
        redirect: '/plan/configuration/synergy',
        meta: { title: '现场工艺配置' },
        children: [
          {
            path: 'synergy',
            name: 'synergy',
            component: () => import('@/views/mating/requirement/synergy'),
            meta: { title: '现场工艺配置' }
          }
        ]
      },
      {
        path: 'production',
        name: 'production',
        component: () => import('@/views/mating/production'),
        meta: { title: '生产订单' }
      },
      {
        path: 'fitting',
        name: 'fitting',
        component: () => import('@/views/mating/fitting'),
        meta: { title: '装配计划' }
      },
      {
        path: 'work',
        name: 'work',
        component: () => import('@/views/mating/work'),
        hidden: true,
        meta: { title: '工作订单' }
      },
      {
        path: 'process',
        name: 'process',
        component: () => import('@/views/mating/process'),
        meta: { title: '工序作业计划' }
      }
    ]
  },
  {
    path: '/mating',
    component: Layout,
    redirect: '/mating/requirement',
    name: 'mating',
    meta: { title: '配套中心', icon: 'nested' },
    children: [
      {
        path: 'stock',
        name: 'stock',
        component: () => import('@/views/mating/requirement/stock'),
        meta: { title: '配套需求' }
      },
      {
        path: 'simulation',
        name: 'simulation',
        component: () => import('@/views/mating/simulation'),
        meta: { title: '多机配套' }
      },
      {
        path: 'execute',
        name: 'mexecute',
        component: () => import('@/views/mating/execute'),
        meta: { title: '单机配套' },
        redirect: '/requirement/mexecute',
        children: [
          {
            path: 'management',
            name: 'management',
            component: () => import('@/views/mating/execute/management'),
            // meta: { title: '配套管理' }
            meta: { title: '配套申请' }
          },
          {
            path: 'alloca',
            name: 'alloca',
            component: () => import('@/views/mating/execute/alloca'),
            // meta: { title: '配套单分配' }
            meta: { title: '配套单管理' }
          },
          {
            path: 'allocation',
            name: 'allocation',
            // hidden: true,
            component: () => import('@/views/mating/execute/allocation'),
            meta: { title: '配套单分配' }
          }
        ]
      }
    ]
  },
  {
    path: '/padexecute',
    component: ipad,
    redirect: '/execute/requirement',
    name: 'padexecute',
    hidden: true,
    meta: { title: '执行中心', icon: 'table' },
    children: [
      {
        path: 'process',
        name: 'padprocess',
        component: () => import('@/views/execute/process'),
        meta: { title: '工序任务' }
      },
      {
        path: 'checkout',
        name: 'padcheckout',
        component: () => import('@/views/execute/checkout'),
        meta: { title: '检验执行' }
      },
      {
        path: 'fitting',
        name: 'padcheckout',
        component: () => import('@/views/execute/fitting'),
        meta: { title: '装配执行' }
      },
      {
        path: 'visual',
        name: 'padvisual',
        component: () => import('@/views/execute/visual'),
        meta: { title: '目视检查' }
      }
    ]
  },
  {
    path: '/execute',
    component: Layout,
    redirect: '/execute/requirement',
    name: 'execute',
    meta: { title: '执行中心', icon: 'table' },
    children: [
      {
        path: 'requirement',
        name: 'requirement',
        component: () => import('@/views/execute/requirement'),
        meta: { title: '现场派工' }
      },
      {
        path: 'process',
        name: 'process',
        redirect: '/padexecute/process',
        component: () => import('@/views/execute/process'),
        meta: { title: '工序任务' }
      },
      {
        path: 'apply',
        name: 'apply',
        redirect: '/padexecute/fitting',
        component: () => import('@/views/mating/apply'),
        meta: { title: '工序执行' }
      },
      {
        path: 'checkout',
        name: 'checkout',
        redirect: '/padexecute/checkout',
        meta: { title: '检验执行' }
      },
      {
        path: 'visual',
        redirect: '/padexecute/visual',
        name: 'ecvisual',
        meta: { title: '目视检查' }
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/execute/question'),
        meta: { title: '异常问题' },
        children: [
          {
            path: 'apply',
            component: () => import('@/views/execute/question/apply'),
            name: 'apply',
            meta: { title: '申请' }
          },
          {
            path: 'deal',
            component: () => import('@/views/execute/question/deal'),
            name: 'deal',
            meta: { title: '处理' }
          },
          {
            path: 'zero',
            component: () => import('@/views/execute/question/apply'),
            name: 'zero',
            meta: { title: '归零' }
          }
        ]
      },
      {
        path: 'scene',
        name: 'scene',
        component: () => import('@/views/execute/question'),
        meta: { title: '现场质量单据签审' },
        children: [
          {
            path: 'preliminary',
            component: () => import('@/views/execute/scene/preliminary'),
            name: 'preliminary',
            meta: { title: '质量预审' }
          },
          {
            path: 'disqualification',
            component: () => import('@/views/execute/scene/disqualification'),
            name: 'disqualification',
            meta: { title: '不合格品审理' }
          },
          {
            path: 'circulate',
            component: () => import('@/views/execute/question/apply'),
            name: 'circulate',
            meta: { title: '串换件审签' }
          }
        ]
      }
    ]
  }, {
    path: '/safeguard',
    component: Layout,
    redirect: '/safeguard/listedge',
    name: 'safeguard',
    meta: { title: '保障中心', icon: 'jianyan' },
    children: [
      {
        path: 'listedge',
        name: 'listedge',
        component: () => import('@/views/execute/question'),
        meta: { title: '线边库管理' },
        children: [
          {
            path: 'delivery',
            component: () => import('@/views/execute/question/apply'),
            name: 'delivery',
            meta: { title: '出库管理' }
          },
          {
            path: 'storage',
            component: () => import('@/views/execute/question/apply'),
            name: 'storage',
            meta: { title: '入库管理' }
          }
        ]
      },
      {
        path: 'frock',
        name: 'frock',
        component: () => import('@/views/execute/question'),
        meta: { title: '工装工具管理' },
        children: [
          {
            path: 'delivery',
            component: () => import('@/views/execute/question/apply'),
            name: 'fdelivery',
            meta: { title: '出库管理' }
          },
          {
            path: 'storage',
            component: () => import('@/views/execute/question/apply'),
            name: 'fstorage',
            meta: { title: '入库管理' }
          },
          {
            path: 'terminal',
            component: () => import('@/views/execute/question/apply'),
            name: 'terminal',
            meta: { title: '定检管理' }
          },
          {
            path: 'maintain',
            component: () => import('@/views/execute/question/apply'),
            name: 'maintain',
            meta: { title: '维修管理' }
          },
          {
            path: 'scrap',
            component: () => import('@/views/execute/question/apply'),
            name: 'scrap',
            meta: { title: '报废管理' }
          }
        ]
      },
      {
        path: 'equip',
        name: 'equip',
        component: () => import('@/views/execute/question'),
        meta: { title: '设备管理' },
        children: [
          {
            path: 'standing',
            component: () => import('@/views/execute/question/apply'),
            name: 'standing',
            meta: { title: '台账管理' }
          },
          {
            path: 'spotcheck',
            component: () => import('@/views/execute/question/apply'),
            name: 'spotcheck',
            meta: { title: '点检管理' }
          },
          {
            path: 'lubrication',
            component: () => import('@/views/execute/question/apply'),
            name: 'lubrication',
            meta: { title: '润滑管理' }
          },
          {
            path: 'upkeep',
            component: () => import('@/views/execute/question/apply'),
            name: 'upkeep',
            meta: { title: '保养管理' }
          },
          {
            path: 'maintain',
            component: () => import('@/views/execute/question/apply'),
            name: 'fmaintain',
            meta: { title: '维修管理' }
          },
          {
            path: 'scrap',
            component: () => import('@/views/execute/question/apply'),
            name: 'fscrap',
            meta: { title: '报废管理' }
          }
        ]
      },
      {
        path: 'shellac',
        name: 'shellac',
        component: () => import('@/views/mating/requirement'),
        meta: { title: '胶漆领用' }
      }
    ]
  },
  {
    path: '/entity',
    component: Layout,
    redirect: '/entity/sortie',
    name: 'entity',
    meta: { title: '实物构型', icon: 'feiji' },
    children: [
      {
        path: 'sortie',
        name: 'sortie',
        component: () => import('@/views/entity/sortie'),
        meta: { title: '架次纪实', icon: 'feiji' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  }, {
    path: '/monitoring',
    component: Layout,
    redirect: '/monitoring/plan',
    name: 'monitoring',
    meta: { title: '监控中心', icon: 'kanban' },
    children: [
      {
        path: 'plan',
        name: 'mplan',
        component: () => import('@/views/execute/question/apply'),
        meta: { title: '现场进度看板' }
      },
      {
        path: 'performance',
        name: 'performance',
        component: () => import('@/views/execute/question/apply'),
        meta: { title: '现场绩效看板' }
      },
      {
        path: 'question',
        name: 'mquestion',
        component: () => import('@/views/execute/question/apply'),
        meta: { title: '现场问题看板' }
      },
      {
        path: 'quality',
        name: 'quality',
        component: () => import('@/views/execute/question/apply'),
        meta: { title: '现场质量看板' }
      },
      {
        path: 'line',
        name: 'line',
        component: () => import('@/views/execute/question/line'),
        meta: { title: '总装产线看板' }
      }
    ]
  }, {
    path: '/scan',
    component: defaultLay,
    redirect: '/scan/home',
    name: 'scan',
    meta: { title: '扫一扫', icon: 'saoyisao' },
    children: [
      {
        path: 'home',
        name: 'scanhome',
        component: () => import('@/views/scan/home'),
        meta: { title: '扫一扫' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
