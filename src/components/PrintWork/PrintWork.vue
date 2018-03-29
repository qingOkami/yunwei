<template>
  <div>
      <span><img src="../../assets/images/Title.png" alt=""></span>
      <h2 class="DataCarouseh"><child v-bind:my-message="PrintNav.title"></child></h2>
      <div class="DataCarousebox">
        <p class="CarouseBoxP">
            <span class="CarouseBoxspan">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<child v-bind:my-message="PrintNav.content"></child>
          </span>
        </p>

        <p class="CarouseBoxTwo">
          <span class="CarouseFont">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;兹介绍 <child v-bind:my-message="PrintNav.responsiblePeople"></child>  同志对贵单位安防监控系统进行勘察，望贵单位予以积极配合。
          </span>
        </p>
        <p class="CarouseBoxTwo">
  <span class="CarouseFont">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本次现场调研时间：<child v-bind:my-message="PrintNav.startDateTime"></child> &nbsp;至 &nbsp;<child v-bind:my-message="PrintNav.endDateTime"></child>，在此期间，如有调研人员前来与贵单位联系，请贵单位予以接洽。
  </span>
        </p>
        <p class="CarouseBoxTwo">
            <span class="CarouseFont">
              信息中心联系人：<child v-bind:my-message="PrintNav.centerContact"></child>
            </span>
        </p>

        <p>
            <span class="CarouseFont">
              联系电话：<child v-bind:my-message="PrintNav.phoneNumber"></child>
            </span>
        </p>

        <div class="CarouseRig">
          <p>
            <img class="CarouseImg" :src="imgSrc" alt="">
          </p>
          <p><span>北京市朝阳区现代教育信息网络中心</span></p>
          <p class="CarousePmar"><child v-bind:my-message="dates"></child></p>
        </div>
        <h3 class="CarousePage"></h3>
      </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            PrintNav:{},
dates:'',
            imgSrc:"http://qr.liantu.com/api.php?text=http://172.16.6.11:10080/iitsp/research.jsp?fileCode="
          }
        },
      methods:{
        logTimeChange(date) {
          //打印页的时间格式
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          this.dates = y + '年' + m + '月' + d + '日';
        },
        ins: function () {
          this.invs = setTimeout(() => {
            this.$router.push('/')
          }, 10000000)
        },
      },
      components:{
          //此方式是因为无法直接向vue某些特定结构传值，只能通过child的方式传递数据
        child: {
          props: ['myMessage'],
          template: '<span>{{myMessage}}</span>'
        }
      },
      mounted:function () {
          //二维码的路径
        this.PrintNav=this.$route.query.Prints
        this.PrintNav.startDateTime=this.PrintNav.startDateTime.replace(".0","")
        this.PrintNav.endDateTime=this.PrintNav.endDateTime.replace(".0","")
        console.log(this.PrintNav.serverIP.replace("http://",""));
        let urlTemp = this.PrintNav.serverIP.replace("http://","");
        let imageS="http://qr.liantu.com/api.php?text=http://"+urlTemp+"/iitsp/research.jsp?fileCode="
        this.imgSrc=imageS+this.PrintNav.fileCode
        console.log("er wei ma code is:" + this.imgSrc)
        var myDate = new Date()
        this.dates=myDate
        this.logTimeChange(myDate)
        this.ins()
      }
    }
</script>

<style scoped>
  .CarouseImg{
    width: 120px;height: 120px;
    margin-right:60px;
  }
  .DataCarouseh{
    text-align: center
  }
  .DataCarousebox{
    padding: 0 60px
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
  .CarousePmar{
    margin-right: 50px
  }
  .CarouseRig{
    text-align: right
  }
</style>
