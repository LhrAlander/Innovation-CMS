import Error from 'pages/Error'
import Index from 'pages/Index'
import Admin from 'pages/Admin'
import UserInfo from 'components/Admin/Manage/UserManage/UserInfo'
import GroupCategory from 'components/Admin/Manage/GroupManage/GroupCategory'

// 管理员查看表单
import CheckRouterView from 'pages/AdminInfoTables/AdminInfoBaseRouterView'
import CheckUserInfo from 'pages/AdminInfoTables/UserManage/UserInfo'

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
        path: 'userInfo/:userId',
        component: CheckUserInfo
      }
    ]
  }
]
