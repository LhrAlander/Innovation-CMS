import Project from '@/pages/Projects/Project'
import Policy from '@/pages/Policys/Policy'
import File from '@/pages/FileSystems/FileSystem'
import Notification from '@/pages/Notifications/Notification'
import Team from '@/pages/Teams/Team'

export default [
  {
    name: 'ProjectIndex',
    path: '/projects',
    component: Project,
  },
  {
    name: 'PolicyIndex',
    path: '/policys',
    component: Policy,
  },
  {
    name: 'FileIndex',
    path: '/fileSystems',
    component: File,
  },
  {
    name: 'NotificationIndex',
    path: '/notifications',
    component: Notification,
  },
  {
    name: 'TeamIndex',
    path: '/teams',
    component: Team,
  },
]