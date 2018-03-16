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
          <el-form-item label="项目名称">
            <el-select disabled placeholder="安防监控系统" class="DataWidth">
              <el-option label="安防监控系统" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="5">
              <el-date-picker type="date" v-model="parmasid.startDateTime" placeholder="选择日期" class="DataWidth"></el-date-picker>
            </el-col>
            <el-form-item label="结束时间">
              <el-col :span="5">
                <el-date-picker type="date" placeholder="选择日期" v-model="parmasid.endDateTime"
                                class="DataWidth"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form-item>
          <el-form-item label="中心人员">
            <el-input class="DataWidLeft" v-model="parmasid.responsiblePeople"></el-input>
            <el-form-item label="人员电话">
              <el-input class="phoneNumber" v-model="parmasid.phoneNumber"></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item label="调研单位">
            <el-select disabled placeholder="安防监控系统" class="DataWidth">
              <el-option label="安防监控系统" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="调研负责人" required>
            <el-input class="PeopleWidth" v-model="parmasid.responsiblePeople"></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <img style="width: 120px;height: 120px;" v-bind:src="parIrc" alt="">
          </el-form-item>
          <el-form-item  label="调研参与人" required>
            <el-input class="PeopleWidth" v-model="parmasid.participants"></el-input>
          </el-form-item>
        </el-form>

      </el-tab-pane>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="doPrint">打印</el-button>
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
        parIrc:""
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      },
      doPrint(){
        var newstr = document.getElementsByClassName('printOrder-data')[0].innerHTML
        //document.body.innerHTML = newstr
       // var oldstr = document.body.innerHTML
        window.print()
        //document.body.innerHTML = oldstr
        //window.location.reload()
      },
      getData(){
        this.parmasid=this.$route.query.pramadata[0]
        console.log(this.parmasid,888);
        console.log(this.parmasid.imgSrc+""+this.parmasid.fileCode, 999);
        this.parIrc="Http://172.16.6.11:10080/"+this.parmasid.imgSrc+""+this.parmasid.fileCode;
      }
    },
    mounted:function () {
      this.getData()
      this.setData()
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
    width: 287px;float: left
  }
  .phoneNumber{
    width: 265px
  }
  .PeopleWidth{
    width: 275px
  }
</style>
