<template>
  <div class="hello">
    <el-container>
      <el-header>
        <div class="Complaint">
          <span
            style="width:4px;height:16px;background:#8eddf2;display:inline-block;margin-right:10px;margin-left:16px;"></span>
          <span style="color: #333">投诉管理</span>
          <span>我的代办(<span style="color:darkturquoise">11</span>)</span>
        </div>
        <div>
          <el-button style="margin:10px 0 0 15px" @click="handleDelete">批量删除</el-button>
          <div style="float: right">

            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>

            <el-popover ref="popover4"
                        placement="bottom"
                        width="1200"
                        trigger="click">
              <el-form  label-width="80px">
                <el-form-item  label="调研主题" style="display: inline-block">
                  <el-input style="width: 300px" v-model="state7"></el-input>
                </el-form-item>
                <el-form-item label="学校名称" prop="region" style="display: inline-block;">
                  <el-select v-model="schooltitle" value-key="RecId" placeholder="请选择活动区域" style="width: 300px" >
                    <el-option v-for="(val,index) in willFilterInfoList" :label="val.SchoolName" :value="val" :key="index" >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="负责人" style="display: inline-block">
                  <el-input style="width: 300px" v-model="state5"></el-input>
                </el-form-item>
                <el-form-item label="调研单位" prop="region" style="display: inline-block;">
                  <el-select v-model="schoolpeo" value-key="RecId" placeholder="请选择活动区域" style="width: 300px" >
                    <el-option v-for="(val,index) in willFilterInfoList" :label="val.ResearchOrganization" :value="val" :key="index" >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="调研人" style="display: inline-block;margin-left: 28px">
                  <el-input style="width: 300px" v-model="state6"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="region" style="display: inline-block;">
                  <el-select v-model="schooltitle" value-key="RecId" placeholder="请选择活动区域" style="width: 300px;margin-left: 23px" >
                    <el-option v-for="(val,index) in willFilterInfoList" :label="val.status" :value="val" :key="index" >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-popover>
            <el-button v-popover:popover4>更多条件</el-button>
            <el-button type="info">刷新</el-button>
            <router-link to="/NewSurvey">
              <el-button type="success" style="margin-left: 0">新建调研</el-button>
            </router-link>
          </div>
        </div>

      </el-header>

      <el-main>

        <el-table

          :data="infoList"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="调研单号"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.FileCode}}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="调研主题"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.Title }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="学校名称"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.SchoolName}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="负责人"
            width="RecId">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.ResponsiblePeople }}
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
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.ResearchOrganization }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="调研人"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.ResearchPeople }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="Title"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="border: 0"
                @click="handleDelete(scope.$index, scope.row)">
                <img src="../assets/icon/user.png" alt="">
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
        ruleForm:{
          region:""
        },
        addform:{
          name:''
        },
        schooltitle:[],
        schoolpeo:[],
        total: 0,
        currentPage: 1,
        newArr: [],
        infoList: [],
        willFilterInfoList: [],
        // movieInfoList: [],
        pageSize: 3,
        restaurants: [],
        state4: '',
        state5:'',
        state6:'',
        state7:'',
        _that: {},
        timeout: null,
        DataList: [],
        results: [],
        groupedInfoAryAry: [],
        goodcode:[],
        tableData3: [],
        multipleSelection: [],
        obd:{FileCode:1}
      };
    },
    methods: {
      handleDelete(index, row) {
        this.infoList.splice(index, 1);
        let para = this.goodcode
        var objet=JSON.stringify(para);
        this.$axios.post("http://172.16.6.11:10080/BatchDeleteResearch?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C",objet).then((res) => {

        }, error => {
          console.log(error);
        })
        this.$message({
          message: "操作成功！",
          type: 'success'
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDeteilsSur() {
        var oba = JSON.stringify(this.obd);
        this.$axios.post("http://172.16.6.11:10080/GetResearchInfo?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C",{
          oba
        }).then((res) => {
          console.log(res.data);
          this.$router.push('/DetailsSurvey')
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
      this.$axios.get("http://172.16.6.11:10080/GetResearchIndex?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C").then((res) => {
      // this.$axios.get("http://jsonplaceholder.typicode.com/posts?userId=1").then((res) => {
        this.willFilterInfoList = res.data;
        console.log(res.data);
        // this.willFilterInfoList = [...res.data, ...res.data];
        this.total = res.data.length;
        console.log(this.willFilterInfoList);
        // this.total = this.willFilterInfoList.length;
        this.filterInfo();
      }, error => {
        console.log(error);
      })
    },
    watch: {
      state4: function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.willFilterInfoList.filter(item=>{
          console.log(arguments);
          // return item.ResearchOrganization.toString().includes(val);
          if(item.ResearchOrganization.toString().includes(val)) return true;
          if(item.FileCode.toString().includes(val)) return true;
          if(item.ResponsiblePeople.toString().includes(val)) return true;
          if(item.SchoolName.toString().includes(val)) return true;
          if(item.Status.toString().includes(val)) return true;
          if(item.Title.toString().includes(val)) return true;
          if(item.Title.toString().includes(val)) return true;
        });
      },
      state5:function (val) {
        if(val === ''){
          return this.infoList = this.groupedInfoAryAry[this.currentPage - 1];
        };
        this.infoList = this.willFilterInfoList.filter(item=>{
          console.log(arguments);
          return item.ResponsiblePeople.toString().includes(val);
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
    },
    // beforeDestroy:function () {
    //   clearInterval(this.timer)
    // }
  };
</script>
<style scoped>
  .step04 {
    background: url("../assets/icon/user.png") no-repeat
  }
</style>
