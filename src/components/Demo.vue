<template>
  <div class="hello">
    <el-container>
      <el-header>
        <div class="Complaint">
          <span
            style="width:4px;height:16px;background:#8eddf2;display:inline-block;margin-right:10px;margin-left:16px;"></span>
          <span style="color: #333">调研管理</span>
          <!--<span>(待办<span style="color:#ccc"> 0 </span>)</span>-->
        </div>
        <div>
          <button style="border:1px solid #ccc;width:100px;height:34px;line-height:34px;text-align:center;margin:10px 0 0 15px;cursor:pointer;" @click="handleDeleteAll()">批量删除</button>
          <div style="float: right">

            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="搜索"
              @select="handleSelect"
              style="width: 250px"
            ></el-autocomplete>

            <el-popover ref="popover4"
                        placement="bottom"
                        width="1000"
                        trigger="click"
                        v-model="visible2"
            >
              <el-form  label-width="120px">
                <el-form-item  label="调研主题" style="display: inline-block">
                  <el-input style="width: 150px" v-model="state7"></el-input>
                </el-form-item>
                <el-form-item label="学校名称" prop="region" style="display: inline-block;">
                  <el-select filterable  v-model="state9" value-key="RecId" placeholder="请选择" style="width: 200px" >
                    <el-option v-for="(val,index) in schoolSeo" :label="val.name" :value="val.name" :key="index" >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="负责人" style="display: inline-block;">
                  <el-input style="width: 200px" v-model="state5"></el-input>
                  <!--<el-autocomplete v-model="state5" style="width: 200px"></el-autocomplete>-->
                </el-form-item>
                <el-form-item label="调研单位" prop="region" style="display: inline-block;">
                  <el-select filterable  v-model="state10" value-key="RecId" placeholder="请选择" style="width: 150px" >
                    <el-option v-for="(val,index) in dyname" :label="val.email" :value="val.email" :key="index" >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="学校负责人" style="display: inline-block;margin-left: 42px;">
                  <el-input style="width: 200px" v-model="state6"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="region" style="display: inline-block;margin-left: 35px">
                  <el-select  v-model="state8" value-key="RecId" placeholder="请选择" style="width: 200px;" >
                    <el-option label="已指派" value="已指派"></el-option>
                    <el-option label="已关闭" value="已关闭"></el-option>
                    <el-option label="已逾期" value="已逾期"></el-option>
                  </el-select>
                </el-form-item>
                <div style="text-align: center">
                  <el-button @click="popoverReset" style="color:rgb(133, 197, 246)">重置</el-button>
                  <el-button @click="visible2 = false">取消</el-button>
                </div>
              </el-form>

            </el-popover>
            <el-button style="margin-right: -10px; background: rgb(170, 192, 174);" v-popover:popover4>更多条件</el-button>
            <el-button style="background: #ccc;border: none;color: #000" type="info" @click="winReload">刷新</el-button>
            <router-link to="/NewSurvey">
              <el-button type="success" style="margin-left: 0;background-color:rgb(92, 184, 92)">新建调研</el-button>
            </router-link>
          </div>
        </div>

      </el-header>

      <el-main>

        <el-table
          :data="infoList"
          border
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            selection-change
            width="55">
          </el-table-column>
          <el-table-column
            label="调研单号"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.body}}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="调研主题"
            width="230">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.id }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="学校名称"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.name}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="负责人"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.email}}
              </el-button>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="FileCode"-->
          <!--label="负责人"-->
          <!--width="80">-->
          <!--</el-table-column>-->
          <el-table-column
            label="调研单位"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.ResearchOrganization }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="学校负责人"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                {{scope.row.ResearchPeople}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="Title"
            label="状态"
            width="80">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.Status==1" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                已指派
              </el-button>
              <el-button type="text" v-else-if="scope.row.Status==0" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                已关闭
              </el-button>
              <el-button type="text" v-else="scope.row.Status==-1" size="small" style="color: #000;" @click="handleDeteilsSur(scope.row.FileCode)">
                已逾期
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="border: 0"
                @click="handleUpdata(scope.$index, scope.row)">
                <img src="../assets/icon/dfp.png" alt="">
              </el-button>
              <el-button
                size="mini"
                style="border: 0"
                @click="handleDelete(scope.$index, scope.row)">
                <img src="../assets/icon/user.png" alt="">
              </el-button>
              <el-button
                size="mini"
                style="border: 0"
                @click="handleClose(scope.$index, scope.row)"
              >
                <img src="../assets/icon/dgb_03.png" alt="">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="total"
      style="float: right"
    >
      <!--@current-change.sync="pageTurn(currentPage)"-->
    </el-pagination>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible2:false,
        schoolSeo:[],
        dyname:[],
        schooltitle:[],
        schoolStatus:[],
        schoolpeo:[],
        total: 0,
        currentPage: 1,
        newArr: [],
        infoList: [],
        willFilterInfoList: [],
        // movieInfoList: [],
        pageSize: 10,
        restaurants: [],
        state4: '',
        state5:'',
        state6:'',
        state7:'',
        state8:'',
        state9:'',
        state10:'',
        _that: {},
        timeout: null,
        DataList: [],
        results: [],
        groupedInfoAryAry: [],
        tableData3: [],
        multipleSelection: [],
        obd:{FileCode:1},
        pras:{},
        Deleterow:[],
        deleall:[],
        updata:[],
        dataStatus:'',
        InfoListText:[]
      };
    },
    methods: {
      handleClose(index,row){

        let stascode=JSON.stringify(row.FileCode)
        let stastus=JSON.stringify(row.Status=0)
        console.log(stastus,5454);
        this.$axios.get('http://172.16.6.11:10080/UpdataStatus?token=D033EC9751E844B19E775D8309A922B8&FileCode='+stascode+'&Status='+stastus).then((res) => {

        }, error => {
          console.log(error);
        });
      },
      handleUpdata(index,row){
        this.updata =row;
        let clr=JSON.stringify(this.updata);
        console.log(row.FileCode,57832);
        //this.$axios.post("http://172.16.6.11:10080/UpdateResearchInfo?token=9DE715AA1FFC401F8212E3DEE6061838",clr).then((res) => {
        this.$axios.get('http://172.16.6.11:10080/GetResearchInfo?FileCode='+row.FileCode).then((res) => {
          var prasse=res.data

          this.$router.push({path:'/Edit',query: {pramadata:prasse}})
        }, error => {
          console.log(error);
        });
      },
      popoverReset(){
        this.state4 = '';
        this.state5='';
        this.state6='';
        this.state7='';
        this.state8='';
        this.state9='';
        this.state10='';
      },
      winReload(){
        window.location.reload();

      },
      handleDeleteAll(){
        this.Deleterow=this.multipleSelection;
        let DAll=this.Deleterow
        for(var as in this.Deleterow){
          this.deleall.push(DAll[as].RecId)
        }
        let DeletAs=JSON.stringify(this.deleall);
        console.log(DeletAs,110);
        this.$axios.post("http://172.16.6.11:10080/BatchDeleteResearch?token=D033EC9751E844B19E775D8309A922B8",DeletAs).then((res) => {
          window.location.reload();
        }, error => {
          console.log(error);
        })
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleDelete(index, row) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.infoList.splice(index, 1);
            this.Deleterow.push(row)
            let para=JSON.stringify([this.Deleterow[index].RecId])
            console.log(para,44);
            this.$axios.post('http://172.16.6.11:10080/BatchDeleteResearch?token=D033EC9751E844B19E775D8309A922B8',para).then((res) => {
              console.log(para,323333);
            }, error => {
              console.log(error);
            })
            this.$message({
              message: "操作成功！",
              type: 'success'
            });
          })
          .catch(_ => {
          });

      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleSelectionChange(val,index) {
        this.multipleSelection = val;
      },
      handleDeteilsSur(ers) {
        console.log(ers,2222);
        //var oba = JSON.stringify(ers);
        this.$axios.get('http://172.16.6.11:10080/GetResearchInfo?FileCode='+ers,
        ).then((res) => {
          //console.log(res.data,222);

          var prasse=res.data

          this.$router.push({path:'/DetailsSurvey',query: {pramadata:prasse}})

        }, error => {
          console.log(error);
        })

      },
      computeArr(whichPageIndex = 0) {
        this.infoList = this.newArr[whichPageIndex];
        console.log(this.infoList, 195, 195);
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.infoList = this.groupedInfoAryAry[currentPage - 1];
        this.state4 = '';
        this.state5='';
        this.state6='';
        this.state7='';
        this.state8='';
        this.state9='';
        this.state10='';
      },
      filterInfo() {

        this.newArr = [];
        let tmpArr = [];
        this.willFilterInfoList.forEach((item, index) => {
          tmpArr.push(item);
          const order = index + 1;
          if (order % this.pageSize === 0 || index === this.willFilterInfoList.length - 1) {
            this.newArr.push(tmpArr);
            tmpArr = [];
          }
        });
        this.groupedInfoAryAry = this.newArr;
        this.infoList = this.newArr[0];
      }
    },
    created() {
      this.$axios.get('http://jsonplaceholder.typicode.com/posts/1/comments').then((res) => {
        this.willFilterInfoList = res.data;
        console.log(this.willFilterInfoList,89213);
        this.total = res.data.length;
        this.filterInfo();
      }, error => {
        console.log(error);
      });
      this.$axios.get('http://jsonplaceholder.typicode.com/comments?postId=1').then((res) => {
        this.dyname=res.data;
        console.log(res.data,28790);
      }, error => {
        console.log(error);
      });
      this.$axios.get('http://jsonplaceholder.typicode.com/comments?postId=1').then((res) => {
        this.schoolSeo = res.data;
        console.log(this.schoolSeo,123);
      }, error => {
        console.log(error);
      });
    },
    watch: {
      state4: function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.willFilterInfoList.filter(item=>{
          console.log(val,9898);
          // return item.ResearchOrganization.toString().includes(val);
          if(item.ResearchOrganization.toString().includes(val)) return true;
          if(item.FileCode.toString().includes(val)) return true;
          if(item.ResponsiblePeople.toString().includes(val)) return true;
          if(item.SchoolName.toString().includes(val)) return true;
          if(item.Status.toString().includes(val)) return true;
          if(item.Title.toString().includes(val)) return true;
        });
      },
      state5:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.infoList.filter(item=>{
          console.log(val,8888);
          return item.email.toString().includes(val);
        });
      },
      state6:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.willFilterInfoList.filter(item=>{
          console.log(arguments);
          return item.ResearchPeople.toString().includes(val);
        });
      },
      state7:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.willFilterInfoList.filter(item=>{
          console.log(arguments);
          return item.Title.toString().includes(val);
        });
      },
      state8:function (val) {

        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.infoList.filter(item=>{
          if(item.Status=='-1'){
            this.schoolStatus='已逾期'
          }else if(item.Status=='0'){
            this.schoolStatus='已关闭'
          }else if(item.Status=='1'){
            this.schoolStatus='已指派'
          }
          return this.schoolStatus.toString().includes(val);
        });
      },
      state9:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };

        this.infoList = this.infoList.filter(item=>{
          return item.name.toString().includes(val);
        });
      },
      state10:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.infoList.filter(item=>{
          return item.email.toString().includes(val);
        });
      },
    },
    // beforeDestroy:function () {
    //   clearInterval(this.timer)
    // }
  };
</script>
<style>
  .el-table th{
    color: #333;
    background: rgb(216, 225, 229);
  }
</style>
