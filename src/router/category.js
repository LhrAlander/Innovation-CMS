/**
 * Created by Alander on 2017/11/12.
 */
// 类别查看
import UserCategory from 'pages/AdminInfoTables/CategoryManage/UserCategory'
import TeamCategory from 'pages/AdminInfoTables/CategoryManage/TeamCategory'
import SupportOrgCategory from 'pages/AdminInfoTables/CategoryManage/SupportOrgCategory'
import ProjectCategory from 'pages/AdminInfoTables/CategoryManage/ProjectCategory'
import ProjectLevel from 'pages/AdminInfoTables/CategoryManage/ProjectLevel'
import AwardLevel from 'pages/AdminInfoTables/CategoryManage/AwardLevel'
import PolicyCategory from 'pages/AdminInfoTables/CategoryManage/PolicyCategory'

export default [
  // 用户类别管理
  {
    path: '/userCategory',
    component: UserCategory
  },
  // 团队类别管理
  {
    path: '/teamCategory',
    component: TeamCategory
  },
  // 依托单位类别管理
  {
    path: '/supportOrgCategory',
    component: SupportOrgCategory
  },
  // 项目类别管理
  {
    path: '/projectCategory',
    component: ProjectCategory
  },
  // 项目级别管理
  {
    path: '/projectLevel',
    component: ProjectLevel
  },
  // 获奖级别管理
  {
    path: '/awardLevel',
    component: AwardLevel
  },
  // 政策类别管理
  {
    path: '/policyCategory',
    component: PolicyCategory
  },
]
