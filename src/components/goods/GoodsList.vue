<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item._id">
      <div class="god-head">
        <router-link :to="'/home/goodsinfo/'">
          <img :src="item.phos" :alt="item.name" />
          <div class="intro">{{ item.intro }}</div>
        </router-link>
      </div>
      <div class="info">
        <p class="price">
          <span class="now">${{ item.newPrice }}</span>
          <span class="old">${{ item.oldPrice }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.quantity }}件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
    return {
      page: 1, // 默认展示第一页的数据
      goodslist: [], // 商品列表
      isloaded: false // 节流阀，默认为false,表示没有加载完毕
    };
  },
  created() {
    this.getGoodsListByPage();
  },
  methods: {
    getGoodsListByPage() {
      // 根据页码获取 商品列表
      this.$http.get("api/getgod?pageIdx=" + this.page).then(res => {
        if (res.body.status === 1) {
          // 当获取到的 数组长度为0，表示数据已经加载完毕了
          console.log(res);
          if (res.body.gods.length <= 0) {
            // 设置isloaded true,表示没有新数据了
            this.isloaded = true;
          }
          this.goodslist = this.goodslist.concat(res.body.gods);
        }
      })
    },
    getMore() {
      // 如果为true，表示数据已经加载完毕了，此时直接return
      if (this.isloaded) return;
      // 点击加载更多的商品
      this.page++;
      this.getGoodsListByPage();
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  // 设置父盒子为弹性盒模型
  display: flex;
  // 默认flex 布局的盒子，内部的子元素不会换行，可以使用下面的属性使其换行
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin-top: 7px;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 3px;
    .god-head {
      min-height: 150px;
      font-size: 13px;
      overflow: hidden;
      img {
        width: 100%;
        min-height: 170px;
        border-radius: 3px;
      }
      .intro {
        // max-height: 40px;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        padding: 0 3px;
      }
    }
    .info {
      background-color: #eee;
      overflow: hidden;
      border-radius: 3px;
      p {
        margin: 3px;
      }
      .price {
        .now {
          color: #dd0000;
          margin-right: 10px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        font-size: 12px;
        justify-content: space-between;
      }
    }
  }
}
</style>