<template>
  <div>
    <span>{{res}}</span>
    <div class="upload" @click="onUploadClick" >上传图片</div>
    <input type="file" id="file" multiple accept="image/*" /> 
  </div>
</template>

<script>

export default {
  data() {
    return {
      res: null,
      localId: [],
      serverId: []
    }
  },
  methods: {
    onUploadClick() {
      let me = this
      me.$wx.chooseImage({
        count: 1, // 默认9
        success: function (res) {
          console.log(res)
          if(res.localIds.length > 0) {
            me.$wx.getLocalImgData({
              localId: res.localIds[0], // 图片的localID
              success: function (res1) {
                alert(JSON.stringify(res1))
                me.res = JSON.stringify(res1)
              }
            });



            /*me.$wx.uploadImage({
              localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res1) {
                let url = me.$http.get(`${me.$server_uri}/upload/${res1.serverId}`)
              }
            })*/


          }

        }
      });
    }
  }
  
}
</script>

<style>
  .upload {
    height: 100px;
    background-color: orange;
  }

</style>