/**
 * @Description: 工具方法
 * @author lyk
 * @date 2019/6/4
 */
import { Message, Notification, MessageBox } from 'element-ui'
import moment from 'moment'
import $store from '../store'

/**
 * @Description: 比较两个对象是否相等
 * @author lyk
 * @date 2019/8/14
 */
export function isObjectValueEqual(a, b) {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  aProps.forEach((x, i) => {
    const propName = aProps[i]
    const propA = a[propName]
    const propB = b[propName]
    if ((typeof (propA) === 'object')) {
      return !!isObjectValueEqual(propA, propB)
    } else return propA === propB
  })
}

/**
 * @Description: 树id,pid方式转children方式
 * @author lyk
 * @date 2019/6/18
 */
export function generateTree(nodes, config) {
  const id = config && config.id || 'id'
  const pid = config && config.pid || 'pid'
  const children = config && config.children || 'children'
  const idMap = {}
  const jsonTree = []
  nodes.forEach((v) => {
    v && (idMap[v[id]] = v)
  })
  nodes.forEach((v) => {
    if (v) {
      const parent = idMap[v[pid]]
      if (parent) {
        !parent[children] && (parent[children] = [])
        parent[children].push(v)
      } else {
        jsonTree.push(v)
      }
    }
  })
  return jsonTree
}

export function escapeString(q) {
  let result = ''
  if (q !== null && q !== undefined && q !== '') {
    for (let i = 0; i < q.length; i++) {
      const c = q.charAt(i)
      if (c === '\\' || c === '+' || c === '-' || c === '!' || c === '(' || c === ')' || c === ':' || c === '^' || c === '[' || c === ']' || c === '"' || c === '{' || c === '}' || c === '~' || c === '*' || c === '?' || c === '|' || c === '&' || c === ';' || c === '/' || c === ' ') {
        result = result + '\\'
      }
      result += c
    }
  } else {
    return '*:*'
  }
  return result
}

export function formatNumber(value, unit) {
  return parseFloat(value).toFixed(unit)
}

export function endWidth(str, endStr) {
  var d = str.length - endStr.length
  return (d >= 0 && str.lastIndexOf(endStr) === d)
}

export function formatDate(time, formatPattern) {
  const date = 'YYYY-MM-DD'
  return moment(time).format(formatPattern || date)
}

export function formatMoney(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

export function showMessage(msg, type) {
  let t = 'info'
  if (['info', 'success', 'warning', 'error'].includes(type)) {
    t = type
  }
  Message({
    dangerouslyUseHTMLString: true,
    showClose: true,
    message: msg,
    type: t,
    duration: 5000
  })
}

export function showNotification(msg, title, type) {
  let t = 'info'
  if (['info', 'success', 'warning', 'error'].includes(type)) {
    t = type
  }
  Notification({
    title: title,
    message: msg,
    duration: 5000,
    position: 'bottom-left',
    type: t
  })
}

export function showMessageSuccess(msg) {
  showMessage(msg, 'success')
}

export function showMessageError(msg) {
  showMessage(msg, 'error')
}

export function showMessageInfo(msg) {
  showMessage(msg, 'info')
}

export function showMessageWarning(msg) {
  showMessage(msg, 'warning')
}

export function showConfirm(msg, title, type, confirmButtonText, cancelButtonText, successCallback, cancelCallback, confirmButtonClass) {
  let t = 'info'
  if (['info', 'success', 'warning', 'error'].includes(type)) {
    t = type
  }
  MessageBox({
    title: title,
    message: msg,
    showConfirmButton: !!confirmButtonText,
    showCancelButton: !!cancelButtonText,
    showClose: false,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    type: t
  }).then(() => {
    successCallback && successCallback()
  }).catch(() => {
    cancelCallback && cancelCallback()
  })
}

export function downLoadFileUrl(url, fileName = null) {
  console.log('###', url)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('id', fileName)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 获取专业 属性值
export function getProperties(obj, attr, bAttr = 'attrName', rAttr = 'attrValue') {
  let _obj = []
  if (!obj) {
    return ''
  } else if (obj.dynamicProperties) {
    _obj = obj.dynamicProperties
  } else {
    _obj = obj
  }
  let list = []
  if (_obj) {
    list = _obj.filter((a) => a[bAttr] === attr)
  }
  if (list.length !== 1) {
    return ''
  }
  return list[0][rAttr]
}

// 显示版本
export function showVersion(item) {
  if (!item) {
    return ''
  }
  let ver = ''
  if (item.versionId) {
    ver += item.versionId
  }
  if (item.iterationId) {
    ver += '.' + item.iterationId
  }
  if (item.view) {
    ver += ' (' + item.view + ')'
  }
  return ver
}

export function getSubTypeNameCN(subTypeName) {
  const flagIndex = subTypeName.lastIndexOf('___')
  return subTypeName.slice(flagIndex + 3)
}

export function getUserName(user) {
  if (user) {
    return `${user.fullName}(${user.name})`
  }
  return ''
}

// 序号值
export function getIndexSerial(index) {
  const serial = ' ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿'
  if (index > 0 && index < serial.length) {
    return serial.charAt(index)
  }
  return ''
}

// 根据数据读取对于图标
export function showIcon(row) {
  const fixUrl = process.env.VUE_APP_BASE_FILES + '/files/themes/theme_1/icons/'
  if (!row) {
    return `${fixUrl}占位符.png`
  }
  if (row.subTypeName) {
    if (row.subTypeName.indexOf('com.ptc.ReferenceDocument') > -1) { // 参考文档
      return `${fixUrl}参考文档.png`
    }
    if (row.subTypeName.indexOf('com.yond_e.DefaultEPMDocument') > -1) { // CAD文档
      return `${fixUrl}CAD文档.png`
    }
    if (row.subTypeName.indexOf('com.yond_e.EPMDocument') > -1) { // EPM文档
      return `${fixUrl}EPM文档.png`
    }
    if (row.subTypeName.indexOf('wt.part.WTPart') > -1) { // 部件
      return `${fixUrl}部件.png`
    }
    if (row.subTypeName.indexOf('wt.pdmlink.PDMLinkProduct') > -1) { // 产品
      return `${fixUrl}产品.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.suma.part.VendorPart') > -1) { // 厂商部件
      return `${fixUrl}厂商部件.png`
    }
    if (row.subTypeName.indexOf('wt.inf.library.WTLibrary') > -1) { // 存储库
      return `${fixUrl}存储库.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMTooling') > -1) { // 刀具
      return `${fixUrl}刀具.png`
    }
    if (row.subTypeName.indexOf('com.facri.ElectronicPart') > -1) { // 电子部件（OOTB)
      return `${fixUrl}电子部件（OOTB).png`
    }
    if (row.subTypeName.indexOf('com.yond_e.DynamicDocument') > -1) { // 动态文档
      return `${fixUrl}动态文档.png`
    }
    if (row.subTypeName.indexOf('wt.change2.WTChangeRequest2') > -1) { // 更改请求
      return `${fixUrl}更改请求.png`
    }
    if (row.subTypeName.indexOf('wt.change2.WTChangeOrder2') > -1) { // 更改通告
      return `${fixUrl}更改通告.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMPlant') > -1) { // 工厂
      return `${fixUrl}工厂.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMProcessMaterial') > -1) { // 工艺材料
      return `${fixUrl}工艺材料.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMWorkCenter') > -1) { // 工作中心
      return `${fixUrl}工作中心.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.suma.part.SupplierPart') > -1) { // 供应商部件
      return `${fixUrl}供应商部件.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMSkill') > -1) { // 技能
      return `${fixUrl}技能.png`
    }
    if (row.subTypeName.indexOf('com.facri.DeliverablePart') > -1) { // 交付部件
      return `${fixUrl}交付部件.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMOperationAssignableResource') > -1) { // 可分配的操作
      return `${fixUrl}可分配的操作.png`
    }
    if (row.subTypeName.indexOf('wt.vc.baseline.ManagedBaseline') > -1) { // 受管理的基线
      return `${fixUrl}受管理的基线.png`
    }
    if (row.subTypeName.indexOf('wt.doc.WTDocument') > -1) { // 文档
      return `${fixUrl}文档.png`
    }
    if (row.subTypeName.indexOf('wt.change2.WTChangeIssue') > -1) { // 问题报告
      return `${fixUrl}问题报告.png`
    }
    if (row.subTypeName.indexOf('wt.part.Placeholder') > -1) { // 占位符
      return `${fixUrl}占位符.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.suma.part.ManufacturerPart') > -1) { // 制造商部件
      return `${fixUrl}制造商部件.png`
    }
    if (row.subTypeName.indexOf('com.yond_e.Note') > -1) { // 注解
      return `${fixUrl}注解.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMResource') > -1) { // 资源
      return `${fixUrl}资源.png`
    }
    if (row.subTypeName.indexOf('com.ptc.windchill.mpml.resource.MPMResourceGroup') > -1) { // 资源组
      return `${fixUrl}资源组.png`
    }
  }
  if (row.id && row.id.indexOf('WTPart') > -1) {
    return `${fixUrl}部件.png`
  }
  if (row.id && row.id.indexOf('WTDocument') > -1) {
    return `${fixUrl}文档.png`
  }
  return `${fixUrl}占位符.png`
}

export async function showTheme(obj) {
  const type = obj.subTypeName.split('___')[0]
  const theme = $store.state.themeConfig.themeData[type]
  if (theme) {
    return formatTheme(theme, obj)
  } else {
    await $store.dispatch('themeConfig/showTheme', type)
    const theme = await $store.state.themeConfig.themeData[type]
    if (theme) {
      return formatTheme(theme, obj)
    } else {
      return formatTheme('${name} | ${number} | ${versionId}', obj)
    }
  }
}

function formatTheme(theme, obj) {
  let name = theme
  const array = theme.match(/\${[a-zA-Z.]*}/g)
  if (array.length > 0) {
    array.forEach(x => {
      const variable = x.substring(2, x.length - 1)
      // 是否是动态属性
      if (getProperties(obj, variable)) {
        name = name.replace(variable, getProperties(obj, variable))
      } else if (variable.indexOf('.') > -1) { // 是否是对象
        const props = variable.split('.')
        if (props && props.length > 0) {
          props.forEach(x => {
            obj = obj[x]
          })
        }
        name = name.replace(variable, obj)
      } else if (obj[variable]) {
        name = name.replace(variable, obj[variable])
      } else {
        name = name.replace(variable, '')
      }
      name = name.replace(/\$/g, '')
      name = name.replace(/{/g, '')
      name = name.replace(/}/g, '')
    })
    return name
  }
  return ''
}

/**
 * @Description: DeeForm查找属性工具
 * @author lyk
 * @date 2019/10/29
 */
export function findFormProp(formData, prop) {
  let item = {}
  if (formData && formData.length > 0) {
    formData.forEach(x => {
      if (x.data && x.data.length > 0) {
        x.data.forEach(y => {
          if (y.key === prop) {
            item = y
          }
        })
      }
    })
    return item
  }
}

/**
 * @Description: 单位转换
 * @author hq
 * @date 2019/10/30
 */
export function handleUnit(val) {
  return JSON.parse(sessionStorage.getItem('unitList')).filter(res => {
    return res.value === val
  })[0].display
  // return $store.state.editCpbom.unitList.filter(res => {
  //   return res.value === val
  // })[0].display
}
export function getFlowName(name) {
  if (name) {
    if (name.indexOf('Facri Part Workflow') > -1 || name.indexOf('FACRI Part Workflow') > -1) {
      return '组件签审流程'
    } else if (name.indexOf('Facri EPart Workflow') > -1) {
      return '电子部件签审流程'
    } else if (name.indexOf('Facri ECR Workflow') > -1 || name.indexOf('FACRI2 ECR Workflow') > -1) {
      return 'ECR签审流程'
    } else if (name.indexOf('FACRI ECN Workflow') > -1) {
      return 'ECN签审流程'
    } else if (name.indexOf('FACRI Doc Workflow') > -1) {
      return '文档签审流程'
    } else if (name.indexOf('FACRI Doc_JJGY Workflow') > -1) {
      return '机加工艺文件签审流程'
    } else if (name.indexOf('FACRI Doc_JJZTSMS Workflow') > -1) {
      return '交接状态说明书签审流程'
    } else if (name.indexOf('FACRI_CPBOM_Workflow') > -1) {
      return 'CPBOM构建流程'
    } else if (name.indexOf('FACRI_ManHourNotice_Workflow') > -1) {
      return '工时定额流程'
    } else if (name.indexOf('FACRI_PBOMAttrNotice_Workflow') > -1) {
      return '补充工艺属性流程'
    } else if (name.indexOf('FACRI_PCR_Workflow') > -1) {
      return 'PCR签审流程'
    } else if (name.indexOf('FACRI_PCN_Workflow') > -1) {
      return 'PCN签审流程'
    } else if (name.indexOf('FACRI_SPBOM_Workflow') > -1) {
      return 'SPBOM构建流程'
    } else if (name.indexOf('FACRI PTSR Workflow') > -1) {
      return '转阶段流程'
    } else {
      return name.substring(name.indexOf('任务-') + 3, name.indexOf('_'))
    }
  }
}
const isEmptyProperty = (data) => {
  if (Array.isArray(data) && data.length === 0) {
    return true
  }
  return !data
}
/*
* 过滤对象空属性，返回新对象
*/
export function filterEmptyProperty(data) {
  const obj = {}
  for (const item in data) {
    if (!isEmptyProperty(data[item])) {
      obj[item] = data[item]
    }
  }
  return obj
}
const _isObject = (obj) => {
  return obj !== null && typeof (obj) === 'object'
}
const _isPainObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const string2JSon = (str) => {
  if (str) {
    return JSON.parse(str)
  } else {
    return null
  }
}
const resFormateForm = (params) => {
  const form = []
  const rules = {}
  for (let index = 0; index < params.length; index++) {
    form.push({
      key: params[index].paramValue,
      title: params[index].setupPaticipantParam.scopeName,
      component: {
        name: 'el-select',
        options: [],
        multiple: true,
        'allow-create': true,
        filterable: true
      }
    })
    if (!rules[params[index].paramValue]) {
      rules[params[index].paramValue] = []
    }
    if (params[index].setupPaticipantParam.amountRule === 'LEAST_ONE') {
      rules[params[index].paramValue].push(
        { required: true, message: '该项为必填项', trigger: 'blur' }
      )
    }
  }
  return {
    form,
    rules
  }
}
/**
 * isObect 判断当前数据是否是对像
 * _isObject 判断外层数据是否是对像
 * _isPainObject 判断数据字符串内是不是含有对像
 */
const isObect = (obj) => {
  return (_isObject(obj) === true || _isPainObject(obj) === true) ? obj : false
}
/** 数组根据数组对象中的某个属性值进行排序的方法
     * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
     * @param attr 排序的属性 如number属性
     * @param rev true表示升序排列，false降序排序
     * */
export function compare(attr, rev) {
  if (rev === undefined) {
    rev = 1
  } else {
    rev = (rev) ? 1 : -1
  }
  return function(a, b) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}

export default {
  resFormateForm,
  string2JSon,
  isObect,
  compare,
  isEmptyProperty,
  filterEmptyProperty,
  showMessage,
  endWidth,
  showNotification,
  showMessageSuccess,
  showMessageError,
  showMessageInfo,
  showMessageWarning,
  showConfirm,
  formatMoney,
  formatNumber,
  formatDate,
  escapeString,
  generateTree,
  isObjectValueEqual,
  downLoadFileUrl,
  getProperties,
  showVersion,
  showIcon,
  getSubTypeNameCN,
  getUserName,
  getIndexSerial,
  showTheme,
  findFormProp,
  handleUnit,
  getFlowName
}
