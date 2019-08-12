<template>
  <div class="box mg-top10 flex-column passenger">
    <div class="label">
      {{ label }}
    </div>
    <div class="flex-row space-between input-line">
      <div class="input-area">
        <div class="label">
          姓
        </div>
        <el-input
          v-model="passenger.familyName"
          size="mini"
          placeholder="姓名或者英文姓"
          type="text"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'')"
          maxlength="10"
        />
      </div>
      <div class="input-area">
        <div class="label">
          名
        </div>
        <el-input
          v-model="passenger.givenName"
          size="mini"
          placeholder="拼音或英文名"
          type="text"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'')"
          maxlength="10"
        />
      </div>
    </div>
    <div class="flex-row space-between input-line">
      <div class="input-area">
        <div class="label">
          性别
        </div>
        <el-select
          v-model="passenger.gender"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="g in [{label: '男', value: 'F'}, {label: '女', value: 'M'}]"
            :key="'gender' + g.value"
            :label="g.label"
            :value="g.value"
          />
        </el-select>
      </div>
      <div class="input-area">
        <div class="label">
          出生日期
        </div>
        <el-date-picker
          v-model="passenger.birthday"
          size="mini"
          type="date"
          placeholder="选择日期"
        />
      </div>
    </div>
    <div class="flex-row space-between input-line">
      <div class="input-area">
        <div class="label">
          国籍
        </div>
        <el-select
          v-model="passenger.nationality"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item_2 in [
              {label: '中国', value: 'CN'},
              {label: '香港', value: 'HK'},
              {label: '澳门', value: 'MO'}]"
            :key="item_2.value+'e'"
            :label="item_2.label"
            :value="item_2.value"
          />
        </el-select>
      </div>
      <div class="input-area">
        <div class="label">
          证件类型
        </div>
        <el-select
          v-model="passenger.cardType"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item_3 in [
              {label: '护照', value: 'PP'},
              {label: '港澳通行证', value: 'GA'},
              {label: '台湾通行证', value: 'TW'},
              {label: '台胞证', value: 'TB'},
              {label: '回乡证', value: 'HX'},
              {label: '国际海员证', value: 'HY'}]"
            :key="item_3.value+'f'"
            :label="item_3.label"
            :value="item_3.value"
          />
        </el-select>
      </div>
    </div>
    <div class="flex-row space-between input-line">
      <div class="input-area">
        <div class="label">
          证件号码
        </div>
        <el-input
          v-model="passenger.cardNum"
          size="mini"
          placeholder="最大15个字符"
          maxlength="15"
          onkeyup="value=value.replace(/[\W]/g,'') "
          onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
        />
      </div>
      <div class="input-area">
        <div class="label">
          证件有效期
        </div>
        <el-date-picker
          v-model="passenger.cardExpired"
          size="mini"
          type="date"
          placeholder="选择日期"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassangerInfoCard',
  props: {
    passenger: {
      type: Object,
      default: function () {
        return {
          familyName: '',
          givenName: '',
          ageType: 0,
          birthday: '',
          gender: '',
          cardNum: '',
          cardType: '',
          cardIssuePlace: '',
          cardExpired: '',
          nationality: '',
          mobile: '',
          airlineCode: '',
          airlineCardNo: ''
        }
      }
    },
    label: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
</style>
