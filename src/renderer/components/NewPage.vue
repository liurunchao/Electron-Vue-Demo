<template>
  <div>
    <button @click="sendMsg">{{isCollapsed}}</button>
    <button @click="back">返回</button>
  </div>
</template>

<script>
export default {
  name: "NewPage",
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    sendMsg() {
      this.isCollapsed = !this.isCollapsed;
    },
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>

</style>
