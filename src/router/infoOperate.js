/**
 * Created by Alander on 2017/11/21.
 */

import UserInfoAdmin from 'pages/AdminInfoTables/UserManage/UserInfo'
import StudentInfoAdmin from 'pages/AdminInfoTables/UserManage/StudentInfo'
import TeacherInfoAdmin from 'pages/AdminInfoTables/UserManage/TeacherInfo'
import CompanyInfoAdmin from 'pages/AdminInfoTables/UserManage/CompanyInfo'

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
import RecruitmentCheck from 'pages/AdminInfoTables/RecruitmentManage/RecruitmentCheck'
import Recruitment from 'pages/AdminInfoTables/RecruitmentManage/Recruitment'
import RecruitmentAdd from 'pages/AdminInfoTables/RecruitmentManage/RecruitmentAdd'
import RecruitSignUp from 'pages/AdminInfoTables/RecruitSignUp/SignUp'
import RecruitSignUpCheck from 'pages/AdminInfoTables/RecruitSignUp/SignUpCheck'
import RecruitSignUpAdd from 'pages/AdminInfoTables/RecruitSignUp/SignUpAdd'
import PendProjectAdd from 'pages/AdminInfoTables/ProjectManage/PendProjectAdd'
import PendProjectCheck from 'pages/AdminInfoTables/ProjectManage/PendProjectCheck'
import PendProject from 'pages/AdminInfoTables/ProjectManage/PendProjectInfo'

export default [
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
  // 立项添加
  {
    name: "PendProjectAdd",
    path: '/add/pendProjectInfo',
    component: PendProjectAdd
  },
  {
    name: "PendProjectCheck",
    path: '/check/pendProjectInfo/:id',
    component: PendProjectCheck
  },
  {
    name: "PendProject",
    path: '/edit/pendProjectInfo/:id',
    component: PendProject
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
    path: "/add/notificationInfo/:id",
    component: NotificationAdd
  },
  // 通知公告信息查看
  {
    name: "NotificationInfoCheck",
    path: "/check/notificationInfo/:id",
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
    path: "/check/fileInfo/:id",
    component: FileInfoAdminCheck
  },
  // 招募信息查看
  {
    name: "RecruitmentInfoCheck",
    path: "/check/recruitmentInfo/:id",
    component: RecruitmentCheck
  },
  // 招募信息编辑
  {
    name: "RecruitmentInfoEdit",
    path: "/edit/recruitmentInfo/:id",
    component: Recruitment
  },
   // 招募制度信息添加
   {
    name: "RecruitmentInfoAdd",
    path: "/add/recruitmentInfo",
    component: RecruitmentAdd
  },
  // 招募报名信息查看
  {
    name: "RecruitSignUpInfoCheck",
    path: "/check/recruitSignUpInfo/:id",
    component: RecruitSignUpCheck
  },
  // 招募报名信息编辑
  {
    name: "RecruitSignUpInfoEdit",
    path: "/edit/recruitSignUpInfo/:id",
    component: RecruitSignUp
  },
  // 增加招募报名信息
  {
    name: "RecruitSignUpInfoAdd",
    path: "/add/recruitSignUpInfo",
    component: RecruitSignUpAdd
  },
]
