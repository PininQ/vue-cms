<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.name }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.oldPrice }}</del>&nbsp;&nbsp;
            销售价：
            <span class="now-price">￥{{ goodsinfo.newPrice }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getCount="getSelectedCount" :max="goodsinfo.quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 分析：如何实现加入购物车的时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现：按钮属于 goodsinfo 页面，数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到选中的 商品数量值 -->
            <!-- 3. 解决办法：涉及到了 子组件向父组件传值（事件调用机制） -->
            <!-- 4. 事件调用的本质：父组件向子组件传递方法，子组件调用这个方法，同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.godNum }}</p>
          <p>库存情况：{{ goodsinfo.quantity }}</p>
          <p>上架时间：{{ goodsinfo.addDate | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评价</mt-button>
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/Swiper.vue'
// 导入数字选择框组件
import numbox from '../subcomponents/NumberBox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, //将 路由参数对象中的 id 挂载到 data 中，方便后期调用
      lunbotu: [], // 商品的轮播图
      goodsinfo: {}, // 商品的详情
      ballFlag: false, // 控制小球的隐藏和显示的标识符
      selectedCount: 1, // 保存用户选中的商品数量，默认认为用户买 1个
    }
  },
  created() {
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get('api/getgoddetail?godId=' + this.id).then(res => {
        if (res.body.status === 1) {
          this.lunbotu = res.body.god.phos
          this.goodsinfo = res.body.god
        }
      })
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      // this.$router.push("/home/goodsdesc/" + this.id)
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment(id) {
      // 点击跳转到 评论页面
      console.log(id);
      // this.$router.push("/home/goodscomment/" + this.id)
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar() {
      // 添加购物车
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {

      // 小球动画优化思路：
      // 1. 先分析导致动画不准确的 本质原因：小球最终位移到的位置，已经局限在某一分辨率下的滚动条未滚动的情况下
      // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
      // 3. 因此，经过分析得到结论：不能把 位置的 横纵坐标直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 解题思路：先得到 徽标的 横纵坐标，再得到 小球的横纵坐标，然后对 y值 和 x值 分别求差，得到的结果，就是横纵坐标要位移的距离
      // 5. 如何获取 徽标和小球的位置？？？  domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取 徽标 在页面中的位置
      const badgePosition = document.querySelector('#badge').getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.offsetWidth
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all .5s cubic-bezier(.46,-0.4,1,.49)'
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count
      console.log('父组件拿到的数据值：' + this.selectedCount);
    },
  },
  components: {
    // 注册子组件
    swiper,
    numbox,
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  overflow: hidden;
  background-color: #f2f2f2;

  .now-price {
    color: #eb6437;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;

    .mint-button {
      margin-bottom: 15px;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    z-index: 99;
    position: absolute;
    top: 392px;
    left: 150px;
  }
}
</style>