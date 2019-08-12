<template>
  <el-container>
    <el-main>
      <div class="m-container">
        基础信息
        <p>企业名称</p>
        <p> {{ enterpriseName }} </p>

        <p>
          账号 <el-tag
            v-if="accountStatusType"
            :type="accountStatusType"
          >
            {{ accountStatus }}
          </el-tag>
        </p>
        <div>
          <p>
            <span> {{ account }} </span>
          </p>
        </div>

        <el-form
          label-position="right"
          label-width="80px"
        >
          <el-form-item label="联系人姓名">
            <el-input v-model="contactName" />
          </el-form-item>
          <el-button
            type="primary"
            @click="onModifyContactName"
          >
            保存
          </el-button>
        </el-form>

        <p>修改密码</p>
        <el-form
          label-position="right"
          label-width="80px"
        >
          <el-form-item label="原密码">
            <el-input v-model="oriPass" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="newPass" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="comfirmPass" />
          </el-form-item>
          <el-button
            type="primary"
            @click="onModifyPassword"
          >
            保存
          </el-button>
        </el-form>

        <p>联系方式</p>
        <el-form :inline="true">
          <el-form-item label="联系人邮箱">
            <el-input v-model="contactEmail" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onVerifyEmail"
            >
              发送邮件
            </el-button>
          </el-form-item>
          <el-form-item>
            <p> {{ contactEmailStatus }} </p>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="联系人手机">
            <el-input v-model="contactPhone" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onVerifyPhone"
            >
              发送短信
            </el-button>
          </el-form-item>
          <el-form-item>
            <p> {{ contactPhoneStatus }} </p>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { doGetUserInfo } from '../common/api'

export default {
  name: 'UserInfo',
  data () {
    return {
      contactName: '',
      oriPass: '',
      newPass: '',
      comfirmPass: '',
      contactEmail: '联系人姓名',
      contactPhone: '联系人姓名',
      user: {}
    }
  },
  computed: {
    contactEmailStatus () {
      return '未验证'
    },
    contactPhoneStatus () {
      return '未验证'
    },
    enterpriseName () {
      return this.user.enterpriseName ? this.user.enterpriseName : ''
    },
    account () {
      return this.user.userId ? this.user.userId : ''
    },
    accountStatus () {
      if (!this.user.status) return ''
      switch (this.user.status.toUpperCase()) {
        case 'SUCCESS': return '审核通过'
        case 'FAILED': return '审核失败'
        case 'WAIT': return '审核中'
        default:
          return '未知状态:' + this.user.status.toUpperCase()
      }
    },
    accountStatusType () {
      if (!this.user.status) return ''
      switch (this.user.status.toUpperCase()) {
        case 'SUCCESS': return 'success'
        case 'FAILED': return 'danger'
        case 'WAIT': return 'info'
        default:
          return 'info'
      }
    }
  },
  async mounted () {
    const ret = await doGetUserInfo()

    this.user = ret.data.user

    this.contactName = this.user.contactName
    this.contactPhone = `${this.user.contactMobileCC}-${this.user.contactMobileNumber}`
    this.contactEmail = this.user.contactEmail
  },
  methods: {
    onModifyContactName () {

    },
    onModifyPassword () {

    },
    onVerifyEmail () {

    },
    onVerifyPhone () {

    }
  }
}

</script>

<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding: 0 20px;
    margin-top: 20px;
}

.bold {
    font-weight: bold;
}

.aside {
    margin-left: 20px;
    margin: 20px;
}

.flight-no {
    font-size: 12px;

    .highlight {
        color: #2678f6;
    }
}

.time {
    margin-left: 20px;
    line-height: 24px;

    i {
        line-height: 24px;
    }
}

.detail {
    background: #fbfbfb;
    padding: 10px;

    .highlight {
        color: #2678f6;
    }

    .timedetail {
        margin-top: 20px;
        color: #919191;

        .bold {
            color: #000;
        }

        >* {
            margin-right: 50px;
        }
    }
}

.seats {
    flex-wrap: wrap;
    justify-content: space-between;

    .seat {
        width: 49%;
        border-radius: 0;
        cursor: pointer;
        font-size: 14px;
        flex-direction: row;
        display: flex;
        justify-content: space-between;

        .mark {
            font-size: 12px;
            background: #eee;
            padding: 0 5px;
            line-height: 24px;
            box-sizing: border-box;
        }

        .hilight {
            color: #2678f6;
            font-size: 18px;
        }
    }

    .active {
        border: 2px solid #2678f6;
        box-shadow: none;
    }
}

.passenger {
    .label {
        font-size: 14px;
        color: rgb(145, 145, 145);
    }

    .input-area {
        .label {
            font-size: 12px;
            color: #000;
            margin-bottom: 10px;
        }

        width: 48%;
    }

    .input-line {
        margin-top: 20px;
    }
}

.btn-submit {
    width: 100%;
}
</style>
