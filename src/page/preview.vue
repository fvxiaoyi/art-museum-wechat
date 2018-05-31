<template>
  <div class="pv">
    <div class="login">
      <div class="remark">引导语</div>
      <div class="btn-wrap">
        <div class="btn">登录</div>
      </div>
    </div>

    <ul class="art-list">
      <li v-for="item in list" :key="item.id" >
        <div class="img-wrap">
          <img :src="item.src">
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [{
        id: "1",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "2",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "3",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "4",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "5",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "6",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "7",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "8",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "9",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "10",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "11",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "12",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      }]
    }
  }
}

</script>

<style scoped>

  .pv {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /** 顶部登录块 **/
  .pv .login {
    width: 100%;
    height: 3.2rem;
    background-color: #C0C4CC;
    margin-bottom: 0.26rem;
  }

  .pv .login .remark {
    margin-bottom: 1rem;
  }

  .pv .btn-wrap {
    width: 100%;
  }

  .pv .btn-wrap .btn {
    width: 3rem;
    height: 1rem;
    background-color: orange;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    line-height: 1rem;
    border-radius: 0.2rem;
  }

  /** 列表 **/

  .pv .art-list {
    flex: 1;
    overflow: scroll;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0.26rem;
  }

  .pv .art-list li {
    width: 50%;
    height: 5rem;
  }

  .pv .img-wrap {
    padding: 2%;
    height: 96%;
  }

  .pv .art-list img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }

</style>
