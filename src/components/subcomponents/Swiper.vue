<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item of lunbotuList" :key="item">
        <img :src="item" :class="{ 'full': isfull }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么 商品评论中的轮播图被拉伸 -->
  <!-- 1. 首页中的图片，它的宽和高都使用了 100%  -->
  <!-- 2. 在商品详情页面中，轮播图的 图片如果也使用 宽高都为 100% 的话，页面不好看 -->
  <!-- 3. 商品详情页面中的轮播图，期望 高度是 100%，但是 宽度 自适应 -->
  <!-- 4. 分析结果：首页中的轮播图 和 详情页中的轮播图，分歧点：宽度到底是 100% 还是 自适应 -->
</template>

<script>
export default {
  props: ['lunbotuList', 'isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>