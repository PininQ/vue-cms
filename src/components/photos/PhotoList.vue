<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', index === 0 ? 'mui-active' : '']"
            v-for="(item, index) in cates"
            :key="index"
            @click="getPhotoListByCateId(item)"
          >{{ item }}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item._id" :to="'/home/photoinfo/' + item.phoId" tag="li">
        <!-- 注意： v-lazy 要指定图片的地址 -->
        <img v-lazy="item.phos[0]" />
        <div class="info">{{ item.intro }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的 js 文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [], // 图片列表的数组
    }
  },
  created() {
    this.getAllCategory()
    // 默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCateId('')
  },
  mounted() {
    // 当组件中的 DOM 结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素，最好再 mounted 里面，因为 这个时候的 DOM 元素是最新的
    // 2. 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get('api/getphotypes').then(res => {
        if (res.body.status === 1) {
          // 手动拼接一个最完整的 分类列表
          res.body.types.unshift('全部')
          this.cates = res.body.types
        }
      })
    },
    getPhotoListByCateId(type) {
      // 根据 分类 Id，获取图片列表
      this.$http.get('api/getpho?type=' + type + '&pageIdx=1').then(res => {
        if (res.body.status === 1) {
          // 使用 ES6 的展开运算符，展开二维数组，或者可以使用 concat() 和 apply()
          // this.list = [].concat.apply([], res.body.phos.map(item => item.phos));
          // this.list = [].concat(...res.body.phos.map(item => item.phos))
          this.list = res.body.phos
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    border-radius: 10px;
    position: relative;
  }
  img {
    width: 100%;
    vertical-align: middle;
    border-radius: 10px;
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .info {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    overflow: hidden;
    color: #f7f7f7;
    background-color: rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>