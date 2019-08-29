<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.clicked }}次</span>
    </p>
    <!-- 摘要 -->
    <div class="summary">新闻摘要：{{ newsInfo.summary }}</div>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Comment from '../subcomponents/Comment.vue'

export default {
  data() {
    return {
      // 将 URL 地址中传递过来地 id 值挂载到 data 上，方便以后调用
      id: this.$route.params.id,
      newsInfo: {}, // 新闻对象
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo() { // 获取新闻详情
      this.$http.get('api/getnewsdetail?newsId=' + this.id).then(res => {
        if (res.body.status === 1) {
          this.newsInfo = res.body.news
        } else {
          Toast('获取新闻内容失败！')
        }
      })
    }
  },
  components: {
    'comment-box': Comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  color: #444;
  .title{
    text-align: center;
    font-size: 16px;
    margin: 15px 0;
    color: #333;
  }
  .subtitle {
    text-align: center;
    font-size: 13px;
    color: #6d6d6d;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
    span:first-child {
      padding-right: 10px;
    }
  }
  .summary {
    color: #999;
    font-size: 14px;
  }
  .content /deep/ {
    h4, p {
      color: #444;
      font-weight: normal;
      font-size: 14px;
    }
    img {
      width: 100%;
    }
  }
}
</style>