HTTPS Switcher插件
============
![截图](http://horsley.github.com/HttpsSwitcher/screenshot.jpg "选项页面")

HTTPS切换工具，本工具可以帮你尝试使用https打开指定的域名，点击本插件的浏览器图标后会自动切换本标
签页的http/https状态，并且会记住你的选择，下次打开自动切换使用HTTPS。对于某一些被封锁的网站使用
HTTPS + Hosts是可以直接突破的，同时本插件还能帮你记录请求失败的域名和失败原因，如果是RESET的话就
可以尝试一下使用HTTPS访问。

使用HTTPS + Hosts直接突破封锁无需其他工具，可以访问如youtube、facebook、twitter、谷歌快照等服务

##幕后
本工具样式部分有参考Bootstrap，功能的灵感及部分代码来自于插件
[KB SSL Enforcer](https://chrome.google.com/webstore/detail/flcpelgcagfhfoegekianiofphddckof)，
该插件每次访问一个新的域名都会自动检测能否用HTTPS访问，如果可以就跳到使用HTTPS访问，但是这样不科学，
有部分网站虽然可以使用HTTPS访问但是会出问题（例如微博的SSO登录过程会中断），而且能用HTTPS的网站毕竟
是少数，每次检测将会减慢页面打开速度，因此开发本插件。

##安装
本来想发布到Chrome web store发现好麻烦，还要支付5刀。5刀不是问题，问题是支付不了，点击支付一直跳回
Dashboard，因此只能下载Crx文件手动安装了

1. 下载扩展Crx文件：[从Github下载](http://horsley.github.com/HttpsSwitcher/httpsSwitcher.crx)、[微盘下载](http://vdisk.weibo.com/s/oq1II)
2. 打开你[Chrome浏览器的扩展程序页面](chrome://extensions/)
3. 把下载到的Crx文件拖放到扩展程序页面中，会出现安装授权提示，允许后即安装成功

注：双击Crx文件打开的话会提示不允许安装，因为Chrome默认不允许从Chrome Web Store之外的第三方安装浏览器扩展


