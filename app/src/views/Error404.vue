<template>
  <div style="width:100%;height:100%">
    <div class="text1">
      <p>真抱歉，您访问的页面走丢了</p>
      <img :src="bgSrc">
    </div>
    <div class="bottom">
      <p>版权所有@申立德 2019-2029</p>
    </div>
  </div>
</template>
<style>
  .text1 {
    color: #666465;
    font-size: 2em;
    text-align: center;
    padding-top: 100px;
    height:100%;
  }
  .bottom{
    text-align: center;
    color:rgba(22, 22, 22, 0.555);
    font-size: 12px;
    letter-spacing: 4px;
  }
</style>

<script>
  export default {
    data() {
      return {
        bgSrc: require('../assets/images/404.png'),
      };
    },
    components: {
    },
    computed: {},
    beforeMount() {},
    mounted() {},
    methods: {},
    watch: {}
  }
</script>