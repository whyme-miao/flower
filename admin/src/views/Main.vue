<template>
    <div class="main">
        <el-container style="height: 100vh">
          <!-- 侧边栏 -->
          <el-aside :width="isCollapse ? '70px' : '250px'">

            <!-- unique-opened只打开一个菜单，如果要用属性绑定，需要冒号，如:unique-opened="true" , 否则unique-opened="true"只表示后面的结果是一个字符串-->
            <el-menu
            style="font-size:20px"
            :default-active="$route.path"
            background-color="#1d1e23"
            text-color="#fff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            active-text-color="#d64b24">
                <!-- 一级菜单  index接收字符串，所有给它后面拼接'' -->
                <el-menu-item>
                    <h1 v-show="!isCollapse">鲜花后台管理系统</h1>
                    <h1 v-show="isCollapse">鲜花</h1>
                </el-menu-item>
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id" >
                    <template slot="title">
                        <i :class="iconsObj[item.id]"></i>
                        <span style="font-size:20px">{{item.listName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/'+subItem.path " v-for="subItem in item.children" :key="subItem.id">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subItem.listName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>

            
          </el-aside>
          <!-- 导航栏和主页面 -->
          <el-container>
            <el-header class="d-flex jc-between ai-center">
                <i class="el-icon-s-home" style="font-size:30px"  @click="toggleCollapse"></i>
                <button>退出</button>  
            </el-header>
            <el-main class="headContainer" >
                <router-view></router-view>
                <el-backtop target=".headContainer">
                    <i class="el-icon-caret-top"></i>
                </el-backtop>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist:[
            {
                "id": 101,
                "listName": "内容管理",
                "path": null,
                "children": [
                    {
                        "id": 1,
                        "listName": "新建分类",
                        "path": "categories/create",
                        "children": []
                    },{
                        "id": 2,
                        "listName": "分类列表",
                        "path": "categories/list",
                        "children": []
                    },
                ]
            },
            {
                "id": 102,
                "listName": "系统管理",
                "path": null,
                "children": [
                    {
                        "id": 11,
                        "listName": "新建管理员",
                        "path": "admin_users/create",
                        "children": []
                    },{
                        "id": 22  ,
                        "listName": "管理员列表",
                        "path": "admin_users/list",
                        "children": []
                    },
                ]
                },
            {
                "id": 103,
                "listName": "顾客管理",
                "path": null,
                "children": [
                    {
                        "id": 1033,
                        "listName": "顾客列表",
                        "path": "users/list",
                        "children": []
                    },
              ]
            },
            {
                "id": 105,
                "listName": "销售管理",
                "path": null,
                "children": [
                    {
                        "id": 1055,
                        "listName": "新建管理员",
                        // "path": "admin_users/create",
                        "children": []
                    },
                ]
            },
            {
                "id": 104,
                "listName": "库存管理",
                "path": null,
                "children": [
                    {
                        "id": 1,
                        "listName": "新建库存",
                        "path": "stocks/create",
                        "children": []
                    },{
                        "id": 2,
                        "listName": "库存列表",
                        "path": "stocks/list",
                        "children": []
                    },
                ]
            },
          
            {
                "id": 106,
                "listName": "鲜花管理",
                "path": null,
                "children": [
                    {
                        "id": 1066,
                        "listName": "新建鲜花",
                        "path": "flowers/create",
                        "children": []
                    },
                    {
                        "id": 166,
                        "listName": "鲜花列表",
                        "path": "flowers/list",
                        "children": []
                    },
                ]
            },
            {
                "id": 107,
                "listName": "鲜花文化",
                "path": null,
                "children": [
                    {
                        "id": 1077,
                    //   "listName": "新建管理员",
                    //   "path": "admin_users/create",
                        "children": []
                    },
                ]
            },
            {
                "id": 108,
                "listName": "查询统计",
                "path": null,
                "children": [
                    {
                        "id": 1088,
                        //   "listName": "新建管理员",
                        //   "path": "admin_users/create",
                        "children": []
                    },
                ]
            },
          
      ],
      iconsObj:{
          '101': 'iconfont icon-gengduoneirong',
          '102': 'iconfont icon-xitongguanli',
          '103': 'iconfont icon-yonghu',
          '104': 'iconfont icon-kucun',
          '105': 'iconfont icon-xiaoshoudingdan',
          '106': 'iconfont icon-shouye',
          '107': 'iconfont icon-wenhua',
          '108': 'iconfont icon-tongji',
      },
      // 是否折叠
      isCollapse: false
    }
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
}

</script>

<style lang="scss">

.el-header{
  background-color:#2a2b30;
  height: 60px;
  color: #fff;
  line-height: 60px;
}
  
.el-aside {
  background-color:  #1d1e23;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 200px;
  .el-menu {
    border-right:0!important;
  }
  .el-menu-item {
        font-size: 18px;
        span {
            color: #669900;
        }
    }
}
// .el-submenu__title {
//    padding: 0px 10px !important;
// }
  
.el-main {
    background-color:#f5f7f9;
    color: #333;
    height: 100vh;
    overflow-x: hidden;
}
.iconfont{
    margin-right: 10px ;
    color: #fff !important;
    font-size:20px !important;
}
</style>