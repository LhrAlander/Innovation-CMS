/**
 * Created by Alander on 2017/10/19.
 */

import Index from 'pages/Index'
import Admin from 'pages/Admin'
import UserInfo from 'components/Admin/Manage/UserInfo'

export default [
  {
    'path': '/',
    component: Index
  },
  {
    'path': '/admin',
    component: Admin,
    children: [
      {
        path: 'userinfo',
        component: UserInfo
      }
    ]
  }
]
