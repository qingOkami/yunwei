<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="调研详情" class="printOrder-data">
        <el-form :model="parmasid" ref="parmasid" label-width="100px">
          <el-form-item label="调研单号">
            <el-input v-model="parmasid.fileCode" ></el-input>
          </el-form-item>
          <el-form-item label="调研主题">
            <el-input v-model="parmasid.title" ></el-input>
          </el-form-item>
          <el-form-item label="调研内容">
            <el-input type="textarea" disabled :rows="6" v-model="parmasid.content"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-select v-model="this.parmasid.projectName" disabled placeholder="安防监控系统" class="DataWidth">
              <el-option label="安防监控系统" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="display: inline-block" label="开始时间" >
            <el-col :span="5">
              <el-date-picker type="datetime"  v-model="parmasid.startDateTime" placeholder="选择日期" class="DataWidLeft"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item style="display: inline-block" label="结束时间" >
              <el-col :span="5">
                <el-date-picker disabled type="datetime" placeholder="选择日期" v-model="parmasid.endDateTime"
                                class="DataWidLeft"></el-date-picker>
              </el-col>
            </el-form-item>
          <el-form-item label="中心人员">
            <el-input class="DataWidLeft"  v-model="parmasid.centerContact"></el-input>
          </el-form-item>

          <el-form-item label="人员电话">
              <el-input class="DataWidLeft"  v-model="parmasid.phoneNumber"></el-input>
            </el-form-item>

          <el-form-item label="调研单位">
            <el-select v-model="parmasid.researchOrganization"  placeholder="安防监控系统" class="DataWidth">
              <el-option label="安防监控系统" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="调研负责人">
            <el-input class="PeopleWidth"  v-model="parmasid.responsiblePeople"></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <!--this.parmasid.fileCode-->
            <img style="width: 120px;height: 120px;" :src="imgSrc" alt="">
          </el-form-item>
          <el-form-item  label="调研参与人">
            <el-input class="PeopleWidth"  v-model="parmasid.participants"></el-input>
          </el-form-item>
        </el-form>

      </el-tab-pane>
<el-form>
  <el-form-item>
    <el-button type="primary" v-show="isShow" @click="doPrint">打印</el-button>
    <el-button type="primary" v-show="isShow" @click="handleGo">返回</el-button>
  </el-form-item>
</el-form>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parmasid:{},
        parIrc:"",
        isShow:true,
        imgSrc:"http://qr.liantu.com/api.php?text=http://172.16.6.11:10080/iitsp/research.jsp?fileCode="
      }
    },

    methods: {
      handleGo(){
        this.$router.push('/')
      },
      onSubmit() {
        console.log('submit!');
      },
      inv: function () {
        this.invt = setTimeout(() => {
          window.print()
        }, 100)
      },
      ins: function () {
        this.invs = setTimeout(() => {
          this.isShow=true
        }, 300)
      },
      doPrint(){
        let Printobj=this.parmasid
        this.$router.push({path:'/PrintWork',query: {Prints:Printobj}})
        this.isShow=false;
        var newstr = document.getElementsByClassName('printOrder-data')[0].innerHTML;
        this.inv()
        this.ins()
        //document.div.innerHTML = newstr
       // var oldstr = document.body.innerHTML

        //document.body.innerHTML = oldstr
        //window.location.reload()
      },
      getData(){
        this.parmasid=this.$route.query.pramadata[0]
        console.log(this.parmasid,707);
      }
    },
    mounted:function () {
      this.getData()
      let imageS="http://qr.liantu.com/api.php?text="+this.parmasid.serverIP+"/iitsp/research.jsp?fileCode="
      this.imgSrc=imageS+this.parmasid.fileCode
      //
      console.log(this.imgSrc,8787,9999);
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
    width: 100%
  }
  .DataWidLeft{
    width: 200px

  }
  .PeopleWidth{
    width: 275px
  }
</style>
