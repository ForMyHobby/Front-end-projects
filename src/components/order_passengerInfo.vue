<template>
  <div class="passengerInformation">
    <div>
      <span class="number">{{ count+1 }}</span>
      <span class="ageType">{{ ageType(passenger.ageType) }}</span>
      <span class="gender">{{ gender(passenger.gender) }}</span>
      <span class="name">{{ passenger.name }}</span>(姓/名)
    </div>
    <hr>
    <el-row>
      <el-col :span="4">
        <div>
          <p class="columnNames">
            出生日期
          </p>
          <p> {{ passenger.birthday }}</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <p class="columnNames">
            证件号
          </p>
          <p> {{ passenger.cardNum }}</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <p class="columnNames">
            证件有效期
          </p>
          <p>{{ passenger.cardExpired }} </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <p class="columnNames">
            国籍
          </p>
          <p class="nationality">
            {{ passenger.nationality }}
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <p class="columnNames">
            票号
          </p>
          <p>{{}} </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'OrderPassengerInfo',
  props: {
    passenger:
    { type: Object,
      default: function () {
        return { message: '单程航线信息' }
      } },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ageType (value) {
      let type
      switch (value) {
        case 0: type = '成人'; break
        case 1: type = '儿童'; break
        case 2: type = '婴儿'; break
        case -1: type = '留学生'; break
      }
      return type
    },
    gender (value) {
      let a
      switch (value) {
        case 'M': a = '男'; break
        case 'F': a = '女'; break
      }
      return a
    }
  }
}
</script>
<style lang="less" scoped>
.number{
  background-color: rgba(70,130,180,0.4);
  padding:3px 5px;
  margin:5px;
}
.passengerInformation{
     margin:18px 10px;
     border:1px dotted gray;
     padding:20px 10px;
     background-color: rgba(230,230,250,0.1);
}
.gender{
     margin:5px 20px;
}
.name{
   margin-left:25px;
   color:rgba(30,144,255);
}
.columnNames{
    color:rgba(119,136,153);
}
.nationality{
     color:rgba(30,144,255);
}
</style>
