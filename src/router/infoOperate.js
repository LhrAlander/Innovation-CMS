/**
 * Created by Alander on 2017/11/21.
 */

import DependentUnitInfo from 'pages/AdminInfoTables/DependentUnitManage/DependentUnitInfo'
import TeamInfoAdmin from 'pages/AdminInfoTables/TeamManage/TeamInfo'
import ProjectInfoAdmin from 'pages/AdminInfoTables/ProjectManage/ProjectInfo'
import AwardInfoAdmin from 'pages/AdminInfoTables/AwardManage/AwardInfo'

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
  }
]
