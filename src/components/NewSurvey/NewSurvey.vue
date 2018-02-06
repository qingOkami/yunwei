<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="新建调研">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="调研主题" prop="name">
              <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>

            <el-form-item label="调研内容" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="项目名称" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="安防监控系统" value="shanghai"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间" required style="display: inline-block">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 120px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="截止时间" required style="display: inline-block">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 120px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="中心联系人" prop="name">
              <el-input v-model="ruleForm.people" style="width: 120px;"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="name">
              <el-input v-model="ruleForm.tell" style="width: 120px;"></el-input>
            </el-form-item>
            <el-form-item label="调研单位" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="北京思维实创科技股份有限公司" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="调研负责人" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="曲欣欣" name="type"></el-checkbox>
                <el-checkbox label="乐乐" name="type"></el-checkbox>
                <el-checkbox label="孙国旗" name="type"></el-checkbox>
                <el-checkbox label="孙红" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="参与负责人" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="屈欣欣"></el-radio>
                <el-radio label="孙红"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学校名称" prop="region" style="display: inline-block">
              <el-select v-model="ruleForm.region" placeholder="请选择学校" style="width: 300px">
                <el-option label="十八里店小学" value="shanghai"></el-option>
                <el-option label="奥园幼儿园" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="学校负责人" prop="name" style="display: inline-block">
              <el-input v-model="ruleForm.people" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogVisible = true">预览</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="预览"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <span>这是一段信息</span>
         <h2 style="text-align: center">朝阳区其他公办幼儿园安防监控达标建设勘察介绍信</h2>
        <div style="padding: 0 60px">
          <p style="margin-top: 35px">
            <span style="font-weight:400;font-size: 16px;">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据朝阳区教育委员会安排，依据《关于加强本市中小学幼儿园安全工作的意见》（京教勤[2010]8号）文件精神，进一步提高个教育单位安全防范能力，了解幼儿园现有安防监控系统现状。
          </span>
          </p>

        <p style="margin-top: 40px">
          <span style="font-weight:400;font-size: 16px;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;兹介绍 王宝磊 同志对贵单位安防监控系统进行勘察，望贵单位予以积极配合。
          </span>
        </p>
<p style="margin-top: 20px">
  <span style="font-weight:400;font-size: 16px;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本次现场调研时间：2017年11月24日-2017年12月11日，在此期间，如有调研人员前来与贵单位联系，请贵单位予以接洽。
  </span>
</p>
          <p style="margin-top: 40px">
            <span style="font-weight:400;font-size: 16px;">
              信息中心联系人：高超
            </span>
          </p>
          <p>
            <span style="font-weight:400;font-size: 16px;">
              联系电话：85979246-84044
            </span>
          </p>
          <p>
            这里是图片
            <img src="" alt="">
          </p>
          <div style="text-align: right">
          <p><span>北京市朝阳区现代教育信息网络中心</span></p>
          <p style="margin-right: 50px"><span>2018年01月02日</span></p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button style="margin-top: 100px" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
      <!--<div v-show="isShow" style="width: 100%;height: 100%;background:#000;z-index:999;position: fixed;top: 0;left: 0;opacity: .4">-->
<!--<div style="z-index:9999;width: 1060px;height: 1000px;border: 1px solid #fff;position: absolute;left: 250px;background: #fff;">-->
<!--<div>-->

<!--</div>-->
<!--</div>-->
      <!--</div>-->
    </div>
</template>

<script>
    export default { data() {

        return {
          dialogVisible: false,
          isShow:false,
          ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            tell:'',
            people:''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        showToggle:function(){
          this.isShow = !this.isShow
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>

<style scoped>

</style>
