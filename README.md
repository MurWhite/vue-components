# vue-components
我的vue组件库

在[这里](https://murwhite.github.io/vue-components/#/)访问demo

## 建议的使用方式

- 复制组件的文件夹到自己的项目中
- webpack中配置scss-loader,postcss-loader

## 视觉层级规范(z-index)
层级间预留值用于方便用户自定义

- 0 ：主体内容
- 1000 ：导航层
- +0 ：mask：不单独使用,用于锁定内容层和导航层
- 2000 ：弹出层popout(使用mask)：弹出菜单(2000) < 对话框(2010) < 加载中(2030)
- 2050 ：弹出层popout(不使用mask)：Toast类(顶部弹出)：加载中、表单填写报错、网络请求报错(可多个同时显示，添加显示)

z-index使用注意：
```html
<style>
div{position: absolute}
</style>
<div style="background-color: red;z-index: 10">
    RED
    <div style="background-color: orange; z-index: 999999">
        ORANGE
    </div>
</div>
<div style="background-color: yellow;z-index: 11">
    YELLOW
</div>
```
在上面代码中，`YELLOW` 在 `ORANGE` 的上面，即使 `ORANGE` 的z-index远大于 `YELLOW`。

因此，位于不同父元素下的组件，层级关系需要仔细考虑。
