<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
        class="el-menu-custom ticket"
      >
        <el-submenu index="1">
          <template
            slot="title"
            class="userId"
          >
            {{ contactName }}
          </template>
          <el-menu-item
            index="1-1"
            @click="order"
          >
            机票订单
          </el-menu-item>
          <el-menu-item
            index="1-2"
            @click="search"
          >
            搜索机票
          </el-menu-item>
          <el-menu-item
            index="1-3"
            @click="user"
          >
            用户信息
          </el-menu-item>
          <el-menu-item
            index="1-3"
            @click="onLoginOut"
          >
            退出
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'LayoutAdmin',
  data () {
    return {
      userInformation: {},
      contactName: ''
    }
  },
  async mounted () {
  },
  methods: {
    onLoginOut () {
      this.$store.commit('login/CLEAR_LOGIN_STATE')
      this.$router.push('/login')
    },
    order () {
      console.log('order')
      this.$router.push('/order')
    },
    search () {
      this.$router.push('/search')
    },
    user () {
      this.$router.push('/userinfo')
    }
  }
}
</script>

<style lang="less" scoped>
.userId{
  color:white;
  width:150px;
}
.ticket{
  background-color:rgba(0,0,0,0.2);
  position: absolute;
  width:150px;
  right:20px;
}

.el-header {
  background-color:rgba(0,0,0);
  color: #ccc;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-menu-custom {
  border: none;
}

</style>
