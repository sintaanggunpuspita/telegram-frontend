<template>
     <div class="chatList">
        <div class="image">
        <img src="./assets/Rectangle 7" class="navbar-brand" alt="1">
    </div>
        <div class="text">
            <p class="username">Theresa Webb</p>
            <h6 class="chat">Why did you do that</h6>
            <p class="time">15:20</p>
    </div>
</template>

<script>
    export default {
  name: 'chatList',
  data () {
    return {
      textMessage: ''
    }
  },
  methods: {
    handleSend () {
      this.$emit('handle-send', { msg: this.textMessage, dom: this.$refs.inputMessage })
    }
  }
}
</script>

<style scoped>
.chatList {
        width: 525px;
        height: 70px;
        background-color: blue;
        /* border-radius: 0px; */
        box-shadow: 0px 7px 60px rgba(0, 0, 0, 0.05);
        margin-left: 20px;
        margin-top: 1px;
    }

    .image{
        margin-left: 20px;
        margin-top: 20px;
    }
    
    .chatList {
        /* position: absolute; */
        top: 350px;
        left: 35px;
        display: flex;
    }

    .text .chat {
        margin-top: -10px;
    }
    
    .text .time {
        margin-top: -35px;
        margin-left: 350px;
    }

    .text {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    } 
    

</style>