import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeHelpFeedbackDetailPage } from '../me-help-feedback-detail/me-help-feedback-detail';

@Component({
  selector: 'page-me-help-feedback',
  templateUrl: 'me-help-feedback.html',
})
export class MeHelpFeedbackPage {

  list = [];
  showBtn: boolean = false;
  boolShow = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initData();
  }

  initData() {
    this.list = [
      {
        question: '1. 如何登陆？',
        answer1: {
          title: '点击桌面的app图标，进入到登陆界面',
          content: ''
        },
        answer2: {
          title: '账号登陆方式: ',
          content: '输入账号→输入密码→点击登录'
        },
        answer3: {
          title: '手机号登陆方式: ',
          content: '输入手机号→点击获取验证码→输入验证码→点击登录'
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '2. 忘记账号或密码怎么办？',
        answer1: {
          title: '个人用户: ',
          content: '请联系单位管理员！'
        },
        answer2: {
          title: '个人用户: ',
          content: '请联系系统管理员！'
        },
        answer3: '',
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '3. 哪些情况会导致无法登陆？',
        answer1: {
          title: '',
          content: '1、账号或者密码错误'
        },
        answer2: {
          title: '',
          content: '2、手机系统版本要求Android5.0及以上，暂不支持苹果手机'
        },
        answer3: {
          title: '',
          content: '3、手机运行内存推荐3G及以上，内存过小可能导致偶尔不发加载登陆页面'
        },
        answer4: {
          title: '',
          content: ''
        } 
      },
      {
        question: '4. 如何签到、查看签到历史？',
        answer1: {
          title: '签到: ',
          content: '在工作台点击签到→选择签到类型'
        },
        answer2: {
          title: '修改签到类型: ',
          content: '点击工作台的签到类型，比如“在岗”→修改签到类型'
        },
        answer3: {
          title: '查看签到历史: ',
          content: '点击左下角“工作台”→“个人信息”→“签到历史”→“<”与“>”切换月份→点击“x”退出查看签到历史'
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '5. 如何查看自己的个人信息？',
        answer1: {
          title: '',
          content: '点击左下角“工作台”→“个人信息”→“个人自述”→“印象标签”，切换不同的窗口查看相应的信息'
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '6. 如何修改个人自述？',
        answer1: {
          title: '修改个人自述——座右铭（其他同座右铭修改）: ',
          content: '点击左下角“工作台”→“个人信息”→“个人自述”→“座右铭”→输入内容→“完成”'
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '7. 如何查看本人的印象标签？',
        answer1: {
          title: '',
          content: '点击左下角“工作台”→“个人信息”→“印象标签”→筛选→选择时间→确定'
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '8. 如何创建、查看、修改、删除工作周表？',
        answer1: {
          title: '创建工作周表: ',
          content: '点击创建图标→输入内容→“保存”'
        },
        answer2: {
          title: '查看工作周表: ',
          content: '点击顶部的“<”和“>”切换周→“周*”查看相应时间的工作周表'
        },
        answer3: {
          title: '修改工作周表: ',
          content: '点击工作周表信息→右上角“…”→“修改”→修改→保存'
        },
        answer4: {
          title: '删除工作周表: ',
          content: '点击工作周表信息→右上角“…”→“删除”→“确认删除”'
        }      
      },
      {
        question: '9. 如何创建、删除、筛选工作日志？',
        answer1: {
          title: '创建工作日志: ',
          content: '方式一: 在工作台点击“工作日志”→创建图标→输入内容→“保存”',
          content1: "方式二: 在工作台点击“干部动态”→创建图标→输入内容→“保存”"
        },
        answer2: {
          title: '删除工作日志: ',
          content: '点击“工作日志”→点击单条日志→“删除”→“确定”'
        },
        answer3: {
          title: '筛选日志信息: ',
          content: '点击搜索图标→输入关键字→点击筛选→选择时间段→确定'
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '10. 如何创建、删除、筛选每周一励？',
        answer1: {
          title: '创建: ',
          content: '点击“每周一励”→创建栏→输入内容→保存',
          content1: ""
        },
        answer2: {
          title: '删除: ',
          content: '点击“每周一励”→点击一条“每周一励”→“删除”→“确定”'
        },
        answer3: {
          title: '筛选: ',
          content: '点击搜索图标→输入关键字→点击筛选→选择时间段→确定'
        },
        answer4: {
          title: '',
          content: ''
        }    
      },
      {
        question: '11. 如何创建、删除每季三励？',
        answer1: {
          title: '创建: ',
          content: '点击“每季三励”→创建栏→输入内容→保存',
          content1: ""
        },
        answer2: {
          title: '删除: 点击“每季三励”→点击一条“每季三励”→“删除”→“确定”',
          content: '点击“每季三励”→点击一条“每季三励”→“删除”→“确定”'
        },
        answer3: {
          title: '筛选: ',
          content: '点击搜索图标→输入关键字→点击筛选→选择时间段→确定'
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '12. 如何创建、删除每年十励？',
        answer1: {
          title: '创建: ',
          content: '点击“每年十励”→创建栏→输入内容→保存',
          content1: ""
        },
        answer2: {
          title: '删除: 点击“每年十励”→点击一条“每年十励”→“删除”→“确定”',
          content: '点击“每年十励”→点击一条“每年十励”→“删除”→“确定”'
        },
        answer3: {
          title: '筛选: ',
          content: '点击搜索图标→输入关键字→点击筛选→选择时间段→确定'
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '13. 如何查看获得的点赞详情',
        answer1: {
          title: '',
          content: '点击“工作日志”→点击统计区',
          content1: ""
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '14. 如何查看本单位、其他组织、关注人员信息？',
        answer1: {
          title: '查看关注人员: ',
          content: '点击“通讯录”→姓名/头像',
          content1: ""
        },
        answer2: {
          title: '查看本单位: ',
          content: '点击“通讯录”→“本单位”→姓名/头像'
        },
        answer3: {
          title: '查看其他组织: ',
          content: '点击“通讯录”→“其他组织”→姓名/头像'
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '15. 如何关注/取消关注他人？',
        answer1: {
          title: '关注他人: ',
          content: '在任意位置点击他人姓名/头像→关注',
          content1: ""
        },
        answer2: {
          title: '取消关注他人: ',
          content: '在任意位置点击他人姓名/头像→取消关注'
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }
      },
      {
        question: '16. 如何处理他人发出的关注申请？',
        answer1: {
          title: '',
          content: '点击“干部动态”→“新的关注”→“待处理”→选择“同意”或“拒绝”',
          content1: ""
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '17. 如何查看、筛选他人的动态信息？',
        answer1: {
          title: '查看其他人动态信息: ',
          content: '点击“干部动态”→“本单位”→“推荐”→“领导批赞”',
          content1: ""
        },
        answer2: {
          title: '筛选动态信息: ',
          content: '点击搜索图标→输入关键字→点击筛选→选择时间段→确定'
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '18. 如何点赞、取消点赞、评论？',
        answer1: {
          title: '点赞/取消点赞: 点击点赞图标',
          content: '点击点赞图标',
          content1: ""
        },
        answer2: {
          title: '评论: 点击评论图标→输入评论内容→确定',
          content: '点击评论图标→输入评论内容→确定'
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }      
      },
      {
        question: '19. 如何修改账户信息？',
        answer1: {
          title: '进入修改信息选择页面: 点击“我”→“账户安全”→点击获取验证码→输入验证码→确定',
          content: '点击“我”→“账户安全”→点击获取验证码→输入验证码→确定',
          content1: ""
        },
        answer2: {
          title: '修改用户名: ',
          content: '点击“修改用户名”→输入新用户名/确认新用户名→点击“提交”'
        },
        answer3: {
          title: '修改密码: ',
          content: '点击“修改密码”→输入新密码/确认新密码→点击“提交”'
        },
        answer4: {
          title: '修改手机号: ',
          content: '点击“修改手机号”→输入新的手机号→点击“获取验证码”→输入验证码→点击“提交”'
        }      
      },
      {
        question: '20. 如何查看班子信息？',
        answer1: {
          title: '',
          content: '在工作台点击“班子信息库”->点击单个班子',
          content1: ""
        },
        answer2: {
          title: '',
          content: ''
        },
        answer3: {
          title: '',
          content: ''
        },
        answer4: {
          title: '',
          content: ''
        }
      }
    ]
  }

  showDetail(i) {
    this.boolShow[i] = !this.boolShow[i];
  }  

  goDetail(item) {
    this.navCtrl.push(MeHelpFeedbackDetailPage, {
      item: item
    })
  }

}
