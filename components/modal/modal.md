#modal

参数说明：

- show: Boolean 是否显示模态框
- type: 模态框类型

| 变量名称  | 类型  | 默认值  | 其它可选值  | 额外信息 |
| ------- |:---:|:------:|:-----:| ------ |----|
| show | Boolean | false |  |  |
| type | String | 空字符串 | dialog | 模态框类型 |
| title | String | 空字符串 |  |  |

示例：

``` vuejs
<modal :show="modal.show" :type="modal.type"
       @close="modal.show = false">
  <div slot="title" class="content">你好我是slot的自定义title</div>
</modal>

```

#### dialog类型的modal

如果title为空或不赋值，则可以在slot中使用

```html
<div slot="title">自定义title</div>
```
来自定义你的title，插入自己喜欢的图片式标题或者其它。当你使用slot的title时，我会将
modal的padding-top设置为0

使用

```html
<div slot="btns">按钮组</div>
```

来自定义对话框的按钮

没有slot属性的其他slot内容会被统一放置在对话框的主体内容中。
