<template>
  <div>
    <div class="box  mg-top10 passenger">
      <div class="flex-row space-between input-line">
        <div class="left">
          <div class="label">
            姓名
          </div>
          <el-input
            v-model="contact.name"
            size="mini"
            placeholder="姓名"
            type="text"
            onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'')"
            maxlength="10"
          />
        </div>
        <div class="right">
          <div class="label">
            邮箱
          </div>
          <el-input
            v-model="contact.email"
            size="mini"
            placeholder="邮箱"
            title="email"
            @focusout.native="limit"
          />
        </div>
      </div>
      <div class="flex-row space-between input-line">
        <div class="input-area">
          <div class="label">
            手机
          </div>
          <el-input
            v-model="contact.mobile"
            size="mini"
            placeholder="手机"
            type="number"
            maxlength="11"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactInformation',
  props: {
    contact:
     { type: Object,
       default: function () {
         return { }
       } }
  },
  methods: {
    limit () {
      if (this.contact.email !== '') {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        var isok = reg.test(this.contact.email)
        if (!isok) {
          alert('邮箱格式不正确')
          return false
        }
      }
    }
  }
}
</script>
<style>
.flex-row{
    display:flex;
}
.right{
    margin-right:200px;
}
.label{
    margin-bottom: 8px;
    margin-top:15px;
}
</style>
