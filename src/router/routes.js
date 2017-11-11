import Error from 'pages/Error'
import Index from 'pages/Index'
import Admin from 'pages/Admin'

import UserInfo from 'components/Admin/Manage/UserManage/UserInfo'
import StudentInfo from 'components/Admin/Manage/UserManage/StudentInfo'
import TeacherInfo from 'components/Admin/Manage/UserManage/TeacherInfo'
import Role from 'components/Admin/Manage/UserManage/Role'
import Others from 'components/Admin/Manage/UserManage/Others'

import ProjectCategory from 'components/Admin/Manage/ProjectManage/ProjectCategory'
import ProjectInfo from 'components/Admin/Manage/ProjectManage/ProjectInfo'
import ProjectLevel from 'components/Admin/Manage/ProjectManage/ProjectLevel'
import ProjectMember from 'components/Admin/Manage/ProjectManage/ProjectMember'

import GroupCategory from 'components/Admin/Manage/GroupManage/GroupCategory'
import GroupInfo from 'components/Admin/Manage/GroupManage/GroupInfo'
import GroupMember from 'components/Admin/Manage/GroupManage/GroupMember'

import GovCategory from 'components/Admin/Manage/GovernmentManage/GovCategory'
import GovInfo from 'components/Admin/Manage/GovernmentManage/GovInfo'
import InfoStatus from 'components/Admin/Manage/GovernmentManage/InfoStatus'

import FileAndSystem from 'components/Admin/Manage/FileAndSystemManage/FileAndSystem'

import DepUnitCategory from 'components/Admin/Manage/DependentUnitManage/DepUnitCategory'
import DepUnitInfo from 'components/Admin/Manage/DependentUnitManage/DepUnitInfo'

import Class from 'components/Admin/Manage/BasicInfoManage/Class'
import Department from 'components/Admin/Manage/BasicInfoManage/Department'
import InstituteInfo from 'components/Admin/Manage/BasicInfoManage/InstituteInfo'
import Specialty from 'components/Admin/Manage/BasicInfoManage/Specialty'

import AwardCategory from 'components/Admin/Manage/AwardManage/AwardCategory'
import AwardInfo from 'components/Admin/Manage/AwardManage/AwardInfo'
import AwardLevel from 'components/Admin/Manage/AwardManage/AwardLevel'
import AwardMember from 'components/Admin/Manage/AwardManage/AwardMember'

// 管理员查看表单
import UserCategory from 'pages/AdminInfoTables/UserManage/UserCategory'
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
        component: UserInfo
      },
      {
        name: 'TeacherInfo',
        path: 'TeacherInfo',
        component: TeacherInfo
      },
      {
        name: 'Role',
        path: 'Role',
        component: Role
      },
      {
        name: 'StudentInfo',
        path: 'StudentInfo',
        component: StudentInfo
      },
      {
        name: 'Others',
        path: 'Others',
        component: Others
      },
      {
        name: 'ProjectCategory',
        path: 'ProjectCategory',
        component: ProjectCategory
      },
      {
        name: 'ProjectInfo',
        path: 'ProjectInfo',
        component: ProjectInfo
      },
      {
        name: 'ProjectLevel',
        path: 'ProjectLevel',
        component: ProjectLevel
      },
      {
        name: 'ProjectMember',
        path: 'ProjectMember',
        component: ProjectMember
      },
      {
        name: 'GroupCategory',
        path: 'GroupCategory',
        component: GroupCategory
      },
      {
        name: 'GroupInfo',
        path: 'GroupInfo',
        component: GroupInfo
      },
      {
        name: 'GroupMember',
        path: 'GroupMember',
        component: GroupMember
      },
      {
        name: 'GovCategory',
        path: 'GovCategory',
        component: GovCategory
      },
      {
        name: 'GovInfo',
        path: 'GovInfo',
        component: GovInfo
      },
      {
        name: 'InfoStatus',
        path: 'InfoStatus',
        component: InfoStatus
      },
      {
        name: 'FileAndSystem',
        path: 'FileAndSystem',
        component: FileAndSystem
      },
      {
        name: 'DepUnitCategory',
        path: 'DepUnitCategory',
        component: DepUnitCategory
      },
      {
        name: 'DepUnitInfo',
        path: 'DepUnitInfo',
        component: DepUnitInfo
      },
      {
        name: 'Class',
        path: 'Class',
        component: Class
      },
      {
        name: 'Department',
        path: 'Department',
        component: Department
      },
      {
        name: 'InstituteInfo',
        path: 'InstituteInfo',
        component: InstituteInfo
      },
      {
        name: 'Specialty',
        path: 'Specialty',
        component: Specialty
      },
      {
        name: 'AwardCategory',
        path: 'AwardCategory',
        component: AwardCategory
      },
      {
        name: 'AwardInfo',
        path: 'AwardInfo',
        component: AwardInfo
      },
      {
        name: 'AwardLevel',
        path: 'AwardLevel',
        component: AwardLevel
      },
      {
        name: 'AwardMember',
        path: 'AwardMember',
        component: AwardMember
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

  // 用户类别管理
  {
    path: '/usercategory',
    component: UserCategory
  }
]
