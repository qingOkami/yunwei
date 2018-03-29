<template>
  <div>
    <div style="position: absolute;top: 10px;right: 50px;z-index:999999;">
    <el-button size="mini" type="primary" @click="dialogVisibles">预览</el-button>
    <el-button size="mini" type="success" @click="postData">保存</el-button>
    <el-button size="mini" type="primary" @click="resetForm">返回</el-button>
    </div>

    <el-tabs style="margin-top: 10px">

      <el-tab-pane label="新建调研">
        <el-form :model="school" ref="school" label-width="150px" class="demo-ruleForm">
          <el-form-item label="调研主题" prop="" required>
            <el-input type="text" v-model="school.Title"></el-input>
          </el-form-item>

          <el-form-item label="调研内容" required>
            <el-input type="textarea" v-model="school.Content" :rows="6"></el-input>
          </el-form-item>

          <el-form-item label="项目名称" required>
            <el-select filterable  v-model="school.ProjectName" placeholder="请选择项目单位" style="width: 500px;">
              <el-option v-for="(jobs,lis) in jobNav" :key="lis" :label="jobs.projectName" v-model="jobs.projectName" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" required class="DataInline">
            <el-col :span="11">
              <el-form-item prop="">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="school.StartDateTime"
                                @change="logTimeChange" class="DataPickw"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="截止时间" @change="endTimeChange" class="DataInleft" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="选择日期" v-model="school.EndDateTime"
                                class="DataPickw"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="中心联系人" required class="DataInline">
            <el-input v-model="school.CenterContact" class="DataPickw"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required class="DataInleft">
            <el-input v-model="school.PhoneNumber" class="DataPickw"></el-input>
          </el-form-item>
          <el-form-item label="调研单位" required>
            <el-select filterable  v-model="school.ResearchOrganization" placeholder="请选择" class="DataPickw">
              <el-option v-for="(ftem,findex) in FDname" :key="findex" :label="ftem.fdName" v-model="ftem.fdName" ></el-option>
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
            <el-button type="text" @click="handlenav">请选择调研负责人(只可选一位)</el-button>
            <el-table @row-click="handlePeople" row-key="`id`" :data="tableData"
                      class="DataTable"
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
                      class="DataTable"
                      v-show="isNavs">
              <el-table-column prop="UserName" label="用户名" width="180"/>
              <el-table-column prop="GroupName" label="组织机构" width="300"/>
              <el-table-column prop="RoleId" label="角色名称"/>

            </el-table>
          </el-form-item>

          <el-form v-for="(selectedSchoolObj, index) in selectedSchoolObjAry" style="margin-left: 70px" :key="index">
            <template slot-scope="scope">
              <el-form-item label="学校名称" class="DataInline">
                <span>{{index+1}}</span>
                <el-select filterable  @change="selectSchool(selectedSchoolObj.SchoolName, index)" v-model="selectedSchoolObj.SchoolName"
                           value-key="UnitId"
                           placeholder="请选择学校" class="DataOption">
                  <el-option v-for="(selectedSchoolFromApiObj, i) in schoolObjAry" :key="i"
                             :label="selectedSchoolFromApiObj.SchoolName"
                             v-model="selectedSchoolFromApiObj.SchoolName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学校负责人" class="DataInleft">
                <el-input :value="selectedSchoolObj.Value" readonly class="DataOption"></el-input>
              </el-form-item>
              <el-button @click="deleteRow(index)">删除</el-button>
            </template>

          </el-form>
          <el-form-item>
            <el-button @click="creactSchool">添加更多学校</el-button>
          </el-form-item>
          <el-form-item>

          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <el-carousel indicator-position="none" class="DataCarouse" :autoplay=false>
        <el-carousel-item class="DataCarouseitem"  v-for="(item,indexs) in selectedSchoolObjAry" :key="indexs">
          <span><img src="../../assets/images/Title.png" alt=""></span>
          <h2 class="DataCarouseh"><child v-bind:my-message="school.Title"></child> </h2>
          <div class="DataCarousebox">
            <p class="CarouseBoxP">
            <span class="CarouseBoxspan">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<child v-bind:my-message="school.Content"></child>
          </span>
            </p>

            <p class="CarouseBoxTwo">
          <span class="CarouseFont">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;兹介绍 <child v-bind:my-message="school.ResponsiblePeople.toLocaleString()"></child> 同志对贵单位安防监控系统进行勘察，望贵单位予以积极配合。
          </span>
            </p>
            <p class="CarouseBoxTwo">
  <span class="CarouseFont">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本次现场调研时间：<child v-bind:my-message="scdates"></child> &nbsp;至 &nbsp;<child v-bind:my-message="scdate"></child>，在此期间，如有调研人员前来与贵单位联系，请贵单位予以接洽。
  </span>
            </p>
            <p class="CarouseBoxTwo">
            <span class="CarouseFont">
              信息中心联系人：<child v-bind:my-message="school.CenterContact"></child>
            </span>
            </p>

            <p>
            <span class="CarouseFont">
              联系电话：<child v-bind:my-message="school.PhoneNumber.toString()"></child>
            </span>
            </p>


            <div class="CarouseRig">
              <p style="text-align: right;margin-right: 50px">
                <img class="CarouseImg" src="../../assets/images/nobcs.jpg" alt="">
              </p>
              <p><span>北京市朝阳区现代教育信息网络中心</span></p>
              <p class="CarousePmar"><child v-bind:my-message="scdate"></child></p>
            </div>
            <h3 class="CarousePage">{{indexs+1}}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      let defaultSchoolObj = {
        "SchoolName": null,
        "UnitId": null,
        "Value": null
      };
      return {
        scdate: '',
        scdates: '',
        // schoolcreat: [1],
        defaultSchoolObj,
        selectedSchoolObjAry: [
          {...defaultSchoolObj},
        ],
        schoolObjAry: [],
        selectedEmail: 'ok@qq.com',
        selectedSchoolId: '',
        tableData: [],
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
        jobNav:[],
        FDname:[],
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
            SchoolName:[],
            Teacher: [],
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
      dialogVisibles(){
        //预览
        this.dialogVisible=true;
        console.log(this.selectedSchoolObjAry,555);
      },
      deleteRow(index){
        //删除本行的学校和学校负责人
        this.selectedSchoolObjAry.splice(index,1)
      },
      creactSchool() {
        //创建学校
        this.selectedSchoolObjAry.push({...this.defaultSchoolObj});
      },
      selectSchool(theOneId, selectedSchoolObjAryIndex) {
        //学校和学校负责人的绑定
        const [selectedSchoolFormApiObj] = this.schoolObjAry.filter(item => {
          return item.SchoolName == theOneId;
        });
        //循环遍历匹配上的对象中的属性赋值给已被监听的对象，如果直接赋值为该对象，vue不会更新数据
        for(let key in selectedSchoolFormApiObj){
          if(selectedSchoolFormApiObj.hasOwnProperty(key)){
            this.selectedSchoolObjAry[selectedSchoolObjAryIndex][key] =  selectedSchoolFormApiObj[key];
          }
        }
      },
      logTimeChange(date){
        //展示再打印页面的时间格式
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
      handlenav() {
        //显示选择调研人
        this.isNav = !this.isNav
      },
      handlenavss() {
        //显示选择参与人
        this.isNavs = !this.isNavs
      },
      handlePeople(row) {
        //选中当前的调研人
        this.dynamicTags.push(row.UserName);
        this.isNav = !this.isNav
        this.school.ResponsiblePeople=this.dynamicTags;
      },
      handlePeople2(row) {
        //选中当前的参与人
        this.tables.push(row.UserName)
        this.isNavs = !this.isNavs
        console.log(this.tables);
        this.school.Participants=this.tables
      },
      handleClose1(tag) {
        //关闭选中的调研人标签
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.school.ResponsiblePeople=this.dynamicTags;
      },
      handleClose2(tags) {
        //关闭选中的参与人标签
        this.tables.splice(this.tables.indexOf(tags), 1)
      },
      postData() {
        //推送给后台新建的内容
        this.school.SchoolName = this.selectedSchoolObjAry.map(item=>item.SchoolName);
        console.log(this.selectedSchoolObjAry.map(item => item));
        console.log(this.selectedSchoolObjAry.map(item => item.Teacher));
        this.school.Teacher = this.selectedSchoolObjAry.map(item=>item.Value);
        this.school.Logo="1";
        var obj = JSON.stringify(this.school);
        this.$axios.post('http://172.16.6.11:10080/AddResearch?token=D033EC9751E844B19E775D8309A922B8',
          obj
          //{headers:{
              // "Access-Control-Allow-Origin" : "*",
              // "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
              // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
              //"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
           // }}
        )
          .then((res) => {
            console.log(res.data);
            this.datas = res.data;
            this.$router.push('/')
          }, error => {
            console.log(error);
          })
      },
      resetForm(formName) {
        //返回
        this.$router.go(-1)
      },
      showToggle: function () {

        this.isShow = !this.isShow
      },
      handleClose(done) {
        //关闭预览
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

    },
    mounted() {
      //调研参与人和调研人数据
      this.$axios.get('http://172.16.6.11:10080/GetUserList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.tableData = res.data;
        this.tableDatas = res.data;
        var d = new Date();
        var date = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"
        this.scdate=date
      }, error => {
        console.log(error);
      });
      //学校的接口
      this.$axios.get('http://172.16.6.11:10080/GetUnitList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.schoolObjAry = res.data;
        console.log(this.schoolObjAry,123);
      }, error => {
        console.log(error);
      });
      //工作单位的接口
      this.$axios.get('http://172.16.6.11:10080/GetProjectInfo?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.jobNav=res.data
      }, error => {
        console.log(error);
      });
      //工程师的名字
      this.$axios.get('http://172.16.6.11:10080/GetCompany?token=D033EC9751E844B19E775D8309A922B8').then((res) => {
        this.FDname=res.data;
        console.log(res.data,28790);
      }, error => {
        console.log(error);
      });
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
  .DataInline{
    display: inline-block;
  }
  .DataInleft{
    display: inline-block;
    /*margin-left: 100px*/
  }
  .DataPickw{
    width: 500px;
  }
  .DataTable{
    width:700px;height:500px;border:1px solid #efefef;position: fixed;top:100px;left: 30%;overflow-y:scroll;z-index: 9999;
  }
  .DataOption{
    width: 400px
  }
  .DataCarouse{
    height: 800px;
  }
  .DataCarouseitem{
    overflow-y: scroll;
    height: 750px
  }
  .DataCarouseh{
    text-align: center
  }
  .DataCarousebox{
    padding: 0 60px
  }
  .CarouseBoxP{
    margin-top: 35px
  }
  .CarouseBoxspan{
    font-weight:400;font-size: 16px;
  }
  .CarouseBoxTwo{
    margin-top: 20px
  }
  .CarouseFont{
    font-weight:400;font-size: 16px;
  }
  .CarouseImg{
    width: 120px;height: 120px;
  }
  .CarouseRig{
    text-align: right
  }
  .CarousePmar{
    margin-right: 50px
  }
  .CarousePage{
    text-align: center;margin-top: 30px
  }
</style>
