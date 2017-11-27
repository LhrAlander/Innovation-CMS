/**
 * Created by Alander on 2017/11/21.
 */

import DependentUnitInfo from 'pages/AdminInfoTables/DependentUnitManage/DependentUnitInfo'
import TeamInfoAdmin from 'pages/AdminInfoTables/TeamManage/TeamInfo'
import ProjectInfoAdmin from 'pages/AdminInfoTables/ProjectManage/ProjectInfo'
import AwardInfoAdmin from 'pages/AdminInfoTables/AwardManage/AwardInfo'
import PolicyInfoAdmin from 'pages/AdminInfoTables/PolicyManage/PolicyInfo'
import NotificationInfoAdmin from 'pages/AdminInfoTables/NotificationManage/NotificationInfo'
import FileInfoAdmin from 'pages/AdminInfoTables/FileManage/FileInfo'

export default [
  // 团队基本信息查看
  {
    'path': '/check/teamInfo/:teamId',
    component: TeamInfoAdmin
  },
  // 依托单位基本信息
  {
    path: "/check/depUnitInfo/:id",
    component: DependentUnitInfo
  },
  // 项目基本信息
  {
    path: "/check/projectInfo/:id",
    component: ProjectInfoAdmin
  },
  // 获奖基本信息
  {
    path: "/check/awardInfo/:id",
    component: AwardInfoAdmin
  },
  // 政府政策信息
  {
    name: "PolicyInfo",
    path: "/check/policyInfo/:id",
    component: PolicyInfoAdmin
  },
  // 通知公告信息
  {
    name: "NotificationInfo",
    path: "/check/notificationInfo/:id",
    component: NotificationInfoAdmin
  },
  // 文件制度信息
  {
    name: "FileInfo",
    path: "/check/fileInfo/:id",
    component: FileInfoAdmin
  }
]
