<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="调研详情">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="调研单号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="调研主题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="调研内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-select v-model="form.region" placeholder="请选择" style="width: 100%">
              <el-option label="安防监控系统" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="5">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-form-item label="结束时间">
              <el-col :span="5">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form-item>
          <el-form-item label="中心人员" prop="name">
            <el-input v-model="form.name" style="width: 290px;float: left"></el-input>
            <el-form-item label="人员电话" prop="name">
              <el-input v-model="form.name" style="width: 275px"></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item label="调研单位">
            <el-select v-model="form.region" placeholder="请选择" style="width: 100%">
              <el-option label="安防监控系统" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调研参与">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="周晓旺" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="调研负责" prop="resource">
            <el-radio-group v-model="form.resource" >
              <el-radio label="高健"></el-radio>
              <el-radio label="徐志国"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>
