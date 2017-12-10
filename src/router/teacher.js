import Teacher from 'pages/Teacher'

import MyTeacherInfo from 'components/Teacher/MyInfo'
import EditInfo from 'components/Teacher/ChangeInfo'

import TeacherProjectInfo from 'components/Teacher/Manage/ProjectManage/ProjectInfo'
import TeacherProjectMember from 'components/Teacher/Manage/ProjectManage/ProjectMember'

import TeacherGroupInfo from 'components/Teacher/Manage/GroupManage/GroupInfo'
import TeacherGroupMember from 'components/Teacher/Manage/GroupManage/GroupMember'

import TeacherDepUnitInfo from 'components/Teacher/Manage/DependentUnitManage/DepUnitInfo'

import TeacherAwardInfo from 'components/Admin/Manage/AwardManage/AwardInfo'
import TeacherAwardMember from 'components/Admin/Manage/AwardManage/AwardMember'

export default [
  {
    'path': '/teacher',
    component: Teacher,
    redirect: '/teacher/MyInfo',
    children: [
      {
        name: 'MyTeacherInfo',
        path: 'MyInfo',
        component: MyTeacherInfo,
      },
      {
        name: 'EditTeacherInfo',
        path: 'editInfo',
        component: EditInfo,
      },
      {
        name: 'TeacherProjectInfo',
        path: 'TeacherProjectInfo',
        component: TeacherProjectInfo,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目信息管理'
        },
      },
      {
        name: 'TeacherProjectMember',
        path: 'TeacherProjectMember',
        component: TeacherProjectMember,
        meta: {
          iconCode: '&#xe601;',
          firstLevel: '项目管理',
          secondLevel: '项目成员管理'
        },
      },
      {
        name: 'TeacherGroupInfo',
        path: 'TeacherGroupInfo',
        component: TeacherGroupInfo,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队信息管理'
        },
      },
      {
        name: 'TeacherGroupMember',
        path: 'TeacherGroupMember',
        component: TeacherGroupMember,
        meta: {
          iconCode: '&#xe61e;',
          firstLevel: '团队管理',
          secondLevel: '团队成员管理'
        },
      },
      {
        name: 'TeacherDepUnitInfo',
        path: 'TeacherDepUnitInfo',
        component: TeacherDepUnitInfo,
        meta: {
          iconCode: '&#xe9e3;',
          firstLevel: '依托单位信息管理',
          secondLevel: '信息管理'
        },
      },
      {
        name: 'TeacherAwardInfo',
        path: 'TeacherAwardInfo',
        component: TeacherAwardInfo,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖基本信息管理'
        },
      },
      {
        name: 'TeacherAwardMember',
        path: 'TeacherAwardMember',
        component: TeacherAwardMember,
        meta: {
          iconCode: '&#xe631;',
          firstLevel: '获奖管理',
          secondLevel: '获奖成员管理'
        },
      },
    ]
  },
]
