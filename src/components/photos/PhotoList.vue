<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a :class="['mui-control-item', index === 0 ? 'mui-active' : '']" v-for="(item, index) in cates" :key="index">{{ item }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 1. 导入 mui 的 js 文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
    }
  },
  created() {
    this.getAllCategory()
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
          console.log(this.cates);
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
</style>