<template>
    <div class="Scar" @click="noShow">
      <div class="Sgoods">
        <ul>
          <li>商品</li>
          <li>生日牌</li>
          <li>单价</li>
          <li>数量</li>
          <li>金额</li>
        </ul>
        <div class="SgoodsL">

          <div class="tables">

            <div class="goodsTr" v-for="(v,k) in goodsData">

              <div class="normal" v-show="v.groupCount==0">
                <div class="td1 td">
                  <a href="javascript:void(0)">
                    <img :src="v.imgDis" alt="">
                  </a>
                </div>
                <div class="td2 td">
                  <h4><a href="javascript:void(0)">{{v.goodsName}}</a></h4>
                  <span class="Csp1">
                        规格
                        <span>{{v.size}}</span>
                      </span>
                  <span class="Csp2" v-show="!isNaN(v.give)">
                        <i></i>
                        赠送
                        <ins>&nbsp;{{v.give}}&nbsp;</ins>
                        套餐具
                      </span>
                </div>
                <div class="td3 td">
                  <div v-show="!isNaN(v.give)">
                    <div class="Sbirth" @click.stop="v.birth.showBirth=!v.birth.showBirth">
                      {{v.birth.default}}
                      <i></i>
                    </div>
                    <ul v-show="v.birth.showBirth">
                      <li v-for="(val,key) in v.birth.list" @click.stop="changeDefault(k,key)">{{val}}</li>

                      <li @click.stop="v.birth.diyShow=true" v-show="!v.birth.diyShow">自定义</li>
                      <li class="Sli" v-show="v.birth.diyShow">
                        <input type="text" placeholder="可输入8个汉字或16个字符" class="Sinp1" v-model="v.birth.inp1" @click.stop="">
                        <input type="button" value="确定" class="Sinp2" @click.stop="sureDefault(k)">
                      </li>

                    </ul>
                  </div>
                </div>
                <div class="td4 td">￥{{v.singlePrice}}.00</div>
                <div class="td5 td">
                  <div>
                    <input type="button" class="minus" :class="v.count==1?'minusDis':''" @click="minusFn(v.goodsId,v.size,v.singlePrice)">
                    <input type="text" :value="v.count" class="Scount">
                    <input type="button" class="plus" @click="plusFn(v.goodsId,v.size,v.singlePrice)">
                  </div>
                </div>
                <div class="td6 td">￥{{v.singlePrice*v.count}}</div>
                <div class="Sdel td">
                  <a href="javascript:void(0)"><i @click="delGoods(k)"></i></a>
                </div>
              </div>

              <div class="mark_up clearfix" v-show="v.groupCount!=0">
                <div class="mark_left">
                  <div class="mark_title">组合套餐</div>

                  <div class="mark_goods">
                    <div class="td1 td">
                      <a href="javascript:void(0)">
                        <img :src="v.imgDis" alt="">
                      </a>
                    </div>
                    <div class="td2 td">
                      <h4><a href="javascript:void(0)">{{v.goodsName}}</a></h4>
                      <span class="Csp1">
                        规格
                        <span>{{v.size}}</span>
                      </span>
                      <span class="Csp2" v-show="!isNaN(v.give)">
                        <i></i>
                        赠送
                        <ins>&nbsp;{{v.give}}&nbsp;</ins>
                        套餐具
                      </span>
                    </div>
                    <div class="td3 td">
                      <div v-show="!isNaN(v.give)">
                        <div class="Sbirth" @click.stop="v.birth.showBirth=!v.birth.showBirth">
                          {{v.birth.default}}
                          <i></i>
                        </div>
                        <ul v-show="v.birth.showBirth">
                          <li v-for="(val,key) in v.birth.list" @click.stop="changeDefault(k,key)">{{val}}</li>

                          <li @click.stop="v.birth.diyShow=true" v-show="!v.birth.diyShow">自定义</li>
                          <li class="Sli" v-show="v.birth.diyShow">
                            <input type="text" placeholder="可输入8个汉字或16个字符" class="Sinp1" v-model="v.birth.inp1" @click.stop="">
                            <input type="button" value="确定" class="Sinp2" @click.stop="sureDefault(k)">
                          </li>

                        </ul>
                      </div>
                    </div>
                    <div class="td4 td">￥{{v.singlePrice}}.00</div>
                    <div class="td5 td">
                      <div>
                        <input type="button" class="minus minusDis">
                        <input type="text" :value="v.groupCount" class="Scount">
                        <input type="button" class="plus plusDis">
                      </div>
                    </div>
                    <div class="td6 td">￥{{v.singlePrice*v.groupCount}}</div>
                  </div>

                  <div class="mark_goods">
                    <div class="td1 td">
                      <a href="javascript:void(0)">
                        <img src="../../../static/img/cake.jpg" alt="">
                      </a>
                    </div>
                    <div class="td2 td">
                      <h4><a href="javascript:void(0)">便携冰包-中国红（春节限定）</a></h4>
                      <span class="Csp1">
                        规格
                        <span>份</span>
                      </span>
                      <span class="Csp2">
                        <i></i>
                        赠送
                        <ins>&nbsp;&nbsp;</ins>
                        套餐具
                      </span>
                    </div>
                    <div class="td3 td">

                    </div>
                    <div class="td4 td">￥35.00</div>
                    <div class="td5 td">
                      <div>
                        <input type="button" class="minus minusDis">
                        <input type="text" :value="v.groupCount" class="Scount">
                        <input type="button" class="plus plusDis">
                      </div>
                    </div>
                    <div class="td6 td">￥{{v.groupCount*35}}</div>
                  </div>
                </div>
                <div class="mark_right">
                  <a href="javascript:void(0)"><i @click="delGoods(k)"></i></a>
                </div>
              </div>

            </div>

            <!--商品配件-->
            <div class="SlastTr">
                <ul>

                  <li v-for="(vv,kk) in smallGoods">
                    <img :src="vv.imgDis" alt="">
                    <div class="Sright">
                      <h5>
                        {{vv.goodsName}}
                      </h5>
                      <span>￥{{vv.goodsPrice}}/{{vv.size}}</span>
                      <a href="javascript:void(0)"><i @click="addSuccess(vv.goodsId,vv.size,vv.goodsPrice)"></i></a>
                    </div>
                  </li>

                </ul>
            </div>
          </div>

        </div>
      </div>

      <!--总价计算-->
      <div class="Ssum">
        <a href="javascript:void(0)">
          <i></i>
          全部清空
        </a>
        <ul>
          <li>商品金额：￥{{totalPrice}}.00</li>
          <li>配送费：￥{{totalPrice>=100?0:12}}.00</li>
          <li>活动优惠：￥0.00</li>
        </ul>
        <div class="totalMoney">
          <span>
            合计：￥
            <span>{{totalPrice}}.00</span>
          </span>
        </div>
        <span class="infos">{{totalPrice>=100?'订单已满￥100元，享免费配送服务':'满¥ 100免配送费，还差¥'+(100-totalPrice)+','}}<a href="javascript:void(0)" v-show="totalPrice<100">  去加购 >></a></span>
        <div class="payBtn">
          <a href="javascript:void(0)">去结算</a>
        </div>
      </div>
      <!--商品推荐-->
      <div class="recom">
        <h2>商品推荐</h2>
        <ul>
          <li v-for="(vval,kkey) in recommend">
            <a href="javascript:void(0)"><img :src="vval.imgDis" alt=""></a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "shop-car",
      data:function(){
        return{
          goodsData:"",
          smallGoods:"",
          recommend:""
        }
      },
      computed:{
        totalPrice:function(){
          var num=0;
          for(var i=0;i<this.goodsData.length;i++){
            num+=this.goodsData[i].singlePrice*this.goodsData[i].count+35*this.goodsData[i].groupCount;
          }
          return num;
        }
      },
      methods:{
        noShow:function(){
          this.init();
        },
        init:function(){
          for(var i=0;i<this.goodsData.length;i++){
            this.goodsData[i].birth.showBirth=false;
          }
        },
        delGoods:function(k){
          var ids=this.goodsData[k].shoppingId;
          this.$http.post("/api/deleteCart",{id:ids}).then((res)=>{
            if(res.data.status==1){
              this.goodsData.splice(k,1);
            }
          }).catch((err)=>{
            return console.log(err);
          });

        },
        sureDefault:function(k){
          this.goodsData[k].birth.default=this.goodsData[k].birth.inp1;
          this.goodsData[k].birth.showBirth=false;
          this.goodsData[k].birth.inp1="";
        },
        changeDefault:function(k,key){
          this.goodsData[k].birth.default=this.goodsData[k].birth.list[key];
          this.goodsData[k].birth.showBirth=false;
        },
        minusFn:function(gId,size,singlePrice){
          console.log(gId,size,singlePrice);
          for(var i=0;i<this.goodsData.length;i++){
            if(this.goodsData[i].goodsId==gId && this.goodsData[i].size==size){
                this.goodsData[i].count--;
                if(this.goodsData[i].count<=1){
                  this.goodsData[i].count=1;
                }
                return;
            }
          }
        },
        plusFn:function(gId,size,singlePrice){
          console.log(gId,size,singlePrice);

          this.$http.post("/api/addCart",{
            goodsId:gId,
            size:size,
            uId:1,
            singlePrice:singlePrice,
            count:+1

          }).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            return console.log(err);
          });

          for(var i=0;i<this.goodsData.length;i++){
            if(this.goodsData[i].goodsId==gId && this.goodsData[i].size==size){
              this.goodsData[i].count++;
              return;
            }
          }

        },
        addSuccess:function(goodsId,size,goodsPrice){
          console.log(goodsId,size,goodsPrice);
          this.$http.post("/api/addCart",{
            goodsId:goodsId,
            size:size,
            uId:1,
            singlePrice:goodsPrice,
            count:1

          }).then((res)=>{
            console.log("添加成功");
            if(res.data.status==1){
              var infos=res.data.info;
              this.$http.get("/api/getShoppingCart").then((res)=>{
                console.log("匹配成功");
               for(var i=0;i<res.data.data.length;i++){
                 if(res.data.data[i].goodsId==goodsId){
                   var obj={
                     shoppingId: res.data.data[i].shoppingId,
                     goodsId: goodsId,
                     uId: 1,
                     count:this.goodsData[i].count,
                     singlePrice: goodsPrice,
                     size: size,
                     groupCount: res.data.data[i].groupCount,
                     goodsName: res.data.data[i].goodsName,
                     imgDis: res.data.data[i].imgDis,
                     birth:{inp1:"",diyShow:false,showBirth:false,default:"选择生日牌",list:["情人节快乐","新年快乐","Happy new year","生日快乐","Happy Birthday","节日快乐"]},
                     give:parseInt(size)*5
                   };

                   if(infos=="更新成功"){
                     this.goodsData.splice(i,1,obj);
                   }else{
                     this.goodsData.push(obj);
                   }
                   return;

                 }
               }

              }).catch((err)=>{
                return console.log(err);
              });

            }
          }).catch((err)=>{
            return console.log(err);
          });
        }
      },
      mounted:function(){
        this.$http.get("/api/login?userName=%E6%9D%8E%E5%9B%9B&password=123456").then((res)=>{
          this.$http.get("/api/getShoppingCart").then((res)=>{
            //购物车数据
            for(var i=0;i<res.data.data.length;i++){
              res.data.data[i].give=parseInt(res.data.data[i].size)*5;
              res.data.data[i].birth={inp1:"",diyShow:false,showBirth:false,default:"选择生日牌",list:["情人节快乐","新年快乐","Happy new year","生日快乐","Happy Birthday","节日快乐"]};
            }
            this.goodsData=res.data.data;
            //配件商品数据
            this.smallGoods=res.data.smallGoods;
            //推荐商品数据
            this.recommend=res.data.recommend;

            this.goodsData[1].groupCount=3;

          }).catch((err)=>{
            return console.log(err);
          });

        }).catch((err)=>{
          return console.log(err);
        });
      }
    }

</script>

<style scoped>
  .Scar{
    min-height:369px;
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .Scar .Sgoods{
    text-align: left;
    width: 1200px;
    margin-top: 32px;
    font-size: 13px;
  }
  .Scar .Sgoods>ul{
    background: #FAFAFA;
    font-size: 13px;
    width: 1200px;
    overflow: hidden;
    line-height: 44px;
    border: 1px solid #E1E1E1;
  }
  .Scar .Sgoods>ul li{
    height: 44px;
    float: left;
  }
  .Scar .Sgoods>ul li:nth-child(1){
    width: 285px;
    margin-left: 166px;
  }
  .Scar .Sgoods>ul li:nth-child(2){
    width: 300px;
  }
  .Scar .Sgoods>ul li:nth-child(3){
    width: 115px;
  }
  .Scar .Sgoods>ul li:nth-child(4){
    width: 150px;
  }
  .Scar .Sgoods>ul li:nth-child(5){
    width: 180px;
  }
  .Scar .Sgoods .SgoodsL{
    background: #fff;
    border: 1px solid #E1E1E1;
    margin-top: 20px;
  }
  .Scar .Sgoods .SgoodsL .tables{
    width:1200px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up{
    background: #fbfbfb;
  }
  .clearfix{
    zoom: 1;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left{
    float:left;
    width:1100px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_title{
    margin-left: 60px;
    border-left: 4px solid #d5bfa7;
    padding-left: 10px;
    line-height: 25px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods{
    height:131px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td{
    float:left;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td1{
    width:106px;
    margin-left: 60px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td1 a{
    display: block;
    padding: 24px 0;
    margin-bottom: -1px;
    padding-right: 12px;
    position: relative;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td1 a img{
    height: 80px;
    width: 80px;
    border: 1px solid #EFEFEF;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2{
    width:250px;
    margin-top:24px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2 h4{
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    width: 260px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2 .Csp1{
    font-size: 13px;
    color: #D5BFA7;
    display: block;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2 .Csp2{
    display: block;
    color: #CECECE;
    height: 35px;
    margin-top: 10px;
    font-size: 12px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2 .Csp2 i{
    display: inline-block;
    height: 35px;
    width: 35px;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -44px -63px;
    background-size: 310px 120px;
    margin-right: 5px;
    margin-bottom: -6px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td2 .Csp2 ins{
    text-decoration: none;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3{
    width:300px;
    padding:48px 0 24px;
    position: relative;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 .Sbirth{
    border: 1px solid #D5D5D5;
    width: 226px;
    height: 22px;
    color: #D8C3AD;
    outline: none;
    padding-left: 8px;
    position: relative;
    cursor: pointer;
    line-height: 22px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 .Sbirth i{
    height: 7px;
    width: 9px;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -238px -93px;
    background-size: 310px 120px;
    position: absolute;
    left: 219px;
    top: 9px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 ul{
    position: absolute;
    padding-left: 8px;
    top: 72px;
    left: 0;
    width: 226px;
    background: #FFF;
    border: 1px solid #EDEDED;
    box-shadow: 0 2px 4px 0 rgba(237, 237, 237, 0.50);
    z-index: 10;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 ul li{
    color: #D8C3AD;
    line-height: 28px;
    margin: 7px 0;
    cursor: pointer;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 ul li:hover{
    color:black;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 ul .Sli .Sinp1{
    width: 162px;
    height: 24px;
    border: 1px solid #ECECEC;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td3 ul .Sli .Sinp2{
    background: #673F2B;
    color: #fff;
    width: 42px;
    height: 24px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td4{
    width: 115px;
    font-size: 13px;
    margin-top: 55px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5{
    width:150px;
    margin-top: 48px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div{
    height: 22px;
    width: 94px;
    border: 1px solid #E7E7E7;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div input{
    height:22px;
    display:block;
    float:left;
    text-align: center;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div .minus,  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5 div .plus{
    width: 22px;
    border: none;
    font-size: 18px;
    line-height: 15px;
    cursor: pointer;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div .minusDis{
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -252px -96px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div .plusDis{
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -218px -103px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td5>div .Scount{
    width: 48px;
    border: solid #E7E7E7;
    border-width: 0 1px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_left .mark_goods .td6{
    width: 100px;
    color: #FF714D;
    font-size: 13px;
    margin-top: 55px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_right{
    float:right;
    background: #f2f2f2;
    width: 100px;
    height:287px;
    line-height: 287px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .mark_up .mark_right a i{
    margin-left: 44px;
    height: 12px;
    width: 12px;
    display: inline-block;
    background: url('../../../static/img/hide.png') no-repeat center;
  }
  /*普通商品样式*/
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal{
    height:131px;
    border-bottom: 2px dashed #F1F1F1;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .mark_title{
    margin-left: 60px;
    border-left: 4px solid #d5bfa7;
    padding-left: 10px;
    line-height: 25px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .mark_goods{
    height:131px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td{
    float:left;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td1{
    width:106px;
    margin-left: 60px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td1 a{
    display: block;
    padding: 24px 0;
    margin-bottom: -1px;
    padding-right: 12px;
    position: relative;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td1 a img{
    height: 80px;
    width: 80px;
    border: 1px solid #EFEFEF;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2{
    width:250px;
    margin-top:24px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2 h4{
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    width: 260px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2 .Csp1{
    font-size: 13px;
    color: #D5BFA7;
    display: block;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2 .Csp2{
    display: block;
    color: #CECECE;
    height: 35px;
    margin-top: 10px;
    font-size: 12px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2 .Csp2 i{
    display: inline-block;
    height: 35px;
    width: 35px;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -44px -63px;
    background-size: 310px 120px;
    margin-right: 5px;
    margin-bottom: -6px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td2 .Csp2 ins{
    text-decoration: none;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3{
    width:300px;
    padding:48px 0 24px;
    position: relative;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 .Sbirth{
    border: 1px solid #D5D5D5;
    width: 226px;
    height: 22px;
    color: #D8C3AD;
    outline: none;
    padding-left: 8px;
    position: relative;
    cursor: pointer;
    line-height: 22px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 .Sbirth i{
    height: 7px;
    width: 9px;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -238px -93px;
    background-size: 310px 120px;
    position: absolute;
    left: 219px;
    top: 9px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 ul{
    position: absolute;
    padding-left: 8px;
    top: 72px;
    left: 0;
    width: 226px;
    background: #FFF;
    border: 1px solid #EDEDED;
    box-shadow: 0 2px 4px 0 rgba(237, 237, 237, 0.50);
    z-index: 10;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 ul li{
    color: #D8C3AD;
    line-height: 28px;
    margin: 7px 0;
    cursor: pointer;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 ul li:hover{
    color:black;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 ul .Sli .Sinp1{
    width: 162px;
    height: 24px;
    border: 1px solid #ECECEC;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td3 ul .Sli .Sinp2{
    background: #673F2B;
    color: #fff;
    width: 42px;
    height: 24px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td4{
    width: 115px;
    font-size: 13px;
    margin-top: 55px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5{
    width:150px;
    margin-top: 48px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div{
    height: 22px;
    width: 94px;
    border: 1px solid #E7E7E7;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div input{
    height:22px;
    display:block;
    float:left;
    text-align: center;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div .minus,  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5 div .plus{
    width: 22px;
    border: none;
    font-size: 18px;
    line-height: 15px;
    cursor: pointer;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div .minus{
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -252px -108px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div .minusDis{
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -252px -96px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div .plus{
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -235px -100px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td5>div .Scount{
    width: 48px;
    border: solid #E7E7E7;
    border-width: 0 1px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .td6{
    width: 100px;
    color: #FF714D;
    font-size: 13px;
    margin-top: 55px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .Sdel{
    width:100px;
    text-align: center;
    margin-top: 55px;
  }
  .Scar .Sgoods .SgoodsL .tables .goodsTr .normal .Sdel a i{
    margin-left: 48px;
    height: 12px;
    width: 12px;
    display: inline-block;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -221px -70px;
    background-size: 310px 120px;
    cursor: pointer;
  }
/*商品配件*/
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul{
    margin-left: 60px;
    padding: 15px 0;
    border-top: 2px solid #E0E0E0;
    margin-top: -1px;
    margin-right: 60px;
    overflow: hidden;
    width:1076px;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li{
    float: left;
    overflow: hidden;
    margin-right: 25px;
    padding: 12px 0;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li img{
    height: 80px;
    width: 80px;
    border: 1px solid #EFEFEF;
    display: inline-block;
    float: left;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright{
    float: left;
    margin-left: 22px;
    width: 140px;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright h5{
    width: 110px;
    overflow: hidden;
    height: 18px;
    font-size: 13px;
    line-height: 18px;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright>span{
    font-size: 13px;
    line-height: 18px;
    color: #D5BFA7;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright>a{
    display: block;
    margin-top: 20px;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright>a:hover i{
    background-position: -194px -96px;
  }
  .Scar .Sgoods .SgoodsL .tables .SlastTr ul li .Sright>a i{
    width: 24px;
    height: 24px;
    display: inline-block;
    background: url("../../../static/img/icon.png") no-repeat;
    background-size: 310px 120px;
    background-position: -194px -70px;
  }
  /*商品价格总计*/
  .Scar .Ssum{
    position: relative;
    width: 1078px;
    background: #FBFBFB;
    border: 1px solid #E1E1E1;
    padding: 26px 60px 32px 60px;
    margin: 20px 0;
  }
  .Scar .Ssum>a{
    position: absolute;
    top: 25px;
    left: 60px;
    display: block;
    font-size: 13px;
  }
  .Scar .Ssum>a i{
    display: inline-block;
    width: 18px;
    height: 21px;
    background: url("../../../static/img/icon.png") no-repeat;
    background-position: -148px -71px;
    background-size: 310px 120px;
    vertical-align: middle;
    margin-right: 18px;
    margin-bottom: 4px;
  }
  .Scar .Ssum>ul li{
    font-size: 13px;
    text-align: right;
    line-height: 18px;
    margin-bottom: 10px;
  }
  .Scar .Ssum .totalMoney{
    text-align: right;
  }
  .Scar .Ssum .totalMoney>span{
    display: inline-block;
    width: 232px;
    border-top: 2px solid #E2E2E2;
    line-height: 42px;
    font-size: 13px;
    text-align: right;
  }
  .Scar .Ssum .totalMoney>span>span{
    color: #FF714D;
    display: inline-block;
    margin-left: 4px;
    line-height: 42px;
    font-size: 13px;
  }
  .Scar .Ssum .infos{
    font-size: 13px;
    color: #D5BFA7;
    line-height: 18px;
    text-align: right;
    display: block;
  }
  .Scar .Ssum .payBtn{
    text-align: right;
  }
  .Scar .Ssum .payBtn>a {
    background: #684029;
    width: 232px;
    height: 40px;
    display: inline-block;
    color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    margin-top: 14px;
  }

  /*商品推荐*/
  .Scar .recom{
    margin-top: 48px;
    width: 1200px;
    overflow: hidden;
    padding-bottom: 42px;
  }
  .Scar .recom h2{
    font-size: 18px;
    color: #684029;
    line-height: 50px;
    border-bottom: 2px solid #CECAC7;
  }
  .Scar .recom ul{
    width: 1264px;
    margin: 22px 0 0 -32px;
    overflow: hidden;
  }
  .Scar .recom ul li{
    max-width: 252px;
    margin: 0 32px;
    max-height: 252px;
    background: #eee;
    float: left;
  }
  .Scar .recom ul li a img{
    height: 252px;
    width: 252px;
  }
</style>
