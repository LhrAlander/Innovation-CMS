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

import Class from 'components/Admin/Manage/BasicInfoManage/Class'
import Department from 'components/Admin/Manage/BasicInfoManage/Department'
import InstituteInfo from 'components/Admin/Manage/BasicInfoManage/InstituteInfo'
import Specialty from 'components/Admin/Manage/BasicInfoManage/Specialty'
import Status from 'components/Admin/Manage/BasicInfoManage/Status'


import AwardCategory from 'components/Admin/Manage/AwardManage/AwardCategory'
import AwardInfo from 'components/Admin/Manage/AwardManage/AwardInfo'
import AwardMember from 'components/Admin/Manage/AwardManage/AwardMember'

// 管理员查看表单
import UserInfoAdmin from 'pages/AdminInfoTables/UserManage/UserInfo'
import StudentInfoAdmin from 'pages/AdminInfoTables/UserManage/StudentInfo'
import TeacherInfoAdmin from 'pages/AdminInfoTables/UserManage/TeacherInfo'
import CompanyInfoAdmin from 'pages/AdminInfoTables/UserManage/CompanyInfo'


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
        name: 'Class',
        path: 'Class',
        component: Class,
        meta: {
          iconCode: '&#xe8d0;',
          firstLevel: '基本信息管理',
          secondLevel: '班级管理'
        },
      },
      {
        name: 'Department',
        path: 'Department',
        component: Department,
        meta: {
          iconCode: '&#xe8d0;',
          firstLevel: '基本信息管理',
          secondLevel: '系部管理'
        },
      },
      {
        name: 'Specialty',
        path: 'Specialty',
        component: Specialty,
        meta: {
          iconCode: '&#xe8d0;',
          firstLevel: '基本信息管理',
          secondLevel: '专业管理'
        },
      },
      {
        name: 'Status',
        path: 'Status',
        component: Status,
        meta: {
          iconCode: '&#xe8d0;',
          firstLevel: '基本信息管理',
          secondLevel: '状态管理'
        },
      },
      {
        name: 'AwardCategory',
        path: 'AwardCategory',
        component: AwardCategory,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖类别管理'
        },
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
  },
  // 基本用户信息查看
  // 用户基本信息查看
  {
    'path': '/check/userInfo/:userId',
    component: UserInfoAdmin,
    meta: {checkMode: true}
  },
  // 学生信息查看
  {
    'path': '/check/studentInfo/:userId',
    component: StudentInfoAdmin,
    meta: {checkMode: true}
  },
  // 教师信息查看
  {
    'path': '/check/teacherInfo/:userId',
    component: TeacherInfoAdmin,
    meta: {checkMode: true}
  },
  // 企业信息查看
  {
    'path': '/check/companyInfo/:userId',
    component: CompanyInfoAdmin,
    meta: {checkMode: true}
  },

  // 基本用户信息编辑
  // 用户基本信息编辑
  {
    'path': '/edit/userInfo/:userId',
    component: UserInfoAdmin,
    meta: {checkMode: false}
  },
  // 学生信息编辑
  {
    'path': '/edit/studentInfo/:userId',
    component: StudentInfoAdmin,
    meta: {checkMode: false}
  },
  // 教师信息编辑
  {
    'path': '/edit/teacherInfo/:userId',
    component: TeacherInfoAdmin,
    meta: {checkMode: false}
  },
  // 企业信息编辑
  {
    'path': '/edit/companyInfo/:userId',
    component: CompanyInfoAdmin,
    meta: {checkMode: false}
  },



]
