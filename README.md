# 项目介绍
#### 这个项目是我仿照公司的一个实际商业项目“国际机票订票系统”的前端部分，自己做的一个前端项目。
#### 这个前端项目的主要内容包含三大部分部分：机票搜索（search），用户信息填写（fillinfo），订单生成界面（order）。
使用element ui实现页面的布局和美化，
vue-router实现搜索，用户信息，订单页面之间的跳转，配合路由钩子函数实现在页面的url上挂载和获取数据。
axios拦截,实现本地json文件内数据的获取



## 技术栈
```
vue2 + vuex + vue-router + webpack + ES6/7 + less + element-ui
```
## 依赖模块

```
axios @0.18.0          (一个常用的http请求库，可以实现全局请求拦截，响应拦截)
babel-preset-env@1.7.0（是一个智能预设，可以让你使用最新的JavaScript，而无需微观管理您的目标环境需要哪些语法转换）
core-js @2.6.5         （用于JavaScript的模块化标准库）
element-ui @2.8.2      （Element UI 是一套采用 Vue 2.0 作为基础框架实现的组件库，可以方便对网页的美化和设计）
js-base64: @2.5.1      （用于对数据进行64位的加密，本项目中用于对传递到url上的数据进行64位的加密）
less @3.9.0            （Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。）
moment @2.24.0         （javascript日期处理类库）
vue-loader @15.7.1     （解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，
                         再分别把它们交给对应的 Loader 去处理）
vue-router @3.0.1      （Vue Router 是 Vue.js 官方的路由管理器）
vuex @3.1.1            （一个专为 Vue.js 应用程序开发的状态管理模式）
eslint @5.16.0         （一个插件化的javascript代码检测工具。）
```
## 代码目录
```
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- docs/                                   ---存放本地的json文件
+-- css/                                    --- awsome引用文件  
+-- public/                                 
|   +-- index.html							     ---首页入口html文件
+-- src/                                    ---主要代码 
|   +-- common                              
|   |    +-- api.js                       --- 对本地json数据进行获取的js文件
|   +-- components                     ---所有可复用组件，公用组件
|   |    +-- baggage                       ---行李信息组件
|   |    |    --- ...   
|   |    +-- contact_information           --- 填写乘客的联系人信息
|   |    |    --- ...   
|   |    +-- order_information             ---订单信息
|   |    |    --- ...   
|   |    +-- order_passengerInfo           ---order_detail页面中，订单中的乘客信息
|   |    |    --- ...   
|   |    +-- passanger_info_card           ---fill_info页面，填写乘客信息的组件
|   |    |    --- ...   
|   |    +-- passenger_fee                 --- 显示乘客的航程费用
|   |    |    --- ...   
|   |    +-- rule                          ---退改签规则
|   |    |    --- ...   
|   |    +-- ticket                        ---显示用户给定搜索条件下，所有的航班信息
|   |    |    --- ...   
|   |    +-- trip_price                    --- 航班信息中的，单个成人的机票价格。
|   |    |    --- ...   
|   |    +-- trip_top                      ---航班信息中的航程信息：出发，到达地点，机场，时间
|   +-- layouts                              
|   |    +-- admin
|   +-- less                               --- 
|   +-- pages                     ---所有的页面
|   |    +-- fill_info                         ---乘客信息填写界面
|   |    |    --- ...    
|   |    +-- order_detail                      ---订单详情界面
|   |    |    --- ...   
|   |    +-- order_list                        ---订单列表页面
|   |    |    --- ...   
|   |    +-- pay                               ---用户支付界面
|   |    |    --- ...   
|   |    +-- search                            ---搜索界面
|   |    |    --- ... 
|   |    +-- user_info                         ---用户信息界面
|   +-- router                               --- 路由相关
|   |    +-- index.js                      --- 整个项目的路由配置
|   --- App                             --- 组件入口文件
--- .eslintrc.js                   --- 自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json                   --- 指定所有需要导入的包极其版本
--- package-lock.json              --- 会描述上一次package.json更改后的确切的依赖管理树. 里面包含了唯一的版本号和相关的包信息
--- babelrc                        --- 用来设置转码的规则和插件的
--- .eslintrc.js                   ---用来管理和检测js代码风格的工具
--- .gitignore.js                  --- 指定git上传代码时，忽略一些文件（如哪些系统自生成以及由其它文件生成的文件）。

```


## 项目业务

### 搜索界面

用户动态输入机票搜索条件（出发，到达地点，出发日期，人数，航程类型：单程/往返），
选择相应航班。点击订票按钮进入fillinfo界面的同时，
把搜索条件和选定航班信息传递给fillinfo界面。

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/search2.PNG)

### 用户信息填写界面

```
用户按照指定格式去填写信息，包括：乘客个人信息，联系人信息。
在页面正上方会显示航班信息，便于用户浏览，
页面右侧会更具用户选择的航班以及乘客类型及人数，
自动的计算出当前订单所需支付的金额。
在提交个人信息的同时，系统自动生成一个包含乘客信息和航班信息的订单。
同时跳转到支付界面，把用户支付所需的信息挂载到支付页面的url上（支付功能尚未实现）
```

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/fillinfo2.PNG)


### 订单页面

```
订单页面包含该用户的所有过往订单信息
，通过点击订单编号，用户可跳转至订单详情页面。
显示航班信息，乘客信息，联系人信息，订单票价详情。
```

订单列表页面

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/order-list.PNG)

订单详情

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/order-detail.PNG)


## 业务实现

## search页面


### 整个项目的页面布局结构，


```
是在layouts文件夹下方的 admin.vue组件进行控制的。
它使用Container 布局容器进行布局控制。整体框架是<el-header>+<el-main>
每个页面的header部分都是相同的，可变，需要修改的只是在el-main下面的布局。
它控制整个项目，不同界面都是包含在同一个大的框架布局下。
在无特殊需要的情况下，保证整个项目界面风格的统一。
```

### 航班信息的显示

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/searche_big.PNG)

在search页面中调用 api.js中的doSearch函数
api.js中的dosearch函数会获取来自 docs文件夹下sample_order_list.json中的数据
最后传递给组件 ticket
封装一个组件 ticket，通过从json中获取的数据，
显示不同航班的信息。

```
一个ticket组件中又嵌套有两个小组件：
trip_price和trip_top 分别用于显示每个航程的 价格信息和  航班行程信息
通过从本地的json文件中去获取数据，把获取的数据和element ui配合使用，实现数据的显示
```
航班详细信息
![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/search_trip_top.PNG)

航班价格信息

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/search_trip_price.PNG)

```
 <ticket
                v-for="(item, index) in solutions"
                :key="index"
                :item="item"
                :query="query"
                @doPreOrder="doPreOrder(item)"
              />
在search.vue组件中调用api.js中的doSearch函数，获取航班信息。
   let res = await doSearch(lastRequestParam)
 
 api,js文件中
 async function doSearch (data) {
  const ret = await doFlyPigApi('/flight/search', data)
  return ret
}
```

### 搜索条件的实现

单程

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/searche_condition_1.PNG)

往返

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/search_condition_2.PNG)

```
使用 element ui的 el-autocomplete可带输入建议的输入框组件，
el-date-picker日期选择组件，el-select选择器组件。

为单程，往返按钮设置监听事件，使用v-if条件渲染属性，
对返回日期组件el-date-picker的渲染与否进行控制。
```

### search页面左边可伸缩筛选条件的实现。

通过使用element ui的el-menu导航组件。

### 实现search页面跳转之后，回退search页面依然保留有用户之前输入的搜索条件。

在用户点击搜索按钮之后，调用submit函数：
把用户输入选择的搜索条件使用 router的replace方法，替换当前页面url为，
当前页面的url+搜索条件

```
this.$router.replace(this.$route.path + '?data=' + data)
```

使用router的导航守卫函数beforeRouteEnter，
在该函数内实现当前页面url上挂载数据的获取，
同时把获取的数据，传递给data中的相应变量。
因为在程序自调用beforeRouteEnter函数的时候，
组件实列还没有被创建，也就实现了data中相应变量的初始化。

```
beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!to.query.data) {
        return
      }
      try {
        const decrypt = JSON.parse(Base64.decode(to.query.data))
        vm.search.adultCount = decrypt.adultNumber
        vm.search.childCount = decrypt.childNumber
        vm.search.departureCode = decrypt.fromCity
        vm.search.arriveCode = decrypt.toCity
        vm.search.departureDate = moment(decrypt.fromDate).format('YYYY-MM-DD')
        vm.search.returnDate = moment(decrypt.retDate).format('YYYY-MM-DD')
        vm.request()
      } catch (error) {
        vm.search.departureCode = 'PEK'
        vm.search.arriveCode = 'TPE'
        vm.search.departureDate = moment().add(7, 'days').format('YYYY-MM-DD')
        vm.search.returnDate = moment().add(7, 'days').format('YYYY-MM-DD')
        vm.search.adultCount = 1
        vm.search.childCount = 0
        vm.search.cabinClass = 1
        vm.search.airLine = ''
        vm.$router.replace(vm.$route.path)
      } finally {
        next()
      }
    })
  }
```

所以当用户在search页面完成搜索条件的输入，并且跳转到其它页面后。
当用户在search页面跳转之后，回退到search页面。
search页面依然保留有用户之前输入的搜索条件。

### 通过vue-router实现页面之间的跳转。

使用push方法实现路由页面跳转,path配合query属性实现参数的挂载和传递

```
this.$router.push({ path: '/fillinfo', query: { data } })
```

router文件夹下的默认文件index.js,路由的配置

```
 path: '/',
      name: 'HomePage',
      component: LayoutAdmin,
      children: [
        {
          path: '',
          redirect: 'Search'
        },
        {
          path: '/search',
          component: Search,
          meta: {
            // 验证登录
            requireAuth: true,
            // 验证用户账户状态必须为 SUCCESS
            isVerifyStatus: true
          }
        },
        {
          path: '/fillinfo',
          component: FillInfo,
          meta: {
            requireAuth: true,
            isVerifyStatus: true
          }
        },
```

### 在admin.vue中的aside上实现页面的全局跳转

通过使用el-menu组件实现，导航菜单的弹出效果。
点击不同导航选项相应的监听事件进行响应，通过使用路由跳转的方法，进行不同页面的跳转。

```
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
```


## fillinfo页面

```
整个页面内部包含的信息都被组件化。
组件化，vue中最重要的思想。
可以分为六个部分的组件，分别为：
trip_top组件（航班信息显示，这个组件在search和fill_info都被使用。组件的复用），passenger_info_card（乘客信息的输入）,
contact_information组件（联系人信息），passenger_fee组件（订单费用详情组件），
rule组件（退改签信息显示），baggage组件（乘客行李信息显示）
```

### passenger_info_card组件

在用户填写相关信息时，通过正则表达式的使用，来限制用户输入输入的数据类型和数据格式。
限制乘客姓名只能输入  中文或英文字符，且长度限制为10

```
<el-input
          v-model="passenger.familyName"
          size="mini"
          placeholder="姓名或者英文姓"
          type="text"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'')"
          maxlength="10"
        />
```

### rule组件和baggage组件

乘客行李信息

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/fillinfo_baggage.PNG)

改退签规则

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/fillinfo_rule.PNG)

它们的数据来源都是本地的 sample_revalidate_resp.json文件

### passenger_info_card组件

数据来源：search页面传递过来的 乘客人数和航班票价信息。

### 使用awsome图标库，配合element ui组件进行使用。美化界面

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/fillinfo_passenger_fee.PNG)

```
<el-col :span="12">
          <i
            class="fa fa-user-circle"
            aria-hidden="true"
          />
          {{ '成人 X ' + adultPriceDetail.count }}
        </el-col>
```

## oeder-list(订单列表页面)

```
页面筛选条件部分，通过使用Layout 布局，一行排列四个元素。对筛选条件进行展示。

订单列表部分，通过使用el-table组件实现订单信息的展示。
订单的数据来源，本地的sample_order_list.json文件。
（因为只有网页前端部分，故未构造服务器，不能实现对本地数据文件的动态修改）
```

通过使用moment库，对本地生成获取到的事件字符串进行格式化输出显示。

```
 createdAt: moment(o.createdAt).format('YYYY-MM-DD HH:mm'),
 ```
 
 通过给订单列表中的订单号使用 router-link组件，实现点击订单号进行页面跳转。
 在表格中，给表格的某一列内容添加一个组件或按钮。使用slot-scope属性
 
 ![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/order_list_order.PNG)
 
 ```
  <template slot-scope="scope">
        <router-link
          target="_blank"
          :to="'/order/detail/'+scope.row.orderNo"
        >
          {{ scope.row.orderNo }}
        </router-link>
      </template>
 ```
 
 通过打开一个新的网页， 跳转到order_detail页面。
 把target属性的值设置为  _blank
 
 ```
  target="_blank"
 ```


## order-detail(订单详情页面)

整个页面也被组件化。
直接复用的其它页面的组件：

```
trip_top组件，passenger_fee组件，order_information组件，
rule组件，baggage组件
```

新增组件：

```
order_passengerInfo(乘客信息显示组件)，
```

![images](https://github.com/ForMyHobby/Front-end-projects/blob/master/screenshot/order_detail_passenger.PNG)


## 项目运行

```
克隆项目到本地 
git clone https://github.com/ForMyHobby/Front-end-projects.git

进入文件夹
cd international-flight-ticket

安装依赖
npm install

开启本地服务器localhost:8080
npm run serve

发布环境
npm run build
```


