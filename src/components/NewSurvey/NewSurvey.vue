<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="新建调研">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="调研主题" prop="name">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>

          <el-form-item label="调研内容" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" :rows="6"></el-input>
          </el-form-item>

          <el-form-item label="项目名称" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择" style="width: 1369px;">
              <el-option label="安防监控系统" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" required style="display: inline-block">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 565px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="截止时间" required style="display: inline-block;margin-left: 135px">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 565px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="中心联系人" prop="name" style="display: inline-block">
            <el-input v-model="ruleForm.people" style="width: 565px;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="name" style="display: inline-block;margin-left: 135px">
            <el-input v-model="ruleForm.tell" style="width: 565px;"></el-input>
          </el-form-item>
          <el-form-item label="调研单位" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择调研单位" style="width: 565px;">
              <el-option label="北京思维实创科技股份有限公司" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调研负责人" prop="lianxi">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose1(tag)">
              {{tag}}
            </el-tag>
            <el-button type="text" @click="handlenav">请选择调研负责人</el-button>
            <el-table  @row-click="handlePeople" row-key="`id`" :data="tableData" style="width:700px;height:500px;border:1px solid #efefef;position: fixed;top:100px;left: 30%;overflow-y:scroll;z-index: 9999;" v-show="isNav">
              <el-table-column prop="UserName" label="用户名" width="180"/>
              <el-table-column prop="GroupName" label="组织机构" width="300"/>
              <el-table-column prop="RoleId" label="角色名称"/>
            </el-table>
          </el-form-item>

          <el-form-item label="调研参与人" prop="">
            <el-tag
              :key="tags"
              v-for="tags in tables"
              closable
              @close="handleClose2(tags)">
              {{tags}}
            </el-tag>
            <el-button type="text" @click="handlenavss">请选择调研参与人</el-button>
            <el-table  @row-click="handlePeople2" row-key="`name`" :data="tableDatas" style="width:700px;height:500px;border:1px solid #efefef;position: fixed;top:100px;left: 30%;overflow-y:scroll;z-index: 9999;" v-show="isNavs">
              <el-table-column prop="UserName" label="用户名" width="180"/>
              <el-table-column prop="GroupName" label="组织机构" width="300"/>
              <el-table-column prop="RoleId" label="角色名称"/>
            </el-table>
          </el-form-item>


          <el-form-item label="学校名称" style="display: inline-block">
            <el-select v-model="schoolId.SchoolName" placeholder="请选择学校" style="width: 565px">
              <el-option label="key" value="bb"></el-option>
              <el-option label="奥园幼儿园" value="aa" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校负责人" prop="lianxi" style="display: inline-block;margin-left: 135px">
            <el-input v-model="ruleForm.lianxi" style="width: 565px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true">预览</el-button>
            <el-button type="primary" @click="postData">保存</el-button>
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
        <p style="margin-top: 35px" id="kk">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datademo:'',
        tableData:
          [],
        tableDatas:[],
        dynamicTags:[],
        tables:[],
        inputVisible: false,
        inputValue: '',
        dialogVisible: false,
        isShow:false,
        results:[],
        isNav:false,
        isNavs:false,
        schoolId:[],
        school:
          {
            LastModBy:"恩恩",
            StartDateTime:"2018-3-7 14:20:41",
            EndDateTime:"2018-3-7 14:20:41",
            CreatedBy:"哈哈哈",
            Title:"test1",
            Content:"鹅鹅鹅为",
            CenterContact:"23请问奥所多",
            ProjectName:"身份证 ",
            PhoneNumber:"是否",
            ResearchOrganization:"www",
            ResponsiblePeople:["hahaha"],
            Participants:"就开始大幅度",
            Logo:"1",
            SchoolName:''
          },
        datas:'',
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
          people:'',
          lianxi:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: false, message: '请选择活动区域', trigger: 'change' }
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
      handlenav(){
        this.isNav=!this.isNav
      },
      handlenavss(){
        this.isNavs=!this.isNavs
      },
      handlePeople(row){
        this.dynamicTags.push(row.UserName);
        this.isNav=!this.isNav
      },
      handlePeople2(row){
        this.tables.push(row.UserName)
        this.isNavs=!this.isNavs
      },
      handleClose1(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      handleClose2(tags) {
        this.tables.splice(this.tables.indexOf(tags), 1)
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      postData () {
        var obj=JSON.stringify(this.school);
        this.$axios.post('http://172.16.6.11:10080/AddResearch?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C',
          obj,
        )
          .then((res)=>{
            console.log(res.data);
            this.datas=res.data;
          },error=>{
            console.log(error);
          })
      },
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
    },
    computed:{
    },
    beforeCreate:function () {
    },
    created:function () {

    },
    mounted() {
      this.$axios.get('http://172.16.6.11:10080/GetUserList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res)=>{
        this.tableData=res.data;
        this.tableDatas=res.data;
      },error=>{
        console.log(error);
      });
      this.$axios.get('http://172.16.6.11:10080/GetUnitList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res)=>{
        this.schoolId=res.data;
        console.log(res.data);
      },error=>{
        console.log(error);
      })
    },
  }
</script>

<style scoped>
</style>
