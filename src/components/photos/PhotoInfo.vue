<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.intro }}</h3>
    <p class="subtitle">
      <span>发表时间：2019-08-30 12:55:58</span>
      <span>点击：26次</span>
    </p>

    <!-- 缩略图区域 -->
    <div class="pho-preview">
      <!-- 使用 v-for 循环渲染缩略图 -->
      <vue-preview :slides="photolist"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content">
      这才是正确姿势，请开始你的表演。
      <img src="http://wx3.sinaimg.cn/mw600/0076BSS5ly1g6hniifd90j30dw0i2qa2.jpg" alt />
      <img src="http://wx1.sinaimg.cn/mw600/0076BSS5ly1g6hmmj82tpj30u018wdos.jpg" alt />
      <img src="http://wx1.sinaimg.cn/mw600/0076BSS5ly1g6hl7ljicxj30u011idi7.jpg" alt />
    </div>

    <!-- 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
import Comment from '../subcomponents/Comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到 图片Id
      photoinfo: {}, // 图片详情
      photolist: [], // 缩略图的数组
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get('api/getphodetail?phoId=' + this.id).then(res => {
        if (res.body.status === 1) {
          this.photoinfo = res.body.pho
        }
      })
    },
    getThumbs() {
      // 获取缩略图
      this.$http.get('api/getphodetail?phoId=0' + this.id)
      .then(res => {
        if (res.body.status === 1) {
          // 循环每个图片数据，补全图片的宽和高
          res.body.pho.phos.map(item => {
            this.photolist.push({ src: item, msrc: item, w: 400, h: 530 })
          });
          // 把完整的数据保存到 photolist 中
          console.log(this.photolist);
        }
      })
      .catch(error => {
        console.log(error);
        Toast({
          message: "获取缩略图图片失败..."
        });
      });
    },
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #eb6437;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
  .pho-preview {
    max-height: 120px;
    margin-bottom: 5px;
    overflow: hidden;
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 25%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
    img {
      width: 100%;
    }
  }
}
</style>