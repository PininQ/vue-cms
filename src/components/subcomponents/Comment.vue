<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) of comments" :key="item._id">
        <div class="cmt-title">第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{ item.username }}&nbsp;&nbsp;发表时间：{{ item.comDate | dateFormat }}</div>
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
      msg: '', // 评论输入内容
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() { // 获取评论
      this.$http.get('api/getnewscom?newsId=' + this.id + '&pageIdx=' + this.pageIndex)
      .then(res => {
        console.log(res);
        if(res.body.status === 1) {
          // this.comments = res.body.comments
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
          this.comments = this.comments.concat(res.body.comments)
        } else {
          Toast('评论已经到底了！')
        }
      })
    },
    getMoreComment() { // 加载更多
      this.pageIndex++
      this.getComments()
    },
    postComment() { // 发表评论
      // 校验是否为空
      if(this.msg.trim().length === 0) {
        return Toast('评论内容不能为空！')
      }

      // 发表评论
      // 参数1：请求的URL地址
      // 参数2：提交给服务器的数据对象 { content: this.msg }
      // 参数3：定义提交时，表单中的数据的格式 { emulateJSON: true }
      this.$http.post('api/addnewscom?newsId=' + this.$route.params.id, {
        content: this.msg
      })
      .then(res => {
        if (res.body.status === 1) {
          // 1. 拼接出一个评论对象
          var cmt = {
            username: '匿名',
            comDate: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(cmt)
          this.msg = ''
        }
      })
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
        border-radius: 2px;
      }
      .cmt-body {
        line-height: 3;
        text-indent: 1em;
      }
    }
  }
}
</style>