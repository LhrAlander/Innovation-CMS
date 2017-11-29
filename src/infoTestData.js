const INPUT = 1
const SELECT = 2
const RADIO = 3
const SWITCH = 4
const BUTTON = 5
const MALE = 0
const FEMALE = 1

export default {
  adminCheckInfo: {
    users: [
      {
        userBaseInfo: [
          {
            infoTitle: "用户基本信息",
            iconCode: '&#xe62c;',
            items: [
              {
                key: 'userId',
                name: '用户ID',
                value: '12345',
                type: INPUT,
                span: 1
              },{
                key: 'userName',
                name: '姓名',
                value: 'UserName',
                type: INPUT,
                span: 1
              },{
                key: 'userSex',
                name: '性别',
                value: '男',
                type: RADIO,
                radioItems: [
                  {
                    value: '男',
                    label: '男'
                  },
                  {
                    value: '女',
                    label: '女'
                  }
                ],
                span: 1
              },{
                key: 'userEmail',
                name: '邮箱',
                value: '123456789@some.com',
                type: INPUT,
                span: 1
              },{
                key: 'userPhone',
                name: '手机号',
                value: '12345678909',
                type: INPUT,
                span: 1
              },{
                key: 'accountStatus',
                name: '用户状态',
                value: '可用',
                type: SELECT,
                options: [
                  {
                    value: "可用",
                    label: "可用"
                  },
                  {
                    value: "不可用",
                    label: "不可用"
                  }
                ],
                span: 1
              },{
                key: 'userIdentity',
                name: '用户类别',
                value: '学生',
                type: SELECT,
                options: [
                  {
                    value: "学生",
                    label: "学生"
                  },
                  {
                    value: "教师",
                    label: "教师"
                  },
                  {
                    value: "管理员",
                    label: "管理员"
                  }
                ],
                span: 1
              },{
                key: 'userPWD',
                name: '用户密码',
                value: '******',
                type: BUTTON,
                buttonText: "重置密码",
                clickFunName: "resetPWD",
                span: 1
              },{
                key: 'userStatus',
                name: '登录状态',
                value: '在线',
                type: SWITCH,
                activeValue: '在线',
                inactiveValue: '离线',
              },
            ],
            span: 1
          },
        ]
      },
      {
        userBaseInfo: [
          {
            infoTitle: "用户基本信息",
            iconCode: '&#xe62c;',
            items: [
              {
                key: 'userId',
                name: '用户ID',
                value: '23456',
                type: INPUT,
                span: 1
              },{
                key: 'userName',
                name: '姓名',
                value: 'UserName',
                type: INPUT,
                span: 1
              },{
                key: 'userSex',
                name: '性别',
                value: '男',
                type: RADIO,
                radioItems: [
                  {
                    value: '男',
                    label: '男'
                  },
                  {
                    value: '女',
                    label: '女'
                  }
                ],
                span: 1
              },{
                key: 'userEmail',
                name: '邮箱',
                value: '123456789@some.com',
                type: INPUT,
                span: 1
              },{
                key: 'userPhone',
                name: '手机号',
                value: '12345678909',
                type: INPUT,
                span: 1
              },{
                key: 'accountStatus',
                name: '用户状态',
                value: '可用',
                type: SELECT,
                options: [
                  {
                    value: "可用",
                    label: "可用"
                  },
                  {
                    value: "不可用",
                    label: "不可用"
                  }
                ],
                span: 1
              },{
                key: 'userIdentity',
                name: '用户类别',
                value: '学生',
                type: SELECT,
                options: [
                  {
                    value: "学生",
                    label: "学生"
                  },
                  {
                    value: "教师",
                    label: "教师"
                  },
                  {
                    value: "管理员",
                    label: "管理员"
                  }
                ],
                span: 1
              },{
                key: 'userPWD',
                name: '用户密码',
                value: '******',
                type: BUTTON,
                buttonText: "重置密码",
                clickFunName: "resetPWD",
                span: 1
              },{
                key: 'userStatus',
                name: '登录状态',
                value: '在线',
                type: SWITCH,
                activeValue: '在线',
                inactiveValue: '离线',
              },
            ],
            span: 1
          },

        ]
      }
    ],
    teacherAttachInfo: {
      users: [
        {
          attachInfo: {
            infoTitle: "教师附加信息",
            iconCode: '&#xe64b;',
            items: [
              {
                key: 'education',
                name: '学历',
                value: '本科',
                type: SELECT,
                options: [
                  {
                    value: "本科",
                    label: "本科"
                  },
                  {
                    value: "硕士",
                    label: "硕士"
                  },
                  {
                    value: "博士",
                    label: "博士"
                  }
                ],
                span: 1
              },
              {
                key: 'bachelor',
                name: '学位',
                value: 'A',
                type: SELECT,
                options: [
                  {
                    value: "A",
                    label: "A"
                  },
                  {
                    value: "B",
                    label: "B"
                  },
                  {
                    value: "C",
                    label: "C"
                  }
                ],
                span: 1
              },
              {
                key: 'major',
                name: '专业',
                value: '专业1',
                type: SELECT,
                options: [
                  {
                    value: "专业1",
                    label: "专业1"
                  },
                  {
                    value: "专业2",
                    label: "专业2"
                  },
                  {
                    value: "专业3",
                    label: "专业3"
                  }
                ],
                span: 1
              }
            ]
          }
        },
        {
          attachInfo: {
            infoTitle: "教师附加信息",
            iconCode: '&#xe64b;',
            items: [
              {
                key: 'education',
                name: '学历',
                value: '博士',
                type: SELECT,
                options: [
                  {
                    value: "本科",
                    label: "本科"
                  },
                  {
                    value: "硕士",
                    label: "硕士"
                  },
                  {
                    value: "博士",
                    label: "博士"
                  }
                ],
                span: 1
              },
              {
                key: 'bachelor',
                name: '学位',
                value: 'B',
                type: SELECT,
                options: [
                  {
                    value: "A",
                    label: "A"
                  },
                  {
                    value: "B",
                    label: "B"
                  },
                  {
                    value: "C",
                    label: "C"
                  }
                ],
                span: 1
              },
              {
                key: 'major',
                name: '专业',
                value: '专业3',
                type: SELECT,
                options: [
                  {
                    value: "专业1",
                    label: "专业1"
                  },
                  {
                    value: "专业2",
                    label: "专业2"
                  },
                  {
                    value: "专业3",
                    label: "专业3"
                  }
                ],
                span: 1
              }
            ]
          }
        },
      ]
    },
    companyAttachInfo: {
      users: [
        {
          attachInfo: {
            infoTitle: "企业附加信息",
            iconCode: "&#xe603;",
            items: [
              {
                key: 'companyName',
                name: '企业名称',
                value: 'companyName',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPhone',
                name: '企业电话',
                value: '123456',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPrincipal',
                name: '企业负责人',
                value: '张三',
                type: INPUT
              },
              {
                key: 'companyAddress',
                name: '具体地址',
                value: '浙江省杭州市余杭区海曙路58号',
                type: INPUT,
                span: 2
              },
            ]
          }
        },
        {
          attachInfo: {
            infoTitle: "企业附加信息",
            iconCode: "&#xe603;",
            items: [
              {
                key: 'companyName',
                name: '企业名称',
                value: 'companyName1',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPhone',
                name: '企业电话',
                value: '123456',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPrincipal',
                name: '企业负责人',
                value: '李四',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyAddress',
                name: '具体地址',
                value: '浙江省杭州市余杭区海曙路58号',
                type: INPUT,
                span: 2
              },
            ]
          }
        }
      ]
    },
    studentAttachInfo: {
      users: [
        {
          attachInfo: {
            infoTitle: "学生附加信息",
            iconCode: "&#xe621;",
            items: [
              {
                key: 'college',
                name: '学院',
                value: '杭州国际服务工程学院',
                type: SELECT,
                options: [
                  {
                    value: "杭州国际服务工程学院",
                    label: "杭州国际服务工程学院"
                  },
                  {
                    value: "沈钧儒法学院",
                    label: "沈钧儒法学院"
                  }
                ],
                span: 1
              },
              {
                key: 'department',
                name: '系部',
                value: '计算机',
                type: SELECT,
                options: [
                  {
                    value: "计算机",
                    label: "计算机"
                  },
                  {
                    value: "物联网",
                    label: "物联网"
                  }
                ],
                span: 1
              },
              {
                key: 'major',
                name: '专业',
                value: '软件工程',
                type: SELECT,
                options: [
                  {
                    value: "软件工程",
                    label: "软件工程"
                  },
                  {
                    value: "计算机",
                    label: "计算机"
                  }
                ],
                span: 1
              },
              {
                key: 'class',
                name: '班级',
                value: '152',
                type: SELECT,
                options: [
                  {
                    value: "152",
                    label: "152"
                  },
                  {
                    value: "151",
                    label: "151"
                  }
                ],
                span: 1
              },
            ]
          }
        },
        {
          attachInfo: {
            infoTitle: "学生附加信息",
            iconCode: "&#xe621;",
            items: [
              {
                key: 'college',
                name: '学院',
                value: '杭州国际服务工程学院',
                type: SELECT,
                options: [
                  {
                    value: "杭州国际服务工程学院",
                    label: "杭州国际服务工程学院"
                  },
                  {
                    value: "沈钧儒法学院",
                    label: "沈钧儒法学院"
                  }
                ],
                span: 1
              },
              {
                key: 'department',
                name: '系部',
                value: '计算机',
                type: SELECT,
                options: [
                  {
                    value: "计算机",
                    label: "计算机"
                  },
                  {
                    value: "物联网",
                    label: "物联网"
                  }
                ],
                span: 1
              },
              {
                key: 'major',
                name: '专业',
                value: '软件工程',
                type: SELECT,
                options: [
                  {
                    value: "软件工程",
                    label: "软件工程"
                  },
                  {
                    value: "计算机",
                    label: "计算机"
                  }
                ],
                span: 1
              },
              {
                key: 'class',
                name: '班级',
                value: '152',
                type: SELECT,
                options: [
                  {
                    value: "152",
                    label: "152"
                  },
                  {
                    value: "151",
                    label: "151"
                  }
                ],
                span: 1
              },
            ]
          }
        }
      ]
    }
  }
}
