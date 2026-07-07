<template>
  <div class="tools">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-button type="primary">操作</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="state.showEdit = true">添加</el-dropdown-item>
          <el-dropdown-item>批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-table
    :data="state.listData"
    :border="true"
    :stripe="true"
    @selection-change="selectionChange">
    <el-table-column type="selection" width="40" />
    <el-table-column prop="date" label="时间" width="200" />
    <el-table-column prop="name" label="姓名" width="200" />
    <el-table-column prop="state" label="区域" width="200" />
    <el-table-column prop="city" label="城市" width="200" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="zip" label="邮编" width="200" />
    <el-table-column label="操作" width="300">
      <template #default="scope">
        <el-button size="small" type="success" @click="edit(scope.row)">编辑</el-button>
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
      :total="100" />
  </div>

  <el-dialog v-model="state.showEdit" title="编辑" class="dialog">
    <el-form label-width="auto">
      <el-form-item label="账号">
        <el-input />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input />
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="5" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.showEdit = false">取消</el-button>
        <el-button type="primary" @click="state.showEdit = false">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { reactive } from 'vue'

  const state = reactive({
    listData: [],
    selectIds: [],
    showEdit: false,
  })

  state.listData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
  ]

  const selectionChange = items => {
    const ids = []
    items.forEach(item => ids.push(item.id))
    state.selectIds = ids
  }

  const edit = () => {
    state.showEdit = true
  }
</script>
