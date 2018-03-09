import Error from 'pages/Error'
import Index from 'pages/Index'
import Admin from 'pages/Admin'

import UserInfo from 'components/Admin/Manage/UserManage/UserInfo'
import StudentInfo from 'components/Admin/Manage/UserManage/StudentInfo'
import TeacherInfo from 'components/Admin/Manage/UserManage/TeacherInfo'
import Others from 'components/Admin/Manage/UserManage/Others'

import ProjectInfo from 'components/Admin/Manage/ProjectManage/ProjectInfo'
import ProjectMember from 'components/Admin/Manage/ProjectManage/ProjectMember'

import Notification from 'components/Admin/Manage/Notification/Notification'

import GroupInfo from 'components/Admin/Manage/GroupManage/GroupInfo'
import GroupMember from 'components/Admin/Manage/GroupManage/GroupMember'

import GovInfo from 'components/Admin/Manage/GovernmentManage/GovInfo'

import FileAndSystem from 'components/Admin/Manage/FileAndSystemManage/FileAndSystem'

import DepUnitInfo from 'components/Admin/Manage/DependentUnitManage/DepUnitInfo'

import Department from 'components/Admin/Manage/BasicInfoManage/Department'


import AwardInfo from 'components/Admin/Manage/AwardManage/AwardInfo'
import AwardMember from 'components/Admin/Manage/AwardManage/AwardMember'

// 管理员查看表单

import LoginAndRegister from 'components/LoginAndRegister'


export default [
  {
    'path': '/',
    component: Index
  },
  {
    name: 'Login',
    path: '/Login',
    component: LoginAndRegister,
  },
  {
    name: 'Register',
    path: '/Register',
    component: LoginAndRegister,
  },
  {
    'path': '/admin',
    component: Admin,
    redirect: '/admin/userinfo',
    children: [
      {
        name: 'UserInfo',
        path: 'UserInfo',
        component: UserInfo,
        meta: {
          iconCode: '&#xe6a0;',
          firstLevel: '用户管理',
          secondLevel: '基本用户信息管理'
        },
      },
      {
        name: 'TeacherInfo',
        path: 'TeacherInfo',
        component: TeacherInfo,
        meta: {
          iconCode: '&#xe6a0;',
          firstLevel: '用户管理',
          secondLevel: '教师信息管理'
        },
      },
      {
        name: 'StudentInfo',
        path: 'StudentInfo',
        component: StudentInfo,
        meta: {
          iconCode: '&#xe6a0;',
          firstLevel: '用户管理',
          secondLevel: '学生信息管理'
        },
      },
      {
        name: 'Others',
        path: 'Others',
        component: Others,
        meta: {
          iconCode: '&#xe6a0;',
          firstLevel: '用户管理',
          secondLevel: '企业及其他人员信息'
        },
      },
      {
        name: 'ProjectInfo',
        path: 'ProjectInfo',
        component: ProjectInfo,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目信息管理'
        },
      },
      {
        name: 'ProjectMember',
        path: 'ProjectMember',
        component: ProjectMember,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目成员管理'
        },
      },

      {
        name: 'Notification',
        path: 'Notification',
        component: Notification,
        meta: {
          iconCode: '&#xe6a4;',
          firstLevel: '通知公告管理'
        },
      },
      {
        name: 'GroupInfo',
        path: 'GroupInfo',
        component: GroupInfo,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队信息管理'
        },
      },
      {
        name: 'GroupMember',
        path: 'GroupMember',
        component: GroupMember,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队成员管理'
        },
      },
      {
        name: 'GovInfo',
        path: 'GovInfo',
        component: GovInfo,
        meta: {
          iconCode: '&#xe618;',
          firstLevel: '政策信息管理',
          secondLevel: '政策信息管理'
        },
      },
      {
        name: 'FileAndSystem',
        path: 'FileAndSystem',
        component: FileAndSystem,
        meta: {
          iconCode: '&#xe64f;',
          firstLevel: '文件与制度管理'
        },
      },
      {
        name: 'DepUnitInfo',
        path: 'DepUnitInfo',
        component: DepUnitInfo,
        meta: {
          iconCode: '&#xe9e3;',
          firstLevel: '依托单位信息管理',
          secondLevel: '信息管理'
        },
      },
      {
        name: 'Department',
        path: 'Department',
        component: Department,
      },
      {
        name: 'AwardInfo',
        path: 'AwardInfo',
        component: AwardInfo,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖基本信息管理'
        },
      },
      {
        name: 'AwardMember',
        path: 'AwardMember',
        component: AwardMember,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖成员管理'
        },
      },
    ]
  }
]
