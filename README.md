# innovation-cms

> 创新创业综合管理与展示平台

* 项目介绍及任务分布在 **文档** 中

## 如何运行项目

``` bash
# 安装依赖包
npm install

# 将项目热部署在 localhost:8080
npm run dev

# 生产发布
npm run build

```


## src目录结构

```shell
│
├─components
│  │  Announcement.vue
│  │  Award.vue
│  │  Carousel.vue
│  │  FriendLink.vue
│  │  LeftAward.vue
│  │  LogAndReg.vue
│  │  MyFooter.vue
│  │  MyHeader.vue
│  │  PolicyAndFile.vue
│  │  RightAward.vue
│  │  TeamDisplay.vue
│  │
│  └─Admin  // 管理员后台管理页面所需组件
│      │  AdminContent.vue
│      │  AdminHead.vue
│      │  VerticalMenu.vue
│      │
│      ├─InfoOperate
│      │  ├─BaseCompent
│      │  │      InfoDisplayTemp.vue
│      │  │
│      │  ├─Category
│      │  │      CategoryTemp.vue
│      │  │
│      │  └─UserInfo
│      │          UserInfoCheck.vue
│      │          UserInfoEdit.vue
│      │
│      └─Manage
│          │  FilterBox.vue
│          │  InfoAdd.vue
│          │  InfoDisplayTemp.vue
│          │
│          ├─AwardManage
│          │      AwardCategory.vue
│          │      AwardInfo.vue
│          │      AwardLevel.vue
│          │      AwardMember.vue
│          │
│          ├─BasicInfoManage
│          │      Class.vue
│          │      Department.vue
│          │      InstituteInfo.vue
│          │      Specialty.vue
│          │
│          ├─DependentUnitManage
│          │      DepUnitCategory.vue
│          │      DepUnitInfo.vue
│          │
│          ├─FileAndSystemManage
│          │      FileAndSystem.vue
│          │
│          ├─GovernmentManage
│          │      GovCategory.vue
│          │      GovInfo.vue
│          │      InfoStatus.vue
│          │
│          ├─GroupManage
│          │      GroupCategory.vue
│          │      GroupInfo.vue
│          │      GroupMember.vue
│          │
│          ├─Notification
│          │      Notification.vue
│          │
│          ├─ProjectManage
│          │      ProjectCategory.vue
│          │      ProjectInfo.vue
│          │      ProjectLevel.vue
│          │      ProjectMember.vue
│          │
│          └─UserManage
│                  Others.vue
│                  Role.vue
│                  StudentInfo.vue
│                  TeacherInfo.vue
│                  UserInfo.vue
│
├─pages      // 各个独立页面
│  │  Admin.vue
│  │  Error.vue
│  │  Index.vue
│  │
│  └─AdminInfoTables    // 各种信息的查看页面
│      ├─AwardManage
│      │      AwardInfo.vue   // 获奖信息修改页面
│      │
│      ├─CategoryManage   // 各种类别的管理页面
│      │      AwardLevel.vue    // 获奖级别管理
│      │      PolicyCategory.vue    // 政策类别管理
│      │      ProjectCategory.vue     // 项目类别管理
│      │      ProjectLevel.vue          // 项目级别管理
│      │      SupportOrgCategory.vue       // 依托单位类别管理
│      │      TeamCategory.vue      // 团队类别管理
│      │      UserCategory.vue       // 用户类别管理
│      │
│      ├─DependentUnitManage    // 依托单位管理
│      │      DependentUnitInfo.vue  // 依托单位基本信息修改页面
│      │
│      ├─ProjectManage          // 项目管理
│      │      ProjectInfo.vue      // 项目基本信息管理
│      │
│      ├─TeamManage          // 团队管理
│      │      TeamInfo.vue      // 团队基本信息管理
│      │
│      └─UserManage      // 基本用户管理
│              CompanyInfo.vue   // 企业信息管理
│              StudentInfo.vue   // 学生信息管理
│              TeacherInfo.vue  // 教师信息管理
│              UserInfo.vue    // 用户基本信息管理
│
├─router
│      category.js
│      index.js
│      infoOperate.js
│      routes.js
│
└─utils
        utils.js
```


