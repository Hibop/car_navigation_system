## car_navigation_system
#### 本项目为车载导航系统的UI界面部分，内置nodejs服务器

### 主要技术栈：
1, nodejs服务器以及数据mock，可以在本地模拟post、get等接口；
2, backbone + requireJS + underscore + jquery;

### 文件目录如下：
```
+---doc
+---server
\---web_root
    +---CN  中文目录
    |   +---css   样式文件
    |   +---js   Backbone.view
    |   |   +---index
    |   |   +---setList
    |   |   +---systemInfo
    |   |   \---vendor  存放公共依赖库
    |   \---temp    存放模板文件
    +---EN  英文目录
    |   +---css
    |   +---js
    |   |   +---index
    |   |   +---setList
    |   |   +---systemInfo
    |   |   \---vendor
    |   \---temp 
    \---images  静态图片图标文件
```


### 主要支持的功能包括：
1， 国际化（i18n支持）
2， 3G4G、wifi、gps等各模块支持

