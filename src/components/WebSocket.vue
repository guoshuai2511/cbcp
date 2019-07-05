<template>
  <div class="">
    <button @click="send">发送消息</button>
  </div>
</template>
<script type="text/javascript">
 /*  import $ from 'jquery'; */
  export default { //这里需要将模块引出，可在其他地方使用
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return {
        path:"ws://192.168.0.200:8005/qrCodePage/ID=1/refreshTime=5",
        socket:""   
      }
    },
    methods:{
      init: function () {
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket(this.path);
          // 监听socket连接
          this.socket.onopen = this.open;
          // 监听socket错误信息
          this.socket.onerror = this.error;
          // 监听socket消息
          this.socket.onmessage = this.getMessage;
        }
      },
      open: function () {
        console.log("socket连接成功");
      },
      error: function () {
        console.log("连接错误");
      },
      getMessage: function (msg) {
        console.log(msg.data)
      },
      send: function () {
        this.socket.send(params);
      },
      close: function () {
        console.log("socket已经关闭");
      }
    },
    mounted() {
      this.init();
    },
    destroyed () {
        // 销毁监听
        this.socket.onclose = this.close
    }
  }
</script>
<style>
  @import "../../static/css/common.css"; 
</style>