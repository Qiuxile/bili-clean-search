# Bilibili - 极简搜索页 (bili-clean-search)

> 还你一个干净的 B 站：屏蔽推荐流，首页只留搜索。

## 📖 项目简介

在使用 B 站网页端时，繁杂的首页推荐流和分类推荐往往会分散注意力。**Bilibili - 极简搜索页** 是一个轻量级的油猴（Tampermonkey）脚本，旨在将 B 站网页端首页改造为一个纯粹的“极简视频搜索页”，屏蔽一切推荐内容，只保留核心的搜索功能。

## 📸 效果展示

<img width="1654" height="966" alt="image" src="https://github.com/user-attachments/assets/b9e463c3-974d-492b-b06d-163c47970f82" />
<img width="1658" height="967" alt="image" src="https://github.com/user-attachments/assets/4af81763-ee27-4700-bbed-0ac39989fb5b" />

## ✨ 功能特性

- **彻底屏蔽**：首页推荐流、分类推荐、骨架屏等干扰内容全部隐藏/移除。
- **极简布局**：将搜索框居中放大，打造沉浸式搜索体验。
- **智能生效**：仅在首页生效，不影响 B 站其他页面（视频播放页、动态页等）的正常浏览。
- **SPA 路由支持**：完美适配 B 站单页应用（SPA）特性，切换页面后返回首页会自动重新清理。
- **性能优化**：使用 `MutationObserver` 监听并清理动态加载的推荐内容，8 秒后自动断开监听，几乎不增加额外性能损耗。

## 📦 安装指南

1. **安装浏览器扩展**：确保你的浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/)（油猴）扩展。
2. **安装脚本**：选择以下任意一种方式安装：
   - **Greasy Fork（推荐）**：[点击此处前往 Greasy Fork 安装](https://greasyfork.org/zh-CN/scripts/还没有) *(请替换为你实际的 Greasy Fork 链接)*
   - **GitHub Raw**：点击 [bili-clean-search.user.js](https://raw.githubusercontent.com/Qiuxile/bili-clean-search/main/bili-clean-search.user.js) 进行安装。

## 🚀 使用方法

安装完成后，直接访问 [Bilibili 首页](https://www.bilibili.com/) 即可。页面会自动清理所有推荐内容，只留下一个居中的搜索框。

## 🔄 更新日志

- **v1.0.0**：
  - 初始版本发布。
  - 支持屏蔽首页推荐流与分类推荐。
  - 实现极简搜索页布局。
  - 支持 SPA 路由切换与自动清理。

## 🛠️ 开发与贡献

本脚本基于原生 JavaScript 和 CSS 编写。如果你有更好的想法或发现了 bug，欢迎提交 Issue 或 Pull Request。

### 开发者注意事项

- 脚本通过 `@updateURL` 和 `@downloadURL` 实现自动更新。
- 每次修改代码后，**务必递增 `@version` 版本号**（例如 `1.0.1`），否则用户无法接收到更新提示。
- 若修改了仓库名或文件名，请同步更新脚本头部的 `@updateURL` 和 `@downloadURL`，并前往 Greasy Fork 后台修改“代码同步”地址。

## 📄 开源协议

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 协议开源。

## 👤 作者

- **Surile** - 脚本作者
