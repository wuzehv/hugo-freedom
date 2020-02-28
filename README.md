# hugo-freedom主题

### 项目当前状态
幼儿期

### 在线预览
[我的博客](https://liangjun.work)

### 特性
* 语法高亮基于[prism](https://prismjs.com/)

### 使用
```
cd sitedir
git clone https://github.com/wuzehv/hugo-freedom.git themes/freedom
```

### 配置示例
``` toml
baseURL = ""
title = "Time Machine"
theme = "freedom"
copyright = "©2017-2020"

languageCode = "zh-cn"

[markup.highlight]
codeFences = true
noClasses = true
guessSyntax = true

[markup.goldmark.renderer]
unsafe = true

[params]
author = "wuzehui"
dateFormat = "2006-01-02"
slogan = "~人生苦短，何必太认真~"

[[params.nav.custom]]
title = "Posts"
url = "/post"

[[params.nav.custom]]
title = "Tags"
url = "/tags"

[[params.nav.custom]]
title = "Github"
url = "https://github.com/wuzehv"

[[params.nav.custom]]
title = "Email"
url = "mailto://bugfixeng@gmail.com"

[[params.link.friends]]
title = "夏木断弦"
url = "https://blog.tangdongsheng.com/"
slogan = "宠辱不惊,闲看庭前花开花落;去留无意,漫随天外云卷云舒"
```
