<template>
  <div id="upload-art">
    <div class="title">
      <span>|</span>
      <span>预览图</span>
      <span>|</span>
    </div>
    <div class="upload-warp center">
      <img v-if="imgSrc" :src="imgSrc">
      <input class="upload" type="file" accept="image/*" @change="fileChange" />
    </div>
    <div class="desc center">点击预览图更换当前图片</div>
    <div class="title center">
      <span>|</span>
      <span>作品名称</span>
      <span>|</span>
    </div>
    <input class="art-name" type="text" placeholder="请输入作品名称,限8个字符" />
    <div class="title">
      <span>|</span>
      <span>作品类型</span>
      <span>|</span>
    </div>
    <div></div>
    <div class="subject-select center" @click="subjectVisible = true">
      <div class="text">文本</div>
      <div class="select-btn"></div>
    </div>
    <div class="title">
      <span>|</span>
      <span>作品描述</span>
      <span>|</span>
    </div>
    <textarea class="content" placeholder="请输入作品描述,限140字"></textarea>
    <div class="title">
      <span>|</span>
      <span>作品尺寸</span>
      <span>|</span>
    </div>
    
    <mt-actionsheet
      :actions="subjects"
      v-model="subjectVisible">
    </mt-actionsheet>
    
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      imgSrc: null,
      subjectVisible: false,
      subjects: [{
        name: 'a',
        method() {
          console.log(this.name)
        }
      },{
        name: 'b',
        method() {
          console.log(this.name)
        }
      }]
    }
  },
  methods: {
    fileChange($event) {  
      this.file = $event.target.files[0] //获取要上传的文件

      let me = this

      const formData = new FormData()
      formData.append('file', me.file)

      me.imgSrc = '../../static/art1.jpg'
    }
  }
}
</script>


<style scoped>

  .center {
    width: 9.066rem;
    margin: 0 auto;
  }

  .title, .desc {
    font-size: 0.32rem;
    color: #353535;
    text-align: center;
  }

  .title {
    height: 0.96rem;
    line-height: 0.96rem;
  }

  .desc {
    height: 0.853rem;
    line-height: 0.853rem;
    border-bottom: 0.05rem dotted #29818A;
  }

  .upload-warp {
    height: 6.8rem;
    background-color: #EFEFEF;
    border-radius: 0.2rem;
    position: relative;
  }

  .upload {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 2;
  }

  .upload-warp img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    border-radius: 0.2rem;
    z-index: 1;
  }

  #upload-art .art-name {
    display: block;
    margin: 0 auto;
    width: 8.266rem;
    height: 0.96rem;
    border-width: 0.05rem;
    color: #919191;
    font-size: 0.32rem;
    padding: 0 0.4rem;
  }

  .content {
    display: block;
    margin: 0 auto;
    width: 8.266rem;
    height: 2.4rem;
    border: 0.05rem solid #DCDFE6;
    border-radius: 0.2rem;
    resize: none;
    padding: 0.4rem 0.533rem;
    font-size: 0.346rem;
    color: #919191;
  }

  .subject-select {
    display: flex;
    height: 0.96rem;
    border: 0.05rem solid #DCDFE6;
    border-radius: 0.16rem;
  }

  .subject-select .text {
    flex: 1;
    padding: 0 0.4rem;
    line-height: 0.96rem;
  }

  .subject-select .select-btn {
    background-color: #FC7E7C;
    height: 0.96rem;
    width: 2.186rem;
    border-radius: 0 0.16rem 0.16rem 0;
  }

  #upload-art {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  
  

  

  

</style>
