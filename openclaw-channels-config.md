# OpenClaw 聊天渠道对接指南

> 📅 更新日期：2026年2月
> 🎯 适合人群：想要在微信/Telegram/Discord 等平台使用 OpenClaw 的用户

---

## 📖 前言：为什么要对接聊天渠道？

### 什么是聊天渠道？

聊天渠道 = 你常用的聊天软件
- 📱 Telegram
- 💬 Discord
- 🐦 Slack
- 🏢 飞书/钉钉
- 💙 WhatsApp

### 对接后能做什么？

| 功能 | 说明 |
|------|------|
| 🏠 在家也能用 | 不需要随时开着电脑 |
| 📱 消息提醒 | 有重要消息手机通知你 |
| 👥 多人使用 | 可以分享给家人朋友一起用 |
| 📊 更方便 | 用熟悉的软件和 AI 对话 |

---

## 🛠️ 准备工作

### 1. 确保 OpenClaw 已安装

```bash
# 检查版本
openclaw --version

# 检查 Gateway 状态
openclaw gateway status
```

如果还没安装，请先看：
- [Windows 部署教程](./openclaw-windows-deploy.html)
- [Mac mini 部署教程](./openclaw-mac-mini-deploy.html)
- [VPS 部署教程](./openclaw-vps-deploy.html)

### 2. 需要准备的账号

| 渠道 | 需要准备 |
|------|----------|
| Telegram | Telegram 账号 |
| Discord | Discord 账号 + 创建一个服务器 |
| 飞书 | 企业飞书或个人飞书 |

---

## 📱 第一章：对接 Telegram

Telegram 是最推荐的渠道，安装简单，体验好！

### 1.1 创建 Telegram Bot

**步骤 1：找 BotFather**

1. 打开 Telegram
2. 搜索 **@BotFather**（注意确认是官方账号）
3. 点击开始

**步骤 2：创建机器人**

发送 `/newbot` 命令

按照提示：
1. 给机器人起名字（如 "小助手"）
2. 给机器人起用户名（必须以 bot 结尾，如 `my_helper_bot`）

**步骤 3：保存 Token**

创建成功后，BotFather 会给你一个 **Token**，格式类似：
```
123456:ABC-DEF1234ghIkl-zyx57W2vTkuAH
```

> ⚠️ **一定要保存好这个 Token！** 别人拿到可以控制你的机器人！

### 1.2 配置 OpenClaw

**方法一：配置文件**

打开配置文件（`~/.openclaw/config.json` 或 `C:\Users\你的用户名\.openclaw\config.json`）：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的TelegramToken",
      "dmPolicy": "pairing"
    }
  }
}
```

**方法二：命令行**

```bash
# 设置 Token
openclaw config set channels.telegram.botToken '"你的Token"' --json
openclaw config set channels.telegram.enabled true --json

# 重启 Gateway
openclaw gateway restart
```

### 1.3 配对（首次使用）

1. 在 Telegram 中给你的机器人发一条消息
2. 在终端运行：
   ```bash
   openclaw pairing list telegram
   ```
3. 会显示配对码，批准它：
   ```bash
   openclaw pairing approve telegram <配对码>
   ```

### 1.4 进阶配置

**允许机器人拉人进群：**

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的Token",
      "dmPolicy": "pairing",
      "groups": {
        "*": {
          "requireMention": false
        }
      }
    }
  }
}
```

---

## 💬 第二章：对接 Discord

Discord 适合技术人员使用，功能强大！

### 2.1 创建 Discord 应用

**步骤 1：打开开发者门户**

1. 访问 https://discord.com/developers/applications
2. 点击 **New Application**
3. 输入名字（如 "OpenClaw"）

**步骤 2：创建机器人**

1. 点击左侧 **Bot**
2. 点击 **Reset Token**（会生成 Token）
3. **保存好 Token！**

**步骤 3：开启权限**

在 Bot 页面往下拉，找到 **Privileged Gateway Intents**，开启：
- ✅ Message Content Intent（必须）
- ✅ Server Members Intent（推荐）

### 2.2 添加机器人到服务器

**步骤 1：生成邀请链接**

1. 点击左侧 **OAuth2** → **URL Generator**
2. 勾选 `bot`
3. 在 **Bot Permissions** 中勾选：
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Embed Links
   - ✅ Attach Files

4. 复制底部生成的 URL，打开并选择你的服务器

### 2.3 配置 OpenClaw

**获取必要信息：**

1. **Server ID**：右键服务器图标 → 复制 ID（需要先开启开发者模式）
2. **你的 User ID**：右键自己头像 → 复制 ID

**配置：**

```bash
# 设置 Token
openclaw config set channels.discord.token '"你的Discord Token"' --json
openclaw config set channels.discord.enabled true --json

# 设置服务器
openclaw config set channels.discord.guilds '{"你的ServerID": {}}' --json

# 重启
openclaw gateway restart
```

### 2.4 配对

1. 给机器人发私信
2. 运行：
   ```bash
   openclaw pairing list discord
   ```
3. 批准配对

---

## 🏢 第三章：对接飞书

飞书是国内常用的企业通讯工具！

### 3.1 安装飞书插件

```bash
openclaw plugins install @openclaw/feishu
```

### 3.2 创建飞书应用

**步骤 1：打开飞书开放平台**

1. 访问 https://open.feishu.cn/app
2. 点击 **创建企业应用**
3. 填写名称和描述

**步骤 2：获取 App ID 和 App Secret**

1. 在应用页面点击 **凭证与基础信息**
2. 复制 **App ID** 和 **App Secret**

**步骤 3：开启权限**

1. 点击 **权限管理**
2. 添加以下权限：
   - ✅ 接收消息
   - ✅ 发送消息
   - ✅ 读取用户信息
   - ✅ 查看群信息

**步骤 4：创建版本并发布**

1. 点击 **版本管理与发布**
2. 创建新版本
3. 提交发布申请

### 3.3 配置 OpenClaw

**方法一：向导**

```bash
openclaw onboard
```

选择飞书，按提示操作！

**方法二：手动配置**

```bash
# 设置 App ID
openclaw config set channels.feishu.appId '"你的AppId"' --json

# 设置 App Secret
openclaw config set channels.feishu.appSecret '"你的AppSecret"' --json

# 开启
openclaw config set channels.feishu.enabled true --json

# 重启
openclaw gateway restart
```

---

## ⚙️ 第四章：多渠道同时使用

OpenClaw 支持同时对接多个渠道！

### 4.1 配置多个渠道

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的TelegramToken"
    },
    "discord": {
      "enabled": true,
      "token": "你的DiscordToken"
    },
    "feishu": {
      "enabled": true,
      "appId": "你的AppId",
      "appSecret": "你的AppSecret"
    }
  }
}
```

### 4.2 查看已连接渠道

```bash
openclaw channels list
```

---

## ❓ 常见问题

### Q1: 收不到消息？

**检查步骤：**
1. Gateway 是否运行？`openclaw gateway status`
2. 渠道是否开启？`openclaw channels list`
3. 查看日志：`openclaw logs --follow`

### Q2: 机器人不回复？

**可能原因：**
1. 没有配对 → 重新配对
2. 权限不够 → 检查 Bot 权限设置
3. 网络问题 → 检查服务器网络

### Q3: 如何踢掉某个用户？

```bash
# 查看配对的设备
openclaw pairing list

# 撤销某个配对
openclaw pairing revoke <设备ID>
```

### Q4: 安全问题

**建议：**
- 不要把 Token 发到公开群
- 定期检查配对设备
- 使用 `dmPolicy: "pairing"` 模式

---

## 📞 支持的渠道列表

| 渠道 | 状态 | 难度 |
|------|------|------|
| Telegram | ✅ 稳定 | ⭐ 简单 |
| Discord | ✅ 稳定 | ⭐⭐ 中等 |
| 飞书 | ✅ 稳定 | ⭐⭐ 中等 |
| WhatsApp | ✅ 稳定 | ⭐⭐ 中等 |
| Slack | ✅ 稳定 | ⭐⭐ 中等 |
| IRC | ✅ 稳定 | ⭐⭐⭐ 困难 |

---

## 🎉 总结

通过本教程，你已经学会了：

- ✅ 对接 Telegram 机器人
- ✅ 对接 Discord 机器人
- ✅ 对接飞书
- ✅ 多渠道同时使用
- ✅ 基础安全设置

### 下一步

1. 选择一个渠道开始
2. 配置好后和朋友分享
3. 设置定时任务让 AI 主动提醒你

### 需要帮助？

- 📚 官方文档：https://docs.openclaw.ai/channels
- 💬 社区论坛：https://discord.gg/openclaw

---

*教程作者：小鱼 🐟*
