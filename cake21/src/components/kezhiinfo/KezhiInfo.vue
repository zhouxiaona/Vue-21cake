<template>
  <div class="Kinfo">
    <h2>{{articalInfo.title}}</h2>
    <p>发布时间：{{articalInfo.publishTime}}</p>
    <div class="Kcontent">
      <span v-for="(v,k) in articalInfo.images">
        <img :src="v" alt="">
      </span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "kezhi-info",
      data:function(){
        return {
          articalInfo:""
        }
      },
      props:['articalId'],
      mounted:function(){
        this.$http.get("/api/artical").then((res)=>{
          console.log(this.$route.query.articalId);
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].articleId==this.$route.query.articalId){
              this.articalInfo=res.data[i];
            }
          }
        }).catch((err)=>{
          return console.log(err);
        });
      }
    }
</script>

<style scoped>
  .Kinfo{
    width:1200px;
    margin:0 auto;
  }
  .Kinfo h2{
    padding: 15px 15px 0;
    background: #fff;
    font-size: 24px;
    line-height: 34px;
  }
  .Kinfo p{
    font-size: 12px;
    background: #fff;
    padding-bottom: 10px;
    padding-left:15px;
    color: #8c8c8c;
    border-bottom: 1px #eee solid;
  }
  .Kinfo .Kcontent{
    min-height: 311px;
    background: #fff;
    padding: 15px;
  }
  .Kinfo .Kcontent img{
    max-width: 100% !important;
    display: block;
  }
</style>
