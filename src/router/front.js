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

export default [
  {
    name: 'ProjectIndex',
    path: '/projects',
    component: Project,
  },
  //项目详细界面路由
  {
    name: 'ProjectDetail',
    path: '/projectDetail',
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
    path: '/policysDetail',
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
    path: '/fileDetail',
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
    path: '/notificationsDetail',
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
    path: '/teamDetail',
    component: TeamDetail,
  },
]