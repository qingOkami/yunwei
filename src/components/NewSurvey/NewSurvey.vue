<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="新建调研">
        <el-form :model="school" ref="school" label-width="100px" class="demo-ruleForm">
          <el-form-item label="调研主题" prop="" required>
            <el-input type="text" v-model="school.Title"></el-input>
          </el-form-item>

          <el-form-item label="调研内容" required>
            <el-input type="textarea" v-model="school.Content" :rows="6"></el-input>
          </el-form-item>

          <el-form-item label="项目名称" required>
            <el-select v-model="school.ProjectName" placeholder="请选择" style="width: 1369px;">
              <el-option label="安防监控系统" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" required style="display: inline-block">
            <el-col :span="11">
              <el-form-item prop="">
                <el-date-picker type="date" placeholder="选择日期" v-model="school.StartDateTime"
                                @change="logTimeChange"             style="width: 565px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="截止时间" @change="endTimeChange" required style="display: inline-block;margin-left: 135px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="date" placeholder="选择日期" v-model="school.EndDateTime"
                                style="width: 565px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="中心联系人" required style="display: inline-block">
            <el-input v-model="school.CenterContact" style="width: 565px;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required style="display: inline-block;margin-left: 135px">
            <el-input v-model="school.PhoneNumber" style="width: 565px;"></el-input>
          </el-form-item>
          <el-form-item label="调研单位" required>
            <el-select v-model="school.ResearchOrganization" placeholder="请选择调研单位" style="width: 565px;">
              <el-option label="北京思维实创科技股份有限公司" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调研负责人" required>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose1(tag)">
              {{tag}}
            </el-tag>
            <el-button type="text" @click="handlenav">请选择调研负责人</el-button>
            <el-table @row-click="handlePeople" row-key="`id`" :data="tableData"
                      style="width:700px;height:500px;border:1px solid #efefef;position: fixed;top:100px;left: 30%;overflow-y:scroll;z-index: 9999;"
                      v-show="isNav">
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
              @close="handleClose2(tags)"
            >
              {{tags}}
            </el-tag>
            <el-button type="text" @click="handlenavss">请选择调研参与人</el-button>
            <el-table @row-click="handlePeople2" row-key="`name`" :data="tableDatas"
                      style="width:700px;height:500px;border:1px solid #efefef;position: fixed;top:100px;left: 30%;overflow-y:scroll;z-index: 9999;"
                      v-show="isNavs">
              <el-table-column prop="UserName" label="用户名" width="180"/>
              <el-table-column prop="GroupName" label="组织机构" width="300"/>
              <el-table-column prop="RoleId" label="角色名称"/>
            </el-table>
          </el-form-item>

<el-form v-for="(item,key) in schoolcreat" :key="key">
  <template slot-scope="scope">
          <el-form-item label="学校名称" style="display: inline-block">
            <el-select @change="selectSchool" v-model="school[key]" value-key="UnitId" placeholder="请选择学校" style="width: 400px">
              <el-option v-for="(schoolOb,index) in schoolObjAry" :key="index" :label="schoolOb.SchoolName"
                         :value="schoolOb.SchoolName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校负责人" style="display: inline-block;margin-left: 135px">
            <el-input :value="selectedValue"  readonly style="width: 400px;"></el-input>
          </el-form-item>
  </template>
</el-form>
          <el-form-item>
            <el-button @click="creactSchool">添加更多学校</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true">预览</el-button>
            <el-button type="primary" @click="postData">保存</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <el-carousel indicator-position="none" style="height: 800px;" :autoplay=false>
        <el-carousel-item style="height: 700px"  v-for="item in 4" :key="item">
          <span><img src="../../assets/images/Title.png" alt=""></span>
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
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本次现场调研时间：<child v-bind:my-message="scdates"></child>至<child v-bind:my-message="scdate"></child>，在此期间，如有调研人员前来与贵单位联系，请贵单位予以接洽。
  </span>
            </p>
            <p style="margin-top: 40px">
            <span style="font-weight:400;font-size: 16px;">
              信息中心联系人：<child v-bind:my-message="school.CenterContact"></child>
            </span>
            </p>

            <p>
            <span style="font-weight:400;font-size: 16px;">
              联系电话：85979246-84044
            </span>
            </p>
            <p>
              <img style="width: 120px;height: 120px;" src="http://qr.liantu.com/api.php?text=http://172.16.6.11:10080/GetResearchInfo?token=C0869589E15E469CA031AC09FD874234" alt="">
            </p>
            <div style="text-align: right">
              <p><span>北京市朝阳区现代教育信息网络中心</span></p>
              <p style="margin-right: 50px"><child v-bind:my-message="scdate"></child></p>
            </div>
            <h3 style="text-align: center;margin-top: 30px">{{item}}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scdate:'',
        scdates:'',
        schoolcreat:[1],
        schoolObjAry: [],
        selectedValue: 'ok@qq.com',
        selectedSchoolId:'',
        tableData:
          [],
        datas: '',
        tableDatas: [],
        dynamicTags: [],
        tables: [],
        dialogVisible: false,
        isShow: false,
        results: [],
        isNav: false,
        isNavs: false,
        schoolId: [],
        school:
          {
            LastModBy: "",
            StartDateTime: "",
            EndDateTime: "",
            CreatedBy: "",
            Title: "",
            Content: "",
            CenterContact: "",
            ProjectName: "",
            PhoneNumber: "",
            ResearchOrganization: "",
            ResponsiblePeople: [],
            Participants: [],
            Logo: "",
            SchoolName: '',
            Teacher: ''
          },

      };
    },
    components:{
      child: {
        props: ['myMessage'],
        template: '<span>{{myMessage}}</span>'
      }
    },
    methods: {
      logTimeChange(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        this.scdates= y + '年' + m + '月' + d+'日';
      },
      endTimeChange(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        this.scdate= y + '年' + m + '月' + d+'日';
      },
      creactSchool(){
        console.log(111);
        this.schoolcreat.push(1);
      },
      selectSchool(val){
        const [selectedSchoolObj] = this.schoolObjAry.filter(item=>{
          return item.SchoolName == val;
        });
        this.selectedValue = selectedSchoolObj.Value;
      },
      handlenav() {
        this.isNav = !this.isNav
      },
      handlenavss() {
        this.isNavs = !this.isNavs
      },
      handlePeople(row) {
        this.dynamicTags.push(row.UserName);
        this.isNav = !this.isNav
        this.school.ResponsiblePeople=this.dynamicTags;
      },
      handlePeople2(row) {
        this.tables.push(row.UserName)
        this.isNavs = !this.isNavs
        console.log(this.tables);
        this.school.Participants=this.tables
      },
      handleClose1(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.school.ResponsiblePeople=this.dynamicTags;
      },
      handleClose2(tags) {
        this.tables.splice(this.tables.indexOf(tags), 1)
      },
      postData() {
        var obj = JSON.stringify(this.school);
        this.$axios.post('http://172.16.6.11:10080/AddResearch?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C',
          obj,
        )
          .then((res) => {
            console.log(res.data);
            this.datas = res.data;
          }, error => {
            console.log(error);
          })
      },
      resetForm(formName) {
        this.$router.go(-1)
      },
      showToggle: function () {
        this.isShow = !this.isShow
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

    },
    mounted() {
      this.$axios.get('http://172.16.6.11:10080/GetUserList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.tableData = res.data;
        this.tableDatas = res.data;
        var d = new Date();
        var date = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"
        this.scdate=date
      }, error => {
        console.log(error);
      });
      this.$axios.get('http://172.16.6.11:10080/GetUnitList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.schoolObjAry = res.data;
        console.log(res.data);
      }, error => {
        console.log(error);
      })
    },

  }
</script>

<style scoped>
  .el-carousel__item h5 {
    color: #000;
    font-size: 18px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
    text-align: center;
  }
</style>
