<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, index) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.src" />
            <div class="info">
              <h1>{{ item.name }}</h1>
              <p>
                <span class="price">￥{{ item.price }}</span>
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
              总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import numbox from '../subcomponents/ShopCarNumberBox.vue'

export default {
  data() {
    return {
      goodsList: [], // 购物车中所有商品的数据
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      // 1. 获取到 store 中所有商品的 ID，然后拼接出一个 用逗号分隔的字符串
      var idArr = []
      this.$store.state.car.forEach(item => idArr.push(item.id));

      // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则 会报错
      if (idArr.length <= 0) {
        return ;
      }

      this.goodsList = this.$store.state.car

      // 获取购物车商品列表
      /* this.$http.get('api/goods/getshocarlist/' + idArr.join(',')).then(res => {
        if (res.body.status === 1) {
          this.goodsList = res.body.gods
        }
      }) */
    },
    remove(id, idx) {
      // 点击删除，把商品从 store 中根据 传递的 id 删除，同时把组件中的 goodslist 中，对应要删除 的那个商品使用 idx 来删除
      this.goodsList.splice(idx, 1)
      this.$store.commit('removeFormCar', id)
    },
    selectedChange(id, val) {
      // 每当带年纪开关，把最新的 开关状态，同步到 store 中
      // console.log(id + ' --- ' + val);
      this.$store.commit('updateGoodsSelected', { id, selected: val })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #efefef;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>