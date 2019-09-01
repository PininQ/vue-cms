<template>
  <div class="goodsdesc-container">
    <!-- <h3 class="title">{{ info.title }}</h3>
    <hr>
    <div class="content" v-html="info.content"></div> -->
    <div v-for="item of info" :key="item">
      <img :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {} // 商品的描述信息
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get('api/getgoddetail?godId=' + this.$route.params.id).then(res => {
        if (res.body.status === 1) {
          this.info = res.body.god.imgIntro
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.goodsdesc-container {
  .title {
    font-size: 16px;
    margin: 10px 0;
    color: blue;
    text-align: center;
  }
  .content {
    img {
      width: 100%;
    }
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>