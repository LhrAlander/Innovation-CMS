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



import PolicyInfoAdd from 'pages/AdminInfoTables/PolicyManage/PolicyInfoAdd'
import PolicyInfoCheck from 'pages/AdminInfoTables/PolicyManage/PolicyInfoCheck'
import NotificationAdd from 'pages/AdminInfoTables/NotificationManage/NotificationAdd'
import NotificationCheck from 'pages/AdminInfoTables/NotificationManage/NotificationCheck'
import FileInfoAdminAdd from 'pages/AdminInfoTables/FileManage/FileInfoAdd'
import FileInfoAdminCheck from 'pages/AdminInfoTables/FileManage/FileInfoCheck'
import DependentUnitInfoCheck from 'pages/AdminInfoTables/DependentUnitManage/DependentUnitInfoCheck'
import TeamInfoCheck from 'pages/AdminInfoTables/TeamManage/TeamInfoCheck'
import ProjectInfoCheck from 'pages/AdminInfoTables/ProjectManage/ProjectInfoCheck'

export default [
  // 团队基本信息编辑
  {
    name: "TeamInfoEdit",
    'path': '/edit/teamInfo/:teamId',
    component: TeamInfoAdmin
  },
  // 团队基本信息查看
  {name: "TeamInfoCheck",
    'path': '/check/teamInfo/:teamId',
    component: TeamInfoCheck
  },
  // 依托单位基本信息编辑
  {
    name: "DependentUnitInfoEdit",
    path: "/edit/depUnitInfo/:id",
    component: DependentUnitInfo
  },
  // 依托单位基本信息查看
  {
    name: "DependentUnitInfoCheck",
    path: "/check/depUnitInfo/:id",
    component: DependentUnitInfoCheck
  },
  // 项目基本信息编辑
  {
    name: "ProjectInfoEdit",
    path: "/edit/projectInfo/:id",
    component: ProjectInfoAdmin
  },
  // 项目基本信息查看
  {
    name: "ProjectInfoCheck",
    path: "/check/projectInfo/:id",
    component: ProjectInfoCheck
  },
  // 获奖基本信息
  {
    path: "/check/awardInfo/:id",
    component: AwardInfoAdmin
  },
  // 政府政策信息编辑
  {
    name: "PolicyInfoEdit",
    path: "/edit/policyInfo/:id",
    component: PolicyInfoAdmin
  },
  // 政府政策信息添加
  {
    name: "PolicyInfoAdd",
    path: "/add/policyInfo",
    component: PolicyInfoAdd
  },
  // 政府政策信息查看
  {
    name: "PolicyInfoCheck",
    path: "/check/policyInfo/:id",
    component: PolicyInfoCheck
  },
  // 通知公告信息编辑
  {
    name: "NotificationInfoEdit",
    path: "/edit/notificationInfo/:id",
    component: NotificationInfoAdmin
  },
  // 通知公告信息添加
  {
    name: "NotificationInfoAdd",
    path: "/add/notificationInfo",
    component: NotificationAdd
  },
  // 通知公告信息查看
  {
    name: "NotificationInfoCheck",
    path: "/check/notificationInfo",
    component: NotificationCheck
  },
  // 文件制度信息编辑
  {
    name: "FileInfoEdit",
    path: "/edit/fileInfo/:id",
    component: FileInfoAdmin
  },
  // 文件制度信息添加
  {
    name: "FileInfoAdd",
    path: "/add/fileInfo",
    component: FileInfoAdminAdd
  },
  // 文件制度信息查看
  {
    name: "FileInfoCheck",
    path: "/add/fileInfo",
    component: FileInfoAdminCheck
  }
]
