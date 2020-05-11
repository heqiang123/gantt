/**
* @Description: 表格组件
* @author lyk
* @date 2019/6/4
*/
<template>
  <div
    v-loading="loading"
    class="dee-table"
    :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, null) : null"
    :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null"
    :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, null) : null"
  >
    <div v-if="$slots.header" class="dee-table-header">
      <slot name="header" />
    </div>
    <div class="dee-table-body">
      <el-table
        ref="deeTable"
        :data="deeData"
        v-bind="options"
        empty-text="暂无数据"
        :row-class-name="rowClassShow"
        border
        @current-change="handleCurrentChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
      >
        <el-table-column
          v-if="selectionRow || selectionRow === ''"
          type="selection"
          :label="handleAttribute(selectionRow.title, '')"
          v-bind="selectionRow"
        />
        <el-table-column
          v-if="indexRow || indexRow === ''"
          :label="handleAttribute(indexRow.title, '')"
          v-bind="indexRow"
        >
          <template slot-scope="scope">
            <span v-if="pagination && pagination.pageSize">
              {{ ((pagination.currentPage - 1) *pagination.pageSize + scope.$index + 1) }}
            </span>
            <span v-else>
              {{ scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="handleAttribute(item.title, '')"
          :prop="handleAttribute(item.key, null)"
          :show-overflow-tooltip="true"
          v-bind="item"
        >
          <template slot-scope="scope">
            <!-- <router-link
              v-if="scope.row.show && item.component && item.component.name === 'link'"
              :to="{ path: scope.row[item.key].path, query: scope.row[item.key].query }"
            >
              {{ scope.row[item.key].text }}
            </router-link> -->
            <el-input
              v-if="item.component && item.component && item.component.name === 'el-input' && (scope.row.show || item.component.show)"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-input-number
              v-else-if="scope.row.show && item.component && item.component.name === 'el-input-number'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-radio-group
              v-else-if="scope.row.show && item.component && item.component.name === 'el-radio'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            >
              <template v-if="item.component.buttonMode">
                <el-radio-button
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-radio-button>
              </template>
              <template v-else>
                <el-radio
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-radio>
              </template>
            </el-radio-group>
            <el-checkbox-group
              v-else-if="scope.row.show && item.component && item.component.name === 'el-checkbox'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            >
              <template v-if="item.component.buttonMode">
                <el-checkbox-button
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-checkbox-button>
              </template>
              <template v-else>
                <el-checkbox
                  v-for="option in item.component.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
            <el-select
              v-else-if="scope.row.show && item.component && item.component.name === 'el-select'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              v-on="item.component.handler"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            >
              <el-option
                v-for="option in item.component.options"
                :key="option.value"
                v-bind="option"
              />
            </el-select>
            <el-radio
              v-else-if="item.component && item.component.name === 'el-radio-select'"
              v-model="radioSelect"
              v-bind="item.component"
              :label="scope.$index"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: 'el-radio-select', value: radioSelect, row: scope.row})"
            >
              &nbsp;
            </el-radio>
            <el-cascader
              v-else-if="scope.row.show && item.component && item.component.name === 'el-cascader'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-switch
              v-else-if="scope.row.show && item.component && item.component.name === 'el-switch'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-slider
              v-else-if="scope.row.show && item.component && item.component.name === 'el-slider'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-time-select
              v-else-if="scope.row.show && item.component && item.component.name === 'el-time-select'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-time-picker
              v-else-if="scope.row.show && item.component && item.component.name === 'el-time-picker'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-date-picker
              v-else-if="scope.row.show && item.component && item.component.name === 'el-date-picker'"
              v-model="scope.row[item.key]"
              value-format="yyyy-MM-dd"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-rate
              v-else-if="scope.row.show && item.component && item.component.name === 'el-rate'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <el-color-picker
              v-else-if="scope.row.show && item.component && item.component.name === 'el-color-picker'"
              v-model="scope.row[item.key]"
              v-bind="item.component"
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
            />
            <render-custom-component
              v-else-if="item.component && item.component.name && (scope.row.show || item.component.show)"
              v-model="scope.row[item.key]"
              :component-name="item.component.name"
              :handler="item.component.handler"
              :props="item.component.props ? item.component.props : null"
              :scope="scope"
              @changeForm="change"
              v-on="item.component.handler"
            />
            <render-component
              v-else-if="scope.row.show && item.component && item.component.render"
              :render-function="item.component.render"
              :scope="scope"
            />
            <template v-else-if="item.component && item.component.name && item.component.name ==='el-tag'">
              <el-tag :type="item.component.tgType ? item.component.tgType(scope.row[item.key],scope.row, scope.column) : 'success'">
                {{ item.formatter ? item.formatter(scope.row, scope.column, formatKeyedName(_get(scope.row, item.key), item.formatterKey ), scope.$index) :
                  formatKeyedName(_get(scope.row, item.key), item.formatterKey) ? formatKeyedName(_get(scope.row, item.key)) :'' }}
              </el-tag>
            </template>
            <template v-else>
              <span>
                {{ item.formatter ? item.formatter(scope.row, scope.column, formatKeyedName(_get(scope.row, item.key), item.formatterKey ), scope.$index) :
                  formatKeyedName(_get(scope.row, item.key), item.formatterKey) ? formatKeyedName(_get(scope.row, item.key)) :'' }}
              </span>
            </template>
          </template>
          <table-column v-if="item.children" :columns="item.children" />
        </el-table-column>
        <el-table-column
          v-if="rowHandle"
          :label="handleAttribute(rowHandle.columnHeader, '操作')"
          v-bind="rowHandle"
        >
          <template v-for="(item, index) in handleAttribute(rowHandle.custom, [])" slot-scope="scope">
            <el-button
              v-if="handleRowHandleButtonShow(item.show, scope.$index, scope.row)"
              :key="index"
              :disabled="handleRowHandleButtonDisabled(item.disabled, scope.$index, scope.row)"
              v-bind="item"
              @click.stop="$emit(item.emit, {index: scope.$index, row: scope.row})"
            >
              {{ item.text }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="pagination" class="dee-table-pagination">
      <el-pagination
        v-bind="pagination"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        @prev-click="handlePaginationPrevClick"
        @next-click="handlePaginationNextClick"
      />
    </div>
  </div>
</template>

<script>
import base from './Mixin/base'
import handleRow from './Mixin/handleRow'
import data from './Mixin/data'
import edit from './Mixin/edit'
import add from './Mixin/add'
import remove from './Mixin/remove'
import dialog from './Mixin/dialog'
import pagination from './Mixin/pagination'
import exposeMethods from './Mixin/exposeMethods.js'
import utils from './Mixin/utils'
import classColor from './Mixin/classColor'
import renderComponent from './renderComponent.vue'
import renderCustomComponent from './renderCustomComponent.vue'
import TableColumn from './TableColumn'
import check from './Mixin/check'

export default {
  name: 'DeeTable',
  components: {
    renderComponent,
    renderCustomComponent,
    TableColumn
  },
  mixins: [
    base,
    data,
    handleRow,
    edit,
    add,
    remove,
    dialog,
    pagination,
    exposeMethods,
    utils,
    check,
    classColor
  ]
}
</script>

<style lang="scss">
  @import "../../styles/element-variables";

  .dee-table {
    // border-bottom: 1px solid #EBEEF5;
    .dee-table-pagination {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px 10px 0;
    }

    .dee-table-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      // padding: 0 5px 8px 0;
    }

    .el-table {
      .warning-row {
        // background: rgb(144,213,151);
        background-color: #E6A568;
      }

      .satisfy-row {
        background: #88c8e7;
      }

      .unsatisfy-row {
        background: #debc7c;
      }

      thead {
        color: #212121;
        font-weight: 500;
        font-size: $--font-size-base;

        th {
          padding: 5px 0;
          background-color: #f6f6f6;
          // border: 0;
          line-height: 24px !important;
        }
        .is-leaf {
          border-right: none
        }

        // th.is-sortable:not(:first-child):not(.gutter):before {
        //   content: '';
        //   height: 24px;
        //   line-height: 24px;
        //   border-right: 1px solid #D8D8D8;
        //   float: left;
        //   margin-top: 5px;
        // }

        // th:not(:first-child):not(.gutter):before {
        //   content: '';
        //   height: 24px;
        //   line-height: 24px;
        //   border-right: 1px solid #D8D8D8;
        //   float: left;
        // }
      }

      td {
        padding: 10px 0;
      }

      .el-table--border th, .el-table--border td {
        border-spacing: 5px 0;
      }
    }
  }
</style>
