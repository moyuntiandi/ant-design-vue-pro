<template>
  <!-- <page-header-wrapper> -->
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户昵称">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="电话">
                  <a-input placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="状态">
                  <a-select placeholder="请选择" default-value="1">
                    <a-select-option value="0">禁用</a-select-option>
                    <a-select-option value="1">启用</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
              <a-col :md="!advanced && 8 || 8" :sm="16">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
          </a-row>
          <a-row>
            <a-col :md="8" :sm="24">
              <a-button type="primary" icon="plus" @click="add">添加</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 100 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
      </s-table>
    </a-card>
  <!-- </page-header-wrapper> -->
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getSystemUsers } from './api.js'
import userForm from './modules/userForm'
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '昵称',
    dataIndex: 'nickName'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '电子邮件',
    dataIndex: 'email'
  },
  {
    title: '电话',
    dataIndex: 'telNo'
   },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getSystemUsers(requestParameters)
          .then(res => {
            console.log('res.result', res.result)
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    add () {
          this.$dialog(userForm,
            // component props
            {
              record: {},
              on: {
                ok () {
                  console.log('ok 回调')
                },
                cancel () {
                  console.log('cancel 回调')
                },
                close () {
                  console.log('modal close 回调')
                }
              }
            },
            // modal props
            {
              title: '新增',
              width: 700,
              centered: true,
              maskClosable: false
            })
        },
        edit (record) {
          console.log('record', record)
          this.$dialog(userForm,
            // component props
            {
              record,
              on: {
                ok () {
                  console.log('ok 回调')
                },
                cancel () {
                  console.log('cancel 回调')
                },
                close () {
                  console.log('modal close 回调')
                }
              }
            },
            // modal props
            {
              title: '操作',
              width: 700,
              centered: true,
              maskClosable: false
            })
        }
  }
}

</script>
