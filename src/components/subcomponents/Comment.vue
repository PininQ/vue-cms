<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="item of comments" :key="item.comId">
        <div class="cmt-title">第{{ item.comId + 1 }}楼&nbsp;&nbsp;用户：{{ item.username }}&nbsp;&nbsp;发表时间：{{ item.comDate | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，没有说话。。' : item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMoreComment">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() { // 获取评论
      this.$http.get('api/getnewscom?newsId=' + this.id + '?pageIdx=' + this.pageIndex)
      .then(res => {
        console.log(res);
        if(res.body.status === 1) {
          // this.comments = res.body.comments
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
          this.comments = this.comments.concat(res.body.comments)
        } else {
          Toast('获取评论失败！')
        }
      })
    },
    getMoreComment() { // 加载更多
      this.pageIndex++
      this.getComments()
    }
  },
  props: ["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-style: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 3;
        text-indent: 1em;
      }
    }
  }
}
</style>