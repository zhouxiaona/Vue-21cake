<template>
    <div class="party" @click="noShow">
      <div class="partyBg" style="background-image:url('../../../static/img/bg.jpg');background-position:center center;height:400px;"></div>
      <div class="partyT">
        <h2>
          聚会
          <i></i>
        </h2>
      </div>
      <div class="partyOut">
        <!--商品列表-->
        <ul v-for="(v,k) in goodsDatas">

          <li v-for="(val,key) in v.data">
            <!--&lt;!&ndash;缺货mask&ndash;&gt;-->
            <!--<a href="###" class="Qmask" v-show="val.classifyId==0">-->
              <!--<span>敬请期待</span>-->
            <!--</a>-->
            <!--<a href="###" class="Qphone" v-show="val.classifyId==0">-->
              <!--<i></i>-->
              <!--到货通知-->
            <!--</a>-->

            <div class="Lgoods">
              <a href="javascript:void(0)" class="Lpic">
                <img :src="val.imgDis" alt="zao">
                <h3>{{val.goodsName}}</h3>
                <span>￥{{val.goodsPrice}}/2.0磅</span>
              </a>
              <div class="Lenter">
                <router-link tag="span" :to="{path:'./Party'}">聚会> </router-link>
                <router-link tag="span" :to="{path:'./Party'}">新品> </router-link>
                <router-link tag="span" :to="{path:'./Party'}">人气> </router-link>
              </div>

              <a href="javascript:void(0)" class="LaddCar" @click.stop="showCars(val.goodsId)" v-show="val.classifyId!=0">
                <i></i>
                加入购物车
              </a>
              <!--新品标志logo-->
              <div class="Lcar">
                <!--../../../static/img/new.png-->
                <img :src="val.belongArea==0?'':val.belongArea==1?'../../../static/img/new.png':val.belongArea==2?'../../../static/img/ren.png':'../../../static/img/shi.png'" alt="">
              </div>
            </div>

            <!--购物车动画模块-->
            <transition name="bounce">
              <div v-show="showCar==val.goodsId" class="Lshopcar" @click.stop="no">

                <!--加入购物车模块-->
                <div class="Lshop1" :class="showCar2?'':'none'">
                  <h4>{{val.sizes[val.bangIndex].price}}</h4>
                  <p class="Lcar_title">商品规格</p>
                  <ul>

                    <li v-for="(vs,keys) in val.sizes">
                      <a href="javascript:void(0)" @click.stop="changeBang(k,key,keys)" :class="val.bangIndex==keys?'active':''">
                        {{vs.size}}
                        <i></i>
                      </a>
                    </li>

                  </ul>
                  <div class="Lcar_btn">
                    <!--点击进入购物车页面-->
                    <button class="btn_buy" @click.stop="addSuccess2(val.goodsId,val.sizes[val.bangIndex].size,val.sizes[val.bangIndex].price)">立即购买</button>

                    <!--添加购物车成功模块-->
                    <button class="btn_add" @click.stop="addSuccess(val.goodsId,val.sizes[val.bangIndex].size,val.sizes[val.bangIndex].price)">加入购物车</button>
                  </div>
                </div>

                <!--添加购物车成功后跳出该模块-->
                <div class="Lshop2" :class="showCar2?'none':''">
                  <p>
                    <i></i>
                    成功添加购物车
                  </p>
                  <!--点击进入购物车页面-->
                  <router-link  v-show="showExit"  tag="a" :to="{path:'./shopCar'}">查看购物车</router-link>
                </div>

              </div>
            </transition>

          </li>

        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "party",
      data:function(){
        return{
          //是否显示商品的加入购物车小界面是否会显示，goodsId
          showCar:-1,
          //变化的数据对象数组
          goodsDatas:[],
          //所有的数据大类
          goodsData:[],
          //判断添加购物车成功与否的开关，跳出不同的小界面
          showCar2:true,
          showExit:true
        }
      },
      methods:{
        no:function(){},
        init:function(){
          for(var i=0;i<this.goodsDatas.length;i++){
            for(var j=0;j<this.goodsDatas[i].data.length;j++){
              this.goodsDatas[i].data[j].bangIndex=0;
            }
          }
        },
        noShow:function(){
          this.init();
          this.showCar=-1;
        },
        changeBang:function(k,key,keys){
          this.goodsDatas[k].data[key].bangIndex=keys;
        },
        //向购物车中添加商品
        addSuccess:function(goodsId,size,singlePrice){
          // console.log(goodsId,size,singlePrice);
          var singlePrices=Number(singlePrice.slice(1));

          this.$http.post("/api/addCart",{
            goodsId:goodsId,
            size:size,
            uId:1,
            singlePrice:singlePrices,
            count:1

          }).then((res)=>{
            // console.log(res);
            if(res.data.status==1){
              this.showCar2=false;
              this.showExit=true;
            }
          }).catch((err)=>{
            return console.log(err);
          });

        },
        addSuccess2:function(goodsId,size,singlePrice){
          // console.log(goodsId,size,singlePrice);
          var singlePrices=Number(singlePrice.slice(1));

          this.$http.post("/api/addCart",{
            goodsId:goodsId,
            size:size,
            uId:1,
            singlePrice:singlePrices,
            count:1

          }).then((res)=>{
            // console.log(res);
            if(res.data.status==1){
              this.showCar2=false;
              this.showExit=false;
              setTimeout(()=>{
                this.$router.push({path:"ShopCar"});
              },300);
            }
          }).catch((err)=>{
            return console.log(err);
          });

        },
        showCars:function(ids){
          this.init();
          this.showCar2=true;
          this.showCar=ids;
        }
      },
      mounted:function(){
        this.$http.get("/api/getGoodsList").then((res)=>{
          // console.log(res.data);
          for(var i=0;i<res.data.length;i++){
            for(var j=0;j<res.data[i].data.length;j++){
              res.data[i].data[j].bangIndex=0;
            }
          }
          this.goodsData=res.data;
          this.goodsDatas=[];
          this.goodsDatas.push(this.goodsData[0]);

        }).catch((err)=>{
          return console.log(err);
        });
      }
    }
</script>

<style scoped>
  .party{
    height:100%;
    font-size: 12px;
    min-width:1200px;
    overflow: auto;
  }
  .party .partyT h2{
    font-size: 24px;
    text-align: center;
    margin: 50px 0;
  }
  .party .partyT h2 i{
    display: block;
    width: 28px;
    height: 2px;
    background: #E6C5B8;
    margin: 8px auto 14px;
  }
  .party .partyOut{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .party .partyOut ul{
    overflow: hidden;
  }
  .party ul li{
    float: left;
    padding: 0 18px;
    margin: 0 18px;
    position: relative;
    overflow: hidden;
  }
  .party ul li .Lgoods{
    width: 228px;
    text-align: center;
    height: 364px;
    position: relative;
  }
  .party ul li .Lgoods .Lpic img{
    width: 228px;
    height: 246px;
  }
  .party ul li .Lgoods .Lpic h3{
    font-size: 13px;
    line-height: 20px;
    color:#684029;
  }
  .party ul li .Lgoods .Lpic h3:hover{
    color: #BB9772;
  }
  .party ul li .Lgoods .Lpic span{
    display: block;
    color: #BB9772;
    line-height: 18px;
    margin-top: 5px;
    font-size: 13px;
  }
  .party ul li .Lgoods .Lenter span{
    display: inline-block;
    border: 1px solid #D5BFA7;
    border-radius: 100px;
    padding: 2px 6px 2px 8px;
    color: #D5BFA7;
    margin: 8px 3px;
  }
  .party ul li .Lgoods .LaddCar{
    position: absolute;
    top: 315px;
    display: inline-block;
    width: 107px;
    left: 60px;
    line-height: 28px;
    margin-top: 12px;
    background: none;
    font-size: 13px;
    color:#684029;
  }
  .party ul li .Lgoods .LaddCar i{
    display: inline-block;
    vertical-align: middle;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -216px -40px;
    background-size: 310px 120px;
    height: 28px;
    width: 28px;
    margin-right: 2px;
  }
  .party ul li .Lgoods .LaddCar:hover{
    color: #BB9772;
  }
  .party ul li .Lgoods .LaddCar:hover i{
    background-position: -250px -72px;
    background-size: 310px 120px;
  }
  .party ul li .Lgoods .Lcar{
    text-align: left;
    position: absolute;
    left: 0;
    top: 15px;
    width: 100%;
  }
  .party ul li .Lgoods .Lcar img{
    width: 65px;
    height: 23px;
  }
  .party ul li .Lshopcar{
    position: absolute;
    bottom:0;
    left: 0;
    width: 240px;
    background: #F8F8F8;
    padding: 12px 12px 20px 12px;
    z-index: 20;
  }

  .party ul li .Lshopcar .none{
    display:none;
  }
  /*加入购物车做动画*/
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave{
    animation: bounce-out .5s;
    animation-fill-mode:forwards;
  }
  @keyframes bounce-in{
    0% {
      bottom:-100%;
    }
    100% {
      bottom:0;
    }
  }
  @keyframes bounce-out{
    0% {
      bottom:0;
    }
    100% {
      bottom:-100%;
    }
  }


  .party ul li .Lshopcar .Lshop1 h4{
    font-size: 15px;
    font-weight: bold;
    color: #684029;
    margin-bottom: 14px;
    text-align: left;
  }
  .party ul li .Lshopcar .Lshop1 p{
    text-align: left;
  }
  .party ul li .Lshopcar .Lshop1 ul{
    margin-left: -12px;
    overflow: hidden;
  }
  .party ul li .Lshopcar .Lshop1 ul li{
    float: left;
    width: 50px;
    height: 30px;
    margin-left: 12px;
    text-align: center;
    color: #7A5844;
    margin-bottom: 14px;
    margin-right: 0;
    cursor: pointer;
    padding: 0;
  }

  .party ul li .Lshopcar .Lshop1 ul li a{
    display: block;
    height: 28px;
    border: 1px solid #e7e0dd;
    position: relative;
    line-height: 28px;
  }
  .party ul li .Lshopcar .Lshop1 ul li a:hover{
    color: #BB9772;
  }
  .party ul li .Lshopcar .Lshop1 ul li a i{
    display: block;
    height: 10px;
    width: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }

  /*规格点击时给出相应的类名和价格*/
  .party ul li .Lshopcar .Lshop1 ul li .active{
    border-color: #684029;
  }
  .party ul li .Lshopcar .Lshop1 ul li .active i{
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: 0px -40px;
    background-size: 310px 120px;
  }
  .party ul li .Lshopcar .Lcar_btn{
    height: 30px;
    margin-top: 5px;
    overflow: hidden;
    font-size: 13px;
  }
  .party ul li .Lshopcar .Lcar_btn button{
    height: 30px;
    width: 114px;
    display: block;
    line-height: 30px;
    text-align: center;
  }
  .party ul li .Lshopcar .Lcar_btn .btn_buy{
    color: #7A5844;
    background: #fff;
    float: left;
    height: 28px;
    width: 112px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #684029;
  }
  .party ul li .Lshopcar .Lcar_btn .btn_add{
    color: #fff;
    background: #684029;
    float: right;
  }
  /*跳出加入购物车成功模块*/
  .party ul li .Lshopcar .Lshop2{
    width:240px;
  }
  .party ul li .Lshopcar .Lshop2 p{
    text-align: center;
    font-size: 14px;
    color: #B08C7E;
    line-height: 25px;
    padding: 26px 0 15px;
  }
  .party ul li .Lshopcar .Lshop2 p i{
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -266px -40px;
    background-size: 310px 120px;
    margin-right: 6px;
  }
  .party ul li .Lshopcar .Lshop2 a{
    background: #684029;
    color: #fff;
    font-size: 13px;
    height: 30px;
    width: 148px;
    display: block;
    line-height: 30px;
    text-align: center;
    margin: 2px auto 0;
  }
</style>
