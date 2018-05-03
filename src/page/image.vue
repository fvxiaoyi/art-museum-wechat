<template>
  <div>
    <a class="upload_warp">
      <img v-if="imgSrc" :src="imgSrc">
      <input class="upload" type="file" accept="image/*" @change="getFile" />
      <span>+</span>
    </a>
  </div>
</template>

<script>

export default {
  data() {
    return {
      imgSrc: null,
      res: null,
      file: null,
      localId: [],
      serverId: []
    }
  },
  methods: {
    onUploadClick() {
      /*let me = this

      const formData = new FormData()
      formData.append('file', me.file)

      me.$http.post(`${me.$server_uri}/upload`, formData).then((resp) => {
        if(resp.data.Location) {
          me.imgSrc = resp.data.Location
        } else {
          alert('error')
        }
      })*/

      
    },
    getFile($event) {  
      this.file = $event.target.files[0] //获取要上传的文件

      let me = this

      const formData = new FormData()
      formData.append('file', me.file)

      me.$http.post(`${me.$server_uri}/upload`, formData).then((resp) => {
        if(resp.data.Location) {
          me.imgSrc = resp.data.Location
        } else {
          alert('error')
        }
      })
    }
  }
  
}
</script>

<style>
  .upload_warp {
    display: block;
    width: 200px;
    height: 200px;
    background-color: #EFEFEF;
    border-radius: 10px;
    margin: 0 auto;
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

  .upload_warp img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 3;
  }

  .upload_warp span {
    font-size: 60px;
    display: block;
    text-align: center;
    width: 100%;
    color: #fff;
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 1;
  }

</style>