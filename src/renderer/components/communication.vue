<template>
    <div class="layout"> 
        <button @click="sendMsg">{{isCollapsed}}</button>
    </div>
</template>

<script>

export default {
  name: "communication",
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    sendMsg() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>

</style>
