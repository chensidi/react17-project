# react17-project
新版react重构网易云PC版

预览地址 [Jacky仿网易PC版](http://zhoup.top:7000/)
> 访问该地址需要登录，用户名为`jacky`, 密码为`123456`

## 说明
本人是音乐兼代码兼足球的忠实粉丝，平时不是写代码就去KTV，所以总是喜欢写一些与音乐或者足球的web应用，此前曾写过很多版本的music app, 比如vue2.x和react重构过移动端的仿网易云，也自己写后台node转发第三方的足球api，当然在此申明，**只是为了研究学习技术，绝不作为商业盈利！若有不法分子使用该程序谋利，后果自负**

这个网易云的web应用我从2019年初就开始陆续动工，先后有几个版本的，但是都不太满意，所以从去年9月18日，vue3.0正式发布了后，决定完整地再重构一次，终于历时几个月写了一个令我比较满意的移动端web应用，地址在[仿网易云APP vue3版](https://github.com/chensidi/vue3-project/tree/master/vue3NeteaseCloud), 预览地址为[Jacky 移动music](http://zhoup.top:7002/)，用户名密码同样，而这个PC端版本的则是采用最新的react重构，功能几乎与官网一样，这个项目是启动与2021新春前夕，并且在一直更新。

本项目依赖于`react17`和`antd`，将项目拉下来后，要先下载好后台，也就是网易云的nodeJS后台，它会提供一个与网易云官方一模一样的数据，然后把端口改为`5000`，然后下载本项目的依赖，启动即可。

本人是学友哥的忠实粉丝，绰号达州小歌神😏😂🤣
![预览](http://zhoup.top:7001/img/1618496452.png '预览')
![预览](http://zhoup.top:7001/img/1618496452(1).png '预览')
![预览](http://zhoup.top:7001/img/1618496452(2).png '预览')
![预览](http://zhoup.top:7001/img/1618496452(3).png '预览')

> 补充说明，本项目还有其他基于音乐后台的项目都依赖与这个下面这个nodejs后台，在此非常感谢这位大神数据支援。

网易云的后台地址为<https://neteasecloudmusicapi.vercel.app/#/>

## 功能清单

+ 首页展示，基本与官方保持一致，分为**顶部导航**, **轮播**,**热门推荐**,**新碟上架**, **榜单**等主要模块，这些模块某些暂未配上跳转链接。
+ 搜素功能，这是目前最丰富的一个功能，从导航栏输入搜素内容后，回车进入搜素也没面，可以得到**单曲**,**歌手**,**专辑**,**视频**,**歌词**,**歌单**,**主播**,**用户**一共8个类型，这是用antd的tabs展示的，内容与官方基本一致，但做了分页优化，官方目前只能搜出一页数据。目前单曲，专辑，视频三个板块已经配好链接可以点击进入，其他的待后面慢慢配置。
+ 播放功能，作为一个music为主题的应用，播放是最基本也是最重要的，本人作文学友粉丝，设置了用户进入后，默认配置了一首 **咖啡** 作为保底曲目，然后通过搜素功能或者其他模块，点击一首歌曲的icon就能play了，也支持添加到播放列表，然后操作就跟官方一样的，可以到专辑里面播放整张专辑的歌曲。
+ MV/视频功能，采用原生的video，实现与官方基本一致MV播放器，可以切换分辨率，音量，进度条等，但需要说明的是，由于接口并未返回视频的所有码率，所以视频没有切换分辨率功能，MV支持。
+ 歌手模块一共分为四大板块，包括歌曲，专辑，mv，歌手简介，并支持分页功能，同时会推荐相似歌手。
+ 还有更多功能在持续更新中...，欢迎issue。