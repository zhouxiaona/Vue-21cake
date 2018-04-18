<template>
    <div class="Kcont">
      <ul>
        <li v-for="(v,k) in dataArtical">
          <a href="###"></a>
          <div class="Ktitle">
            <a href="###">
              <img src="../../../static/img/kk.png" alt="">
              <div class="KtitleInner">
                <h2>21客志</h2>
                <span>{{v.publishTime}}</span>
              </div>
            </a>
          </div>
          <div class="Kmid"></div>
          <div class="Kbtm">
            <div class="Kleft">
              <h3>{{v.title}}</h3>
              <p class="Kexplin"></p>

              <!--点击阅读全文跳转页面到KezhiInfo组件-->
              <router-link tag="span" :to="{path:'./KezhiInfo',query:{articalId:v.articleId}}">阅读全文</router-link>

            </div>
            <div class="Kright">
              <a href="###"><img :src="v.imgDis" alt=""></a>
            </div>
          </div>

        </li>
      </ul>

    </div>
</template>

<script>
    export default {
      name: "kezhi",
      data:function(){
          return{
            dataArtical:""
          }
      },
      mounted:function(){
        this.$http.get("/api/artical").then((res)=>{
          console.log(res);
          this.dataArtical=res.data;
        }).catch((err)=>{
          return console.log(err);
        });
      }
    }
</script>

<style scoped>
  .Kcont{
    width: 1000px;
    margin: 0 auto 168px;
    padding-top: 40px;
  }
  .Kcont ul li{
    margin-top: 40px;
  }
  .Kcont ul li>a{
    display:block;
  }
  .Kcont ul li .Ktitle{
    overflow: hidden;
  }
  .Kcont ul li .Ktitle>a img{
    float: left;
    margin-right: 20px;
  }
  .Kcont ul li .Ktitle>a .KtitleInner h2{
    line-height: 28px;
    font-size: 20px;
    color: #484848;
  }
  .Kcont ul li .Ktitle>a .KtitleInner span{
    line-height: 20px;
    font-size: 14px;
  }
  .Kcont ul li .Kmid{
    width: 0;
    height: 0;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #f5f5f5;
  }
  .Kcont ul li .Kbtm{
    background: #F5F5F5;
    padding: 15px;
    overflow: hidden;
  }
  .Kcont ul li .Kbtm .Kleft{
    background: #fff;
    width: 330px;
    height: 210px;
    padding: 30px;
    float: left;
  }
  .Kcont ul li .Kbtm .Kleft h3{
    line-height: 32px;
    font-size: 24px;
    color: #000;
    margin-top: 40px;
  }
  .Kcont ul li .Kbtm .Kleft .Kexplin{
    line-height: 20px;
    margin: 15px 0;
    color: #707070;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .Kcont ul li .Kbtm .Kleft span{
    display: block;
    font-size: 14px;
    color: #8B572A;
    line-height: 20px;
  }
  .Kcont ul li .Kbtm .Kright{
    display: block;
    float: right;
  }
  .Kcont ul li .Kbtm .Kright img{
    width: 580px;
    height: 270px;
  }
</style>
