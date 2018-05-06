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
                span: 1,
                disabled: true
              }, {
                key: 'userName',
                name: '姓名',
                value: 'UserName',
                type: INPUT,
                span: 1
              }, {
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
              }, {
                key: 'userMail',
                name: '邮箱',
                value: '123456789@some.com',
                type: INPUT,
                span: 1
              }, {
                key: 'userPhone',
                name: '手机号',
                value: '12345678909',
                type: INPUT,
                span: 1
              }, {
                key: 'accountState',
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
              }, {
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
                    value: "企业",
                    label: "企业"
                  }
                ],
                span: 1
              }, {
                key: 'userPWD',
                name: '用户密码',
                value: '******',
                type: BUTTON,
                buttonText: "重置密码",
                clickFunName: "resetPWD",
                span: 1
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
                key: 'teacherBachelor',
                name: '学历',
                value: '',
                type: INPUT,
                span: 1
              },
              {
                key: 'teacherDegree',
                name: '学位',
                value: '',
                type: INPUT,
                span: 1
              },
              {
                key: 'teacherMajor',
                name: '专业',
                value: '',
                type: INPUT,
                span: 1
              }
            ]
          }
        }
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
                value: '',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPhone',
                name: '企业电话',
                value: '',
                type: INPUT,
                span: 1
              },
              {
                key: 'companyPrincipal',
                name: '企业负责人',
                value: '',
                type: INPUT
              },
              {
                key: 'companyAddress',
                name: '具体地址',
                value: '',
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
                key: 'studentAcademy',
                name: '学院',
                value: '',
                type: SELECT,
                options: [],
                span: 1
              },
              {
                key: 'studentMajor',
                name: '专业',
                value: '',
                type: SELECT,
                options: [],
                span: 1
              },
              {
                key: 'studentClass',
                name: '班级',
                value: '',
                type: SELECT,
                options: [],
                span: 1
              },
            ]
          }
        }
      ]
    }
  }
}
