import Project from '@/pages/Projects/Project'
//项目详细界面
import ProjectDetail from '@/pages/Projects/ProjectDetail'
import Policy from '@/pages/Policys/Policy'
//政策详细界面
import PolicyDetail from '@/pages/Policys/PolicyDetail'
import File from '@/pages/FileSystems/FileSystem'
//文件详情界面
import FileDetail from '@/pages/FileSystems/FileSystemDetail'
import Notification from '@/pages/Notifications/Notification'
//通知公告详情界面
import NotificationDetail from '@/pages/Notifications/NotificationDetail'
import Team from '@/pages/Teams/Team'
//团队详细界面
import TeamDetail from '@/pages/Teams/TeamDetail'
// 获奖界面
import Award from '@/pages/Awards/Award'
// 招聘界面
import Recruitment from '@/pages/Recruitment/Recruitment'
// 招聘详细界面
import RecruitmentDetail from '@/pages/Recruitment/RecruitmentDetail'
// 立项界面
import PendProject from '@/pages/PendProjects/Project'
// 立项详细界面
import PendProjectDetail from '@/pages/PendProjects/PendProjectDetail'

export default [
  {
    name: 'ProjectIndex',
    path: '/projects',
    component: Project,
  },
  //项目详细界面路由
  {
    name: 'ProjectDetail',
    path: '/projectDetail/:id',
    component: ProjectDetail,
  },
  {
    name: 'PolicyIndex',
    path: '/policys',
    component: Policy,
  },
  //政策详细界面路由
  {
    name: 'PolicyDetail',
    path: '/policysDetail/:id',
    component: PolicyDetail,
  },
  {
    name: 'FileIndex',
    path: '/fileSystems',
    component: File,
  },
  // 文件详情界面路由
  {
    name: 'FileDetail',
    path: '/fileDetail/:id',
    component: FileDetail,
  },
  {
    name: 'NotificationIndex',
    path: '/notifications',
    component: Notification,
  },
  //通知公告详情界面路由
  {
    name: 'NotificationDetail',
    path: '/notificationsDetail/:id',
    component: NotificationDetail,
  },
  {
    name: 'TeamIndex',
    path: '/teams',
    component: Team,
  },
   //团队详细界面路由
   {
    name: 'TeamDetail',
    path: '/teamDetail/:id',
    component: TeamDetail,
  },
  // 获奖详细界面路由
  {
    name: 'AwardIndex',
    path: '/awards',
    component: Award
  },
  // 招聘详细界面路由
  {
    name: 'Recruitment',
    path: '/recruitments',
    component: Recruitment
  },
  // 招聘详细界面路由
  {
    name: 'RecruitmentDetail',
    path: '/recruitmentDetail/:id',
    component: RecruitmentDetail
  },
  // 立项界面路由
  {
    name: 'PendProject',
    path: '/pendProjects',
    component: PendProject
  },
  // 立项详细界面
  {
    name: 'PendProjectDetail',
    path: '/pendProjectDetail/:id',
    component: PendProjectDetail
  }
]