# app开发指引及规范

---

## 目录

* [快速启动](#fast)
* [架构](#frame)
* [代码规范](#standard)
* [cli](#cli)
* [投入生产](#prod)

## <span id="fast">快速启动</span>

1. svn管理

    svn地址：svn://[图片]192.168.1.107/SZOM-IGLMS/trunk/app

2. 环境准备

    1. 在`环境准备`文件夹中下载并安装node-v8.9.0-x64.msi。进入cmd，执行：

            npm -v
    
        检查node是否安装成功。

    2. 为保证代码的格式风格一致性，建议使用visual studio code开发。在`环境准备`文件夹有`VSCodeSetup-x64-1.23.0.exe`安装包。

3. 项目启动

    1. cmd进入app根目录，下载依赖npm包：

            npm i

    2. 安装ionic和cordova：
    
            npm install ionic -g
            npm install cordova -g

    3. 配置项目：

        1. 配置项目代理：

            修改`app/ionic.config.json`：

                "proxies": [
                    {
                        "path": "/ionic",   // 修改为http请求的前缀
                        "proxyUrl": "http://localhost:9999" // 修改为代理url，根据实际情况改为后端提供的地址。
                    }
                ]

        2. 配置全局参数：

            修改`app/src/config.ts`：

                const BASE_URL = '/ionic';  // 和ionic.config.json的path对应。
                const REAL_URL = 'http://localhost:9999';   // 和ionic.config.json的proxyUrl对应。

        3. 是否启动测试：

            修改`app/src/app/app.module.ts`：

                import * as Test from '../test/mock';
                Test;

            加入以上两行则启动测试，注释则关闭测试。

    4. 在app根目录下，运行项目：

            ionic serve

## <span id="frame">架构</span>
* `.gradle` 用于gradle配置（打包生成）
* `.sourcemaps` map资源映射（打包生成）
* `config` 配置文件夹
  * `copy.config.js` ionic打包注入项目的静态资源配置
* `node_modules` 项目依赖包目录
* `platforms` 对应手机平台的资源文件（打包生成）
* `plugins` cordova插件存储目录（打包生成）
* `resources` 对应手机平台的资源文件（打包生成）
* `src` 开发目录
  * `app` 入口
  * `assets` 静态资源
  * `components` 组件
  * `directives` 指令
  * `pages` 页面
  * `pipes` 管道
  * `providers` 服务
  * `test` 测试
  * `theme` 风格配置
  * `config.ts` 全局配置
  * `index.html` 入口
  * `manifest.json` app配置
* `www` 网页可访问资源（打包生成）
* `.editorconfig` 编辑器配置
* `.gitignore` git提交忽略文件
* `app.js` 代理服务器
* `config.xml` 打包app配置
* `ionic.config.json` ionic cli配置文件
* `ionic.starter.json` ionic cli配置文件
* `package-lock.json` 包管理配置文件
* `package.json` 包管理配置文件
* `tsconfig.json` ts配置
* `tslint.json` tslint代码检查配置

## <span id="standard">代码规范</span>

为保证目录的可读及快速查找，有如下规范请务必遵守：

1. 在`pages`文件夹下：

    如果明确知道页面是属于哪个模块的，请加上此模块前缀，例如：用户模块的添加用户页面：user-add文件夹。

2. 在`providers`文件夹下：

    创建相关的service，比如用户service统一放在：user文件夹。

3. 自定义iconfont图标引用：
    
    1.使用\<ion-icon class="szom" name="md-sousuo">\</ion-icon>指令引用图标，需在该标签上增加class="szom" name="sousuo"(ion-md-sousuo使用样式名ion-后面的字符串即可);

    2.使用<ion-tab [root]="workspace" tabUrlPath="workspace" tabTitle="工作台" tabIcon="md-sousuo" tabsHideOnSubPages>\</ion-tab>引用图标，tabIcon="sousuo"(ion-md-sousuo使用样式名ion-后面的字符串即可).<br>
    除此之外还需在样式中定义，表示tab下的icon使用自定义的icon而不是默认的ionic中的icon：<br>
    .tab-button{
        ion-icon{
            font-family:"szom" !important;
        }
    }

    3.直接用原生H5标签使用自定义iconfont图标：\<span class="szom ion-md-sousuo">\</span>

4. 测试代码编写：

    使用mockjs测试http请求。

    详细资料参照：[mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started)

    如用户登陆接口：

    在src/test/mock.ts文件夹中自行创建接口：

        let login = `${BASE_URL}/login`;
        Mock.mock(login, 'post', {
            code: 0,
            message: 'success',
            data: {
                token: Math.random().toString(22).substr(2)
            }
        });


## <span id="cli">cli</span>

下面列出项目常用的cli。

详细文档参照[ionic cli官方文档](https://ionicframework.com/docs/cli/commands.html)

1. ionic serve

        > ionic serve 启动项目。
        > ionic serve -p 3001 修改启动端口为3001。
        > ionic serve -c 在命令行打印console信息。

2. ionic g

        > ionic g page login 创建app/src/pages/login页面相关文件。
        > ionic g provider user 创建app/src/providers/user依赖注入类。
        > ionic g directires autosize 创建app/src/directives/autosize指令类。
        > ionic g pipe power 创建app/src/pipes/power管道类。

3. ionic cordova

        > ionic cordova run android -l 运行安卓包。

## <span id="prod">投入生产</span>

1. 项目打包apk

    修改配置文件config.xml，将`<content>`标签的`src`属性配置成下一步`项目运行`的地址。

    执行命令：

        ionic cordova build android --prod

2. 项目运行

    1. 打包

        执行命令：
    
            ionic build --prod

    2. node 运行

        修改app.js，将`BASE_URL`改为代理请求前缀，将`REAL_URL`改为被代理服务器地址。

        执行命令：

            node app

