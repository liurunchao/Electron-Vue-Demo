<template>
    <div> 
        <label for="">{{isOk}}</label>
        <button @click="back">bbbbbbbbbback</button>
    </div>
</template>

<script>

export default {
  name: "others",
  data() {
    return {
      isOk: false
    };
  },
  methods: {
    sendMsg() {
      this.isOk = !this.isOk;
    },
    back() {
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>

</style>
