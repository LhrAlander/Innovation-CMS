import Student from 'pages/Student'

import MyStudentInfo from 'components/Student/MyInfo'
import EditInfo from 'components/Student/ChangeInfo'

import StudentProjectInfo from 'components/Student/Manage/ProjectManage/ProjectInfo'
import StudentProjectMember from 'components/Student/Manage/ProjectManage/ProjectMember'

import StudentGroupInfo from 'components/Student/Manage/GroupManage/GroupInfo'
import StudentGroupMember from 'components/Student/Manage/GroupManage/GroupMember'

import StudentAwardMember from 'components/Student/Manage/AwardManage/AwardMember'

import StudentSignUpStatus from 'components/Student/Manage/SignUpManage/SignUpStatus'

import StudentProjectSignup from 'components/Student/Manage/ProjectManage/ProjectSignup'
import SignupDetail from 'components/Student/Manage/ProjectManage/SignupDetail'
import ProjectPending from 'components/Student/Manage/ProjectManage/ProjectPending'
export default [
  {
    'path': '/student',
    component: Student,
    redirect: '/student/MyInfo',
    children: [
      {
        name: 'MyStudentInfo',
        path: 'MyInfo',
        component: MyStudentInfo,
      },
      {
        name: 'EditStudentInfo',
        path: 'editInfo',
        component: EditInfo,
      },
      {
        name: 'StudentProjectInfo',
        path: 'StudentProjectInfo',
        component: StudentProjectInfo,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目信息管理'
        },
      },
      {
        name: 'StudentProjectMember',
        path: 'StudentProjectMember',
        component: StudentProjectMember,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目成员管理'
        },
      },
      {
        name: 'ProjectPending',
        path: 'ProjectPending',
        component: ProjectPending,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目审核管理'
        },
      },
      {
        name: 'StudentGroupInfo',
        path: 'StudentGroupInfo',
        component: StudentGroupInfo,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队信息管理'
        },
      },
      {
        name: 'StudentGroupMember',
        path: 'StudentGroupMember',
        component: StudentGroupMember,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队成员管理'
        },
      },
      {
        name: 'StudentAwardMember',
        path: 'StudentAwardMember',
        component: StudentAwardMember,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖成员管理'
        },
      },
      {
        name: 'StudentSignUpStatus',
        path: 'StudentSignUpStatus',
        component: StudentSignUpStatus,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '报名管理',
          secondLevel: '报名情况'
        },
      },
      {
        name: 'StudentProjectSignup',
        path: 'StudentProjectSignup',
        component: StudentProjectSignup,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '项目管理',
          secondLevel: '立项申请'
        },
      }
    ]
  },
  {
    path: '/signup/project/:id',
    component: SignupDetail,
    name: 'SignupDetail',
  },
]
