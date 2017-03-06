# button

默认行为：
只能点击一次，点击后变为不可用

参数说明：

hippo: hippo打click点的名称。默认无，不打点
lx: 灵犀打click点的vab_bid。默认无，不打点

disabled: 是否禁用。默认为false
repeat-click: 允许多次点击。默认为false
loading-text: 点击后加载中的文字。默认无，不展示

暴露的方法
```
this.$refs.id.toggle([Boolean])
切换按钮是否可用的状态，
true：切换至可用
false：切换至不可用
```
