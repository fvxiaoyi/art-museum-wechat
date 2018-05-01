<template>
</template>

<script>
export default {
  beforeCreate() {
    sessionStorage.setItem('openid', this.$route.params.openid)
    this.$router.push(decodeURIComponent(this.$route.params.url))
    // window.location.href = `http://localhost:8080/#${this.$route.params.url}`
  }
}
</script>
