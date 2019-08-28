<template>
  <div>

    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item
        v-for="item of lunbotuList"
        :key="item"
      >
        <img
          :src="item"
          alt=""
          srcset=""
        >
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
          <div class="mui-media-body">图片分享</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>


<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      lunbotuList: [], // 保存轮播图的数组
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.$http.get('http://120.77.181.41:3000/api/getcover').then(res => {
        // console.log(res.body);
        if(res.body.status === 1) {
          this.lunbotuList = res.body.imgs
        } else {
          Toast('加载轮播图失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: lightcoral;
    }
    &:nth-child(2) {
      background-color: lightgreen;
    }
    &:nth-child(3) {
      background-color: lightskyblue;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  border: none;
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-media {
  border: none;
}
</style>