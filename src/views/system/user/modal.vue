<template>
  <a-modal>
    <a-card >
      <a-form :form="form">
        <a-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['username', {rules: [{ required: true, message:'用户名不能为空' }]}]" :disabled="operate==='update'||operate==='detail'" />
        </a-form-item>
        <a-form-item label="昵称" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['nickname', {rules: [{ required: true, message:'昵称不能为空' }]}]" :disabled="operate==='detail'"/>
        </a-form-item>
        <a-form-item label="电话" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['phone', {rules: []}]" :disabled="operate==='detail'"/>
        </a-form-item>
        <a-form-item label="邮箱" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['email', {rules: []}]" :disabled="operate==='detail'"/>
        </a-form-item>
        <a-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select v-decorator="['status', {rules: [{ required: true, message:'状态不能为空' }]}]" :disabled="operate==='detail'">
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select allowClear mode="multiple" v-decorator="['roleIds', {rules: [{ required: true, message:'角色不能为空' }]}]" :disabled="operate==='detail'">
            <a-select-option v-for="ri in roleInfos" :key="ri.id" >{{ ri.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
  </a-modal>
</template>
<script>

import { add, edit, roleList, getuserRolesInfo } from './api'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    operate: {
      type: String,
      default: 'detail'
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      param: {},
      form: this.$form.createForm(this),
      roleInfos: [],
      roleIds: []
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    close (o) {
      this.$emit(o)
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          _this.confirmLoading = true
          if (this.operate === 'update' && this.data && this.data.id) { // form表单数据，只记录填写的数据，如果需要向后端传递其他值，可以在这里赋值
            values.id = this.data.id
            edit(values).then((res) => {
              _this.$message.success('操作成功')
              _this.close('ok')
            }).finally(() => {
              _this.confirmLoading = false
            })
          } else if (this.operate === 'add') {
            add(values).then((res) => {
              _this.$message.success('操作成功')
              _this.close('ok')
            }).finally(() => {
              _this.confirmLoading = false
            })
          }
        }
      })
    },
    handleCancel () {
      this.confirmLoading = false
      this.close('cancel')
    },
    async getRoles () {
      const roles = await roleList().then(res => res)
      this.roleInfos = roles
    },
    async  getUserRolesInfo (id) {
      const userRole = await getuserRolesInfo({ 'id': id }).then(res => {
        const roleIds = res.roleIds || []
        this.roleIds = roleIds
      })
      return userRole
    }
  },
  watch: {
    async  data (n, o) {
      const formdata = { username: '', nickname: '', email: '', phone: '', status: 1, remark: '', roleIds: [] }
      if (this.operate === 'update' || this.operate === 'detail') {
        formdata.username = n.username
        formdata.nickname = n.nickname
        formdata.email = n.email
        formdata.phone = n.phone
        formdata.status = n.status
        formdata.remark = n.formdata
        await this.getUserRolesInfo(this.data.id)
        formdata.roleIds = this.roleIds
      }
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...formdata })
      })
    }
  }

}
</script>
<style lang="less" scoped>

</style>
