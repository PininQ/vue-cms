<template>
  <div class="app-container">

    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="CMS"></mt-header>

    <!-- 中间的路由 router-view 区域 -->
    <transition>
			<router-view></router-view>
		</transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-my" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
      <router-link class="mui-tab-item-my" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-my" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-my" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
	padding-bottom: 60px;
	// 当有组件切换动效的时候，一瞬间，页面的宽度会变成 正常宽度的 2 倍，此时，需要隐藏超出屏幕宽度的区域
	overflow-x: hidden;
}

.mint-header {
	z-index: 123;
	box-shadow: 0 2px 4px #ccc;
}

.mui-bar {
	box-shadow: none;
	border-top: 1px solid #e3e3e5;
}

// 动画效果相关的类样式
.v-enter {
	opacity: 0;
	// 让即将进入的页面，向右偏移 100% 屏幕的宽度
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	// 让即将进入的页面，向右偏移 100% 屏幕的宽度
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active {
	transition: all .3s ease;
}

.mui-bar-tab .mui-tab-item-my.mui-active {
  color: #019dd0;
}

.mui-bar-tab .mui-tab-item-my {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-my .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>