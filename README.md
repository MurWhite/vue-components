# vue-components
我的vue组件库

视觉层级规范z-index
层级间预留值用于方便用户自定义

- 0    - 900  ：主体内容
- 1000 - 1900 ：导航层
-     +0    ：mask：不单独使用,用于锁定内容层和导航层
- 2000 - 2040 ：弹出层popout(使用mask)：弹出菜单 < 对话框 < 加载中
- 2050 - 2090 ：弹出层popout(不使用mask)：Toast类：加载中 < 表单填写报错 < 网络请求报错

z-index使用注意：
```html
<div style="background-color: red;z-index: 10">
    1
    <div style="background-color: orange; z-index: 999999">
        1-1
    </div>
</div>
<div style="background-color: yellow;z-index: 11">
    2
</div>
```
在上面代码中，2 在 1-1 的上面，即使 1-1 的z-index远大于 2。
