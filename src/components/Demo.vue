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
                                style="width: 565px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="截止时间" required style="display: inline-block;margin-left: 135px">
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


          <el-form v-for="(selectedSchoolObj, index) in selectedSchoolObjAry" :key="index">
            <template slot-scope="scope">
              <el-form-item label="学校名称" style="display: inline-block">
                <el-select @change="selectSchool(selectedSchoolObj.id, index)" v-model="selectedSchoolObj.id"
                           value-key="UnitId"
                           placeholder="请选择学校" style="width: 400px">
                  <el-option v-for="(selectedSchoolFromApiObj, i) in schoolObjAry" :key="i"
                             :label="selectedSchoolFromApiObj.id"
                             v-model="selectedSchoolFromApiObj.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学校负责人" style="display: inline-block;margin-left: 135px">
                <el-input :value="selectedSchoolObj.email" readonly style="width: 400px;"></el-input>
              </el-form-item>
              <el-button @click="deleteRow(selectedSchoolObj)">删除</el-button>
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
      const defaultSchoolObj = {
        "postId": null,
        "id": null,
        "name": null,
        "email": null,
        "body": null,
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
            Teacher: []
          },

      };
    },
    methods: {
      deleteRow(esa){
        this.selectedSchoolObjAry.splice(esa,1)
      },
      creactSchool() {
        this.selectedSchoolObjAry.push({...this.defaultSchoolObj});
      },
      selectSchool(theOneId, indexInSelectedSchoolObjAry) {
        const [selectedSchoolFormApiObj] = this.schoolObjAry.filter(item => {
          return item.id == theOneId;
        });
        //循环遍历匹配上的对象中的属性赋值给已被监听的对象，如果直接赋值为该对象，vue不会更新数据
        for(let key in selectedSchoolFormApiObj){
          if(selectedSchoolFormApiObj.hasOwnProperty(key)){
            this.selectedSchoolObjAry[indexInSelectedSchoolObjAry][key] =  selectedSchoolFormApiObj[key];
          }
          if(this.school.SchoolName.indexOf(selectedSchoolFormApiObj.id) == -1){
            this.school.SchoolName.push(selectedSchoolFormApiObj.id)
          }
          if(this.school.Teacher.indexOf(selectedSchoolFormApiObj.email) == -1){
            this.school.Teacher.push(selectedSchoolFormApiObj.email)
          }
        }
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
        this.$axios.post('http://jsonplaceholder.typicode.com/posts',
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
      }
    },
    mounted() {
      this.$axios.get('http://172.16.6.11:10080/GetUserList?token=A2D4B1BD5BCD43E4BFFAD9C8BE76743C').then((res) => {
        this.tableData = res.data;
        this.tableDatas = res.data;
      }, error => {
        console.log(error);
      });
      this.$axios.get('http://jsonplaceholder.typicode.com/comments?postId=1').then((res) => {
        this.schoolObjAry = res.data;
        console.log(res.data);
      }, error => {
        console.log(error);
      })
    },

  }
</script>

<style scoped>
</style>
