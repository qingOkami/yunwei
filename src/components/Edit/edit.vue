<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="调研详情" class="printOrder-data">
        <el-form :model="parmasid" ref="parmasid" label-width="100px">
          <el-form-item label="调研单号">
            <el-input v-model="parmasid.fileCode"></el-input>
          </el-form-item>
          <el-form-item label="调研主题">
            <el-input v-model="parmasid.title"></el-input>
          </el-form-item>
          <el-form-item label="调研内容">
            <el-input type="textarea" :rows="6" v-model="parmasid.content"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" required>
            <el-select filterable v-model="parmasid.ProjectName" placeholder="请选择项目单位" style="width: 550px;">
              <el-option v-for="(jobs,lis) in jobNav" :key="lis" :label="jobs.projectName" v-model="jobs.projectName" value=""></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="项目名称">-->
            <!--<el-select disabled placeholder="安防监控系统" class="DataWidth">-->
              <!--<el-option label="安防监控系统" value="shanghai"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="开始时间" style="display: inline-block">
            <el-col :span="5">
              <el-date-picker type="datetime" v-model="parmasid.startDateTime" placeholder="选择日期" class="DataWidth"></el-date-picker>
            </el-col>

          </el-form-item>
          <el-form-item label="结束时间" style="display: inline-block;margin-left: 43px">
            <el-col :span="5">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="parmasid.endDateTime"
                              style="width: 200px;"       ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="中心人员">
            <el-input class="DataWidLeft" v-model="parmasid.centerContact"></el-input>
            <el-form-item label="人员电话" style="display: inline-block;margin-left: 45px">
              <el-input class="phoneNumber"  v-model="parmasid.phoneNumber"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="调研单位" required>
            <el-select filterable v-model="parmasid.researchOrganization" placeholder="请选择" class="DataPickw">
              <el-option v-for="(jobname,jobdex) in dydwname" :key="jobdex" :label="jobname.fdName" :value="jobname.fdName"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="调研单位">-->
            <!--<el-select disabled placeholder="安防监控系统" class="DataWidth">-->
              <!--<el-option label="安防监控系统" value="shanghai"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item  label="调研负责人">
            <el-input disabled class="PeopleWidth" v-model="parmasid.responsiblePeople"></el-input>
            <el-tag>如需更改点击下方选择</el-tag>
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
          <el-form-item style="float: right">
            <img style="width: 120px;height: 120px;" v-bind:src="parIrc" alt="">
          </el-form-item>

          <el-form-item  label="调研参与人">
            <el-input disabled class="PeopleWidth" v-model="parmasid.participants"></el-input>
            <el-tag>如需更改点击下方选择</el-tag>
          </el-form-item>
          <el-form-item label="调研参与人" prop="" required>
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

        </el-form>

      </el-tab-pane>
      <el-form>
        <el-form-item>
          <!--<el-button type="primary" @click="doPrint">打印</el-button>-->
          <el-button type="primary" @click="Preservation">保存</el-button>
          <el-button type="primary" @click="handleGo">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parmasid:{
          ResponsiblePeople: [],
          Participants: [],
        },
        parIrc:"",
        jobNav:[],
        dynamicTags: [],
        tableData:[],
        isNav: false,
        isNavs: false,
        tables: [],
        tableDatas: [],
        dydwname:[]
      }
    },

    methods: {
      handleGo(){
        this.$router.push('/')
      },
      handlenav() {
        //显示隐藏调研人
        this.isNav = !this.isNav
      },
      handlenavss() {
        this.isNavs = !this.isNavs
      },
      handlePeople(row) {
        //点击当前行的人
        this.dynamicTags.push(row.UserName);
        this.isNav = !this.isNav
        this.parmasid.responsiblePeople=this.dynamicTags;
      },
      handlePeople2(row) {
        //点击当前行的人
        this.tables.push(row.UserName)
        this.isNavs = !this.isNavs
        console.log(this.tables);
        this.parmasid.participants=this.tables
      },
      handleClose2(tags) {
        //关闭调研人标签
        this.tables.splice(this.tables.indexOf(tags), 1)
      },
      handleClose1(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.parmasid.responsiblePeople=this.dynamicTags;
      },
      doPrint(){
        //打印
        var newstr = document.getElementsByClassName('printOrder-data')[0].innerHTML
        //document.body.innerHTML = newstr
        // var oldstr = document.body.innerHTML
        window.print()
        //document.body.innerHTML = oldstr
        //window.location.reload()
      },
      Preservation(){
        //保存已经更改的数据
        let dataform=this.parmasid;
        this.parmasid.startDateTime=this.parmasid.startDateTime.replace(".0","")
        this.parmasid.endDateTime=this.parmasid.endDateTime.replace(".0","")
        console.log(dataform,8689);
        let dataok=JSON.stringify(dataform);

        this.$axios.post('http://172.16.6.11:10080/UpdateResearchInfo?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C',dataok).then((res) => {
          this.$router.go(-1);
        }, error => {
          console.log(error);
        })
      },
      getData(){
        //获得路由传递过来的数据
        this.parmasid=this.$route.query.pramadata[0]
        console.log(this.parmasid,888);
        console.log(this.parmasid.imgSrc+""+this.parmasid.fileCode, 999);
        console.log(this.parmasid.recId,820789);
      }
    },
    created(){
      //调研人和参与人数据
      this.$axios.get('http://172.16.6.11:10080/GetUserList?token=D033EC9751E844B19E775D8309A922B8').then((res) => {
        this.tableData = res.data;
        this.tableDatas = res.data;
        console.log(res.data,222);
      }, error => {
        console.log(error);
      });
      //学校数据
      this.$axios.get('http://172.16.6.11:10080/GetUnitList?token=D033EC9751E844B19E775D8309A922B8').then((res) => {
        this.schoolObjAry = res.data;
        console.log(res.data,989);
      }, error => {
        console.log(error);
      });
      //单位数据
      this.$axios.get('http://172.16.6.11:10080/GetProjectInfo?token=D033EC9751E844B19E775D8309A922B8').then((res) => {
        this.jobNav=res.data
        console.log(res.data,28790);
      }, error => {
        console.log(error);
      });
      //工程师数据
      this.$axios.get('http://172.16.6.11:10080/GetCompany?token=D033EC9751E844B19E775D8309A922B8').then((res) => {
        this.dydwname=res.data;
        console.log(res.data,28790);
      }, error => {
        console.log(error);
      });
    },
    mounted:function () {
      this.getData()
    },
    watch:{
      '$route'(to,form){
        this.getData()
      }
    }
  }
</script>

<style scoped>
  .DataWidth{
    width: 200px
  }
  .DataWidLeft{
    width: 200px;
    display: inline-block
  }
  .phoneNumber{
    width: 200px;

  }
  .PeopleWidth{
    width: 275px
  }
  .DataPickw{
    width: 200px
  }
</style>
