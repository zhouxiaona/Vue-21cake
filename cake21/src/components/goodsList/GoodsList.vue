<template>

    <div class="listCon" @click="noShow">
      <!--按钮区域-->
      <div class="listC">
        <div class="listT">
        <dl class="cat_list">
          <dt>分类：</dt>
          <dd @click="passData(-1)" :class="classBtn==-1?'active':''">
            <span>全部分类</span>
          </dd>
          <dd @click="passData(1)" :class="classBtn==1?'active':''">
            <span>蛋糕</span>
          </dd>
          <dd @click="passData(2)" :class="classBtn==2?'active':''">
            <span>冰淇淋</span>
          </dd>
          <dd @click="passData(3)" :class="classBtn==3?'active':''">
            <span>小切块</span>
          </dd>
          <dd @click="passData(4)" :class="classBtn==4?'active':''">
            <span>咖啡</span>
          </dd>
          <dd @click="passData(5)" :class="classBtn==5?'active':''">
            <span>常温蛋糕</span>
          </dd>
          <dd @click="passData(6)" :class="classBtn==6?'active':''">
            <span>设计师礼品</span>
          </dd>
        </dl>
        <dl class="tag_list">
          <dt>口味：</dt>
          <dd class="active">
            <span>全部口味</span>
          </dd>
          <dd>
            <span>乳脂奶油</span>
          </dd>
          <dd>
            <span>慕斯</span>
          </dd>
          <dd>
            <span>乳酪</span>
          </dd>
          <dd>
            <span>巧克力</span>
          </dd>
          <dd>
            <span>坚果</span>
          </dd>
          <dd>
            <span>水果</span>
          </dd>
          <dd>
            <span>含酒</span>
          </dd>
          <dd>
            <span>咖啡</span>
          </dd>
          <dd>
            <span>冰淇淋</span>
          </dd>
        </dl>
      </div>
      </div>

      <!--商品区域-->
      <div class="listIns" v-for="(v,k) in goodsDatas">
        <!--商品标题区域-->
        <div v-show="isShow" class="listConT">
          <h2>
           {{v.classifyName}}
            <span>{{v.classifyDescript}}</span>
          </h2>
        </div>

        <!--商品列表-->
        <ul>

          <li v-for="(val,key) in v.data">
            <!--缺货mask-->
            <a href="javascript:void(0)" class="Qmask" v-show="val.classifyId==0">
              <span>敬请期待</span>
            </a>
            <a href="javascript:void(0)" class="Qphone" v-show="val.classifyId==0">
              <i></i>
              到货通知
            </a>

            <div class="Lgoods">
              <a href="javascript:void(0)" class="Lpic">
                <!--点击向详情页传送参数goodsId-->
                <img :src="val.imgDis" alt="zao">
                <h3>{{val.goodsName}}</h3>
                <span>{{val.goodsPrice}}.00/{{val.sizes[val.bangIndex].size}}</span>

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
                  <!--磅的种类选择-->
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
                  <router-link  v-show="showExit" tag="a" :to="{path:'./shopCar'}">查看购物车</router-link>
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
      name: "goods-list",
      data:function(){
        return{
          //是否显示商品的加入购物车小界面是否会显示，goodsId
          showCar:-1,
          //是否显示商品种类大标题
          isShow:false,
          //默认选中的大类id
          classBtn:1,
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
        init:function(){
          for(var i=0;i<this.goodsDatas.length;i++){
            for(var j=0;j<this.goodsDatas[i].data.length;j++){
              this.goodsDatas[i].data[j].bangIndex=0;
            }
          }
        },
        no:function(){},
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
        },
        passData:function(index){
          this.classBtn=index;

          if(index==-1){
            this.goodsDatas=this.goodsData;
            this.isShow=true;
          }else{
            for(var i=0;i<this.goodsData.length;i++){
              if(index==this.goodsData[i].classifyId){
                this.goodsDatas=[];
                this.goodsDatas.push(this.goodsData[i]);
                this.isShow=false;
                return;
              }
            }
          }
        }
      },
      mounted:function(){
        this.$http.get("/api/getGoodsList").then((res)=>{
          for(var i=0;i<res.data.length;i++){
            for(var j=0;j<res.data[i].data.length;j++){
                res.data[i].data[j].bangIndex=0;
            }
          }
          // console.log(res.data);
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
  .listCon{
    width:1200px;
    margin:0 auto;
    padding-bottom: 50px;
    font-size: 12px;
    text-align: center;
  }
  /*按钮样式*/
  .listC{
    width:1200px;
    padding-bottom: 20px;
    font-size: 12px;
  }
  .listIns{
    width:1200px;
    padding-bottom: 20px;
    font-size: 12px;
  }
  .listC .listT{
    font-size: 13px;
    margin-top: 25px;
    margin-bottom: 35px;
    width: 1200px;
    border-top: #f2f2f2 solid 1px;
    border-bottom: #f2f2f2 solid 1px;
    overflow: hidden;
    padding: 8px 0;
  }
  .listC .listT dl{
    line-height: 50px;
    overflow: hidden;
    height: 50px;
  }
  .listC .listT dl dt{
    color: #9B9B9B;
    margin-right: 38px;
  }
  .listC .listT dl dt,.listC .listT dl dd{
    float:left;
    margin:0 13px;
  }
  .listC .listT dl dd a{
    color: #684029;
  }

  /*特殊按钮的颜色*/
  .listCon .listT dl dd span:hover{
    color: #BB9772;
  }
  /*选中状态的按钮颜色*/
  .listCon .listT dl .active span{
    color: #BB9772;
  }
  /*无货状态的按钮颜色*/
  .listCon .listT dl .disabled span{
    color: #BBBBBB;
  }


  .listCon .listIns{
    margin:25px 0 35px;
  }
  .listCon .listConT{
    margin:30px 0;
  }
  .listCon .listConT h2{
    padding: 0 15px;
    display: inline-block;
    text-align: left;
    color:#684029;
    border-left: 2px solid #684029;
    font-size: 20px;
    line-height: 20px;
  }
  .listCon .listConT h2 span{
    line-height: 20px;
    display: block;
    font-size: 12px;
  }
  .listCon ul{
    overflow: hidden;
    margin-top: 26px;
  }
  .listCon ul li{
    float: left;
    padding: 0 18px;
    margin: 0 18px;
    position: relative;
    overflow: hidden;
  }
  .listCon ul li .Qmask{
    background: rgba(255,255,255,0.65);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:1;
  }
  .listCon ul li .Qmask span{
    top: 112px;
    font-size: 14px;
    display: block;
    text-align: center;
    line-height: 20px;
    position: absolute;
    left: 0;
    width: 100%;
    z-index:1;
  }
  .listCon ul li .Qphone{
    position: absolute;
    left:0;
    right:0;
    margin:0 auto;
    bottom:0;
    z-index:3;
  }
  .listCon ul li .Qphone i{
    display: inline-block;
    height: 22px;
    width: 15px;
    background: url("../../../static/img/icon.png ") no-repeat;
    background-position: -246px -44px;
    background-size: 310px 120px;
    vertical-align: middle;
    margin-right: 4px;
  }

  .listCon ul li .Lgoods{
    width: 228px;
    text-align: center;
    height: 364px;
    position: relative;
  }
  .listCon ul li .Lgoods .Lpic img{
    width: 228px;
    height: 246px;
  }
  .listCon ul li .Lgoods .Lpic h3{
    font-size: 13px;
    line-height: 20px;
    color:#684029;
    overflow:hidden;
    word-break:keep-all;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .listCon ul li .Lgoods .Lpic h3:hover{
    color: #BB9772;
  }
  .listCon ul li .Lgoods .Lpic span{
    display: block;
    color: #BB9772;
    line-height: 18px;
    margin-top: 5px;
    font-size: 13px;
  }
  .listCon ul li .Lgoods .Lenter span{
    display: inline-block;
    border: 1px solid #D5BFA7;
    border-radius: 100px;
    padding: 2px 6px 2px 8px;
    color: #D5BFA7;
    margin: 8px 3px;
  }
  .listCon ul li .Lgoods .LaddCar{
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
  .listCon ul li .Lgoods .LaddCar i{
    display: inline-block;
    vertical-align: middle;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -216px -40px;
    background-size: 310px 120px;
    height: 28px;
    width: 28px;
    margin-right: 2px;
  }
  .listCon ul li .Lgoods .LaddCar:hover{
    color: #BB9772;
  }
  .listCon ul li .Lgoods .LaddCar:hover i{
    background-position: -250px -72px;
    background-size: 310px 120px;
  }
  .listCon ul li .Lgoods .Lcar{
    text-align: left;
    position: absolute;
    left: 0;
    top: 15px;
    width: 100%;
  }
  .listCon ul li .Lgoods .Lcar img{
    width: 65px;
    height: 23px;
  }

  /*加入购物车动画*/
  .listCon ul li .Lshopcar{
    position: absolute;
    /*做动画改变bottom值*/
    bottom:0;

    left: 0;
    width: 240px;
    background: #F8F8F8;
    padding: 12px 12px 20px 12px;
    z-index: 2;
  }
  .listCon ul li .Lshopcar .none{
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


  .listCon ul li .Lshopcar .Lshop1 h4{
    font-size: 15px;
    font-weight: bold;
    color: #684029;
    margin-bottom: 14px;
    text-align: left;
  }
  .listCon ul li .Lshopcar .Lshop1 p{
    text-align: left;
  }
  .listCon ul li .Lshopcar .Lshop1 ul{
    margin-left: -12px;
    overflow: hidden;
  }
  .listCon ul li .Lshopcar .Lshop1 ul li{
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

  .listCon ul li .Lshopcar .Lshop1 ul li a{
    display: block;
    height: 28px;
    border: 1px solid #e7e0dd;
    position: relative;
    line-height: 28px;
  }
  .listCon ul li .Lshopcar .Lshop1 ul li a:hover{
    color: #BB9772;
  }
  .listCon ul li .Lshopcar .Lshop1 ul li a i{
    display: block;
    height: 10px;
    width: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }

  /*规格点击时给出相应的类名和价格*/
  .listCon ul li .Lshopcar .Lshop1 ul li .active{
    border-color: #684029;
  }
  .listCon ul li .Lshopcar .Lshop1 ul li .active i{
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: 0px -40px;
    background-size: 310px 120px;
  }

  .listCon ul li .Lshopcar .Lshop1 .Lcar_btn{
    height: 30px;
    margin-top: 5px;
    overflow: hidden;
    font-size: 13px;
  }
  .listCon ul li .Lshopcar .Lshop1 .Lcar_btn button{
    height: 30px;
    width: 114px;
    display: block;
    line-height: 30px;
    text-align: center;
  }
  .listCon ul li .Lshopcar .Lshop1 .Lcar_btn .btn_buy{
    color: #7A5844;
    background: #fff;
    float: left;
    height: 28px;
    width: 112px;
    line-height: 28px;
    border: 1px solid #684029;
  }
  .listCon ul li .Lshopcar .Lshop1 .Lcar_btn .btn_add{
    color: #fff;
    background: #684029;
    float: right;
  }

  /*跳出加入购物车成功模块*/
  .listCon ul li .Lshopcar .Lshop2{
    width:240px;
  }
  .listCon ul li .Lshopcar .Lshop2 p{
    text-align: center;
    font-size: 14px;
    color: #B08C7E;
    line-height: 25px;
    padding: 26px 0 15px;
  }
  .listCon ul li .Lshopcar .Lshop2 p i{
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -266px -40px;
    background-size: 310px 120px;
    margin-right: 6px;
  }
  .listCon ul li .Lshopcar .Lshop2 a{
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
