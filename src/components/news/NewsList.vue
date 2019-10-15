<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item of newslist" :key="item._id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.clicked }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      newslist: [] // 默认在页面中挂载一个空数组，表示 新闻列表
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() { // 获取新闻列表
      this.$http.get('api/getnews').then(result => {
        if (result.body.status === 1) {
          this.newslist = result.body.news
        } else {
          Toast('获取新闻列表失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
  }
  .mui-ellipsis {
    color: #999;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>