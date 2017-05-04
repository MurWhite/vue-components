# picker-dt 

使用了 `vue-touch` 组件，请 `npm install --save-dev vue-touch` 安装

### 属性

- show: 决定该picker是否显示
- range: 显示的日期范围，具体见下方

#### range

*可用类型*

- String : `yyyy` `yyyy-mm` `yyyy-mm-dd`，必须符合这种格式(年份4位，月份2位，日期2位)
- Object : 符合下列形式（to为null时，相当于String的情况）。String要求符合上述规则。
``` js
{
  from: String,
  to: String,
}
```
- Array : [String, Object, ...] String和Object的要求同上。

*range 转换规则*

所有的范围为闭区间 `[from, to]`

- `yyyy` 会转换成 `yyyy-01-01(from)` or `yyyy-12-31(to)`
- `yyyy-mm` 会转换成 `yyyy-mm-01(from)` or `yyyy-mm-月末(to)`
- `yyyy-mm-dd` 会转换成 `yyyy-mm-dd(from or to)`

### 事件:

- mask: 点击遮罩处触发的事件

### 优化点及潜在问题

- 移除vue-touch组件
- 所有的日期转换都没有设置时区
