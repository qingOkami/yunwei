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
          <el-button style="margin:10px 0 0 15px">批量删除</el-button>
          <div style="float: right">

            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>

            <el-select v-model="value" placeholder="更多条件" style="width: 100px;">

              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              style="height: 100%;width: 1501px;"
              >
                <el-form :model="addform">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="addform.name"></el-input>
                  </el-form-item>
                </el-form>
              </el-option>
            </el-select>

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
                {{scope.row.FileCode }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="调研主题"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.ResearchOrganization }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="学校名称"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.RecId}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="负责人"
            width="RecId">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="color: #606266" @click="handleDeteilsSur()">
                {{scope.row.id }}
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
                {{scope.row.FileCode }}
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
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="border: 0"
                @click="handleDelete(scope.$index, scope.row)">
                <img src="../assets/icon/dfp.png" alt="">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
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
        addform:{
          name:''
        },
        total: 0,
        currentPage: 1,
        newArr: [],
        infoList: [],
        willFilterInfoList: [],
        // movieInfoList: [],
        pageSize: 3,
        restaurants: [],
        state4: '',
        _that: {},
        timeout: null,
        DataList: [],
        results: [],
        groupedInfoAryAry: [],
        goodcode:[],
        options: [
          {
            name:'',
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        tableData3: [],
        multipleSelection: [],
        value: '',
      };
    },
    methods: {
      handleDelete(index, row) {
        this.infoList.splice(index, 1);
        // let para = Object.assign({}, this.goodcode)
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
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDeteilsSur() {
        this.$router.push('/DetailsSurvey')
      },
      computeArr(whichPageIndex = 0) {
        this.infoList = this.newArr[whichPageIndex];
        console.log(this.infoList, 195, 195);
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.infoList = this.groupedInfoAryAry[currentPage - 1];
        this.state4 = '';
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
        // this.willFilterInfoList = [...res.data, ...res.data];
        this.total = res.data.length;
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

          return item.ResearchOrganization.toString().includes(val);
          //if(item.title.toString().includes(val)) return true;
          //if(item.body.toString().includes(val)) return true;
        });
      }
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
