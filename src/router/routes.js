import Index from 'pages/Index'
import Admin from 'pages/Admin'
import UserInfo from 'components/Admin/Manage/UserManage/UserInfo'
import GroupCategory from 'components/Admin/Manage/GroupManage/GroupCategory'

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
  }
]
