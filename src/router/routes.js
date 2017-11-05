import Error from 'pages/Error'
import Index from 'pages/Index'
import Admin from 'pages/Admin'
import UserInfo from 'components/Admin/Manage/UserManage/UserInfo'
import GroupCategory from 'components/Admin/Manage/GroupManage/GroupCategory'

// 管理员查看表单
import CheckRouterView from 'pages/AdminInfoTables/AdminInfoBaseRouterView'
import UserCategory from 'pages/AdminInfoTables/UserManage/UserCategory'

export default [
  {
    'path': '/',
    component: Index
  },
  {
    'path': '/admin',
    component: Admin,
    redirect: '/admin/userinfo',
    children: [
      {
        name: 'userinfo',
        path: 'userinfo',
        component: UserInfo
      }
    ]
  },
  {
    'path': '/check',
    component: CheckRouterView,
    children: [
      {
        meta: {
          checkMode: true,
          tableName: "userInfo"
        },
        path: 'userInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: true,
          tableName: "teacherInfo"
        },
        path: 'teacherInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: true,
          tableName: "companyInfo"
        },
        path: 'companyInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: true,
          tableName: "studentInfo"
        },
        path: 'studentInfo/:userId',
        component: CheckRouterView
      },
    ]
  },
  {
    'path': '/edit',
    component: CheckRouterView,
    children: [
      {
        meta: {
          checkMode: false,
          tableName: "userInfo"
        },
        path: 'userInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: false,
          tableName: "teacherInfo"
        },
        path: 'teacherInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: false,
          tableName: "companyInfo"
        },
        path: 'companyInfo/:userId',
        component: CheckRouterView
      },
      {
        meta: {
          checkMode: false,
          tableName: "studentInfo"
        },
        path: 'studentInfo/:userId',
        component: CheckRouterView
      },
    ]
  },
  {
    path: '/usercategory',
    component: UserCategory
  }
]
