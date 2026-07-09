<template>
  <el-breadcrumb class="breadcrumb">
    <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    <el-breadcrumb-item>项目配置</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="tools">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-button type="primary">操作</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showAdd">添加</el-dropdown-item>
          <el-dropdown-item @click="state.showSearch = true">检索</el-dropdown-item>
          <el-dropdown-item @click="removeAll">批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <el-table :data="state.list" :border="true" :stripe="true" @selection-change="selectionChange">
    <el-table-column type="selection" width="40" />
    <el-table-column show-overflow-tooltip prop="name" label="配置名" :width="state.colWidth" />
    <el-table-column show-overflow-tooltip prop="value" label="配置值" :width="state.colWidth" />
    <el-table-column label="操作" width="255">
      <template #default="scope">
        <el-button size="small" type="success" @click="showEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确认删除?" @confirm="remove(scope.row)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <div class="pager">
    <el-pagination
      size="small"
      background
      layout="total, prev, pager, next"
      :pager-count="5"
      :total="state.total"
      @current-change="pageChange" />
  </div>

  <el-dialog v-model="state.showEdit" :title="state.editType" class="dialog" @closed="editClosed">
    <el-form label-width="auto">
      <el-form-item label="配置名">
        <el-input v-model="state.data.name" placeholder="请填写配置名" />
      </el-form-item>
      <el-form-item label="配置值">
        <el-input v-model="state.data.value" placeholder="请填写配置值" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCancel">取消</el-button>
        <el-button type="primary" @click="editOk">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="state.showSearch" title="检索" class="dialog">
    <el-form label-width="auto">
      <el-form-item label="配置名">
        <el-input v-model="state.search.name" placeholder="请填写配置名" />
      </el-form-item>
      <el-form-item label="配置值">
        <el-input v-model="state.search.value" placeholder="请填写配置值" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="searchCancel">取消</el-button>
        <el-button type="primary" @click="searchOk">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { onMounted, reactive, watchEffect } from 'vue'
  import { useWindowSize } from '@vueuse/core'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useAxios } from '../../hooks/useAxios'

  const state = reactive({
    list: [],
    total: 0,
    data: {
      name: '',
      value: '',
    },
    search: {
      name: '',
      value: '',
    },
    dataId: '',
    selectIds: '',
    colWidth: 'auto',
    editType: '添加',
    showEdit: false,
    showSearch: false,
  })

  const { width, height } = useWindowSize()

  watchEffect(() => {
    if (width.value > 1024) {
      state.colWidth = 'auto'
    } else {
      state.colWidth = '150'
    }
  })

  const http = useAxios()

  const getList = async (page = 1) => {
    const res = await http.post('/api/admin/config/list', { page, search: state.search })
    state.total = res.data.data.total
    state.list = res.data.data.list
  }

  onMounted(async () => {
    await getList()
  })

  const searchCancel = async () => {
    state.search = {}
    await getList()
    state.showSearch = false
  }

  const searchOk = async () => {
    await getList()
    state.showSearch = false
  }

  const pageChange = async page => {
    await getList(page)
  }

  const showAdd = () => {
    state.editType = '添加'
    state.showEdit = true
  }

  const showEdit = data => {
    state.editType = '编辑'
    state.data = data
    state.showEdit = true
  }

  const editClosed = () => {
    state.data = {}
  }

  const editCancel = () => {
    state.data = {}
    state.showEdit = false
  }

  const editOk = async () => {
    let res = null
    if (state.editType === '添加') {
      res = await http.post('/api/admin/config/add', state.data)
    } else {
      res = await http.post('/api/admin/config/update', state.data)
    }
    await getList()
    if (res.data.success) {
      ElMessage.success(res.data.message)
      state.showEdit = false
    } else {
      ElMessage.error(res.data.message)
    }
  }

  const remove = async data => {
    const res = await http.post('/api/admin/config/remove', { ids: data.id })
    ElMessage.success(res.data.message)
    await getList()
  }

  const removeAll = async () => {
    if (!state.selectIds) {
      ElMessage.warning('未选中任何项目')
      return
    }
    await ElMessageBox.alert('确定批量删除？', '提示', { type: 'warning' })
    const res = await http.post('/api/admin/config/remove', { ids: state.selectIds })
    ElMessage.success(res.data.message)
    state.selectIds = ''
    await getList()
  }

  const selectionChange = items => {
    const ids = items.map(item => item.id)
    state.selectIds = ids.join(',')
  }
</script>
