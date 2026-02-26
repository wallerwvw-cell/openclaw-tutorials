# OpenClaw 对接 Telegram、Discord、飞书详细教程

> 📅 更新日期：2026年2月
> 👨‍🏫 适合人群：电脑小白、想把 AI 接到聊天软件
> ⏱️ 预计耗时：15-30分钟

---

## 📖 前言：为什么要对接聊天软件？

### 对接后能做什么？

| 功能 | 说明 |
|------|------|
| 💬 随时聊天 | 在微信/Telegram/Discord 里直接问 AI |
| 📱 消息推送 | 定时任务结果推送到聊天软件 |
| 👥 群聊助手 | 在群里当智能客服或助手 |
| 🔔 提醒通知 | 定时提醒、订单通知等 |

### 支持哪些平台？

| 平台 | 状态 | 推荐指数 |
|------|------|----------|
| Telegram | ✅ 成熟 | ⭐⭐⭐⭐⭐ |
| Discord | ✅ 成熟 | ⭐⭐⭐⭐⭐ |
| 飞书 | ✅ 成熟 | ⭐⭐⭐⭐⭐ |
| WhatsApp | ✅ 成熟 | ⭐⭐⭐⭐ |
| Slack | ✅ 成熟 | ⭐⭐⭐⭐ |

> 💡 **推荐**：新手建议从 **Telegram** 开始，设置最简单！

---

## 🐕 第一章：对接 Telegram

Telegram 是最推荐的聊天平台，设置简单，功能强大！

### 1.1 创建 Telegram Bot

**步骤：**

1. 打开 Telegram
2. 搜索 **@BotFather**（注意确认是这个账号）
3. 发送 `/newbot` 命令
4. 按提示输入机器人名称（如 "我的 AI 助手"）
5. 用户名必须以 `_bot` 结尾（如 `my_ai_assistant_bot`）
6. 完成后会收到 **Bot Token**，复制保存

> 💡 **温馨提醒**：Token 就像密码，一定要保存好！

### 1.2 配置 OpenClaw

**方法一：配置文件**

创建或编辑配置文件：

**在 Mac/W命令行：**
```bash
mkdir -p ~/.openclaw
nano ~/.openclaw/config.json
```

**在 PowerShell/Windows：**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.openclaw"
notepad "$env:USERPROFILE\.openclaw\config.json"
```

**粘贴以下内容（替换你的 Token）：**

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的BotToken",
      "dmPolicy": "pairing"
    }
  }
}
```

> ⚠️ 把"你的BotToken"替换成 @BotFather 给你的 Token

**方法二：命令行配置**

```bash
openclaw config set channels.telegram.enabled true --json
openclaw config set channels.telegram.botToken '"你的Token"' --json
```

### 1.3 启动配对

```bash
# 重启 Gateway
openclaw gateway restart

# 查看配对列表
openclaw pairing list telegram

# 批准配对（会显示一个配对码）
openclaw pairing approve telegram <配对码>
```

### 1.4 开始使用

配对成功后：
- 在 Telegram 给你的机器人发消息
- AI 就会回复你啦！

### 1.5 添加到群组

1. 把机器人拉进群
2. 设置群组权限（如果需要）：
   - 发送 `/setprivacy` 给 @BotFather，选择 **Disable**（这样机器人能看到所有消息）
   - 或者把机器人设为管理员

---

## 🎮 第二章：对接 Discord

Discord 适合技术社区、玩家社群！

### 2.1 创建 Discord 应用

**步骤：**

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 **New Application**
3. 输入应用名称（如 "OpenClaw"）
4. 点击 **Bot** 侧边栏
5. 点击 **Reset Token**（第一次生成）
6. **复制保存 Token**

### 2.2 开启权限

在 Bot 页面，向下滚动找到 **Privileged Gateway Intents**，开启：

- ✅ **Message Content Intent**（必需）
- ✅ **Server Members Intent**（推荐）

### 2.3 生成邀请链接

1. 点击 **OAuth2** 侧边栏
2. 向下滚动到 **OAuth2 URL Generator**
3. 勾选 `bot`
4. 在 **Bot Permissions** 勾选：
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Embed Links
   - ✅ Attach Files
5. 复制底部生成的 URL，粘贴到浏览器
6. 选择你的服务器，点击 **Continue**

### 2.4 获取 ID

1. 打开 Discord 设置 → 高级 → 开启 **开发者模式**
2. 右键服务器图标 → 复制服务器 ID
3. 右键自己头像 → 复制用户 ID

### 2.5 配置 OpenClaw

**命令行配置：**

```bash
openclaw config set channels.discord.token '"你的BotToken"' --json
openclaw config set channels.discord.enabled true --json
openclaw config set channels.discord.serverId '"你的服务器ID"' --json

# 重启 Gateway
openclaw gateway restart
```

### 2.6 开始使用

- 给机器人发私信
- 在服务器频道 @机器人

---

## 🏢 第三章：对接飞书

飞书是国内企业常用的办公通讯软件！

### 3.1 安装飞书插件

```bash
openclaw plugins install @openclaw/feishu
```

### 3.2 创建飞书应用

1. 打开 [飞书开放平台](https://open.feishu.cn/app)
2. 点击 **创建企业自建应用**
3. 填写应用名称和描述
4. 创建完成后进入应用

### 3.3 配置应用权限

在应用页面：

1. 点击 **权限管理**
2. 添加以下权限：
   - `im:chat:readonly`（读取聊天记录）
   - `im:message:send_as_bot`（发送消息）
   - `im:message:p2p_msg`（接收私信）
   - `im:chat:list`（获取群列表）

### 3.4 获取凭据

1. 点击 **凭据管理**
2. 获取 **App ID** 和 **App Secret**
3. 复制保存

### 3.5 配置 OpenClaw

**方法一：向导配置**

```bash
openclaw channels add
```

选择 **Feishu**，按提示输入 App ID 和 App Secret

**方法二：手动配置**

```bash
openclaw config set channels.feishu.enabled true --json
openclaw config set channels.feishu.appId '"你的AppId"' --json
openclaw config set channels.feishu.appSecret '"你的AppSecret"' --json

# 重启 Gateway
openclaw gateway restart
```

---

## ❓ 第四章：常见问题

### Q1: Telegram 收不到消息？

**检查：**
1. 是否已配对？运行 `openclaw pairing list telegram`
2. Token 是否正确？
3. 重启 Gateway：`openclaw gateway restart`

---

### Q2: Discord 机器人不响应？

**检查：**
1. 是否开启了 Message Content Intent？
2. Bot 是否在服务器里？
3. 是否 @了机器人？

---

### Q3: 飞书收不到消息？

**检查：**
1. 应用是否发布？（需要企业管理员发布）
2. 权限是否都开启了？
3. 是否添加了机器人的可用范围？

---

### Q4: 如何同时开启多个平台？

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "xxx"
    },
    "discord": {
      "enabled": true,
      "token": "xxx"
    },
    "feishu": {
      "enabled": true,
      "appId": "xxx",
      "appSecret": "xxx"
    }
  }
}
```

所有平台可以同时开启！

---

## 🎉 总结

| 平台 | 难度 | 适合人群 |
|------|------|----------|
| Telegram | ⭐ | 新手、个人用户 |
| Discord | ⭐⭐ | 技术社区、游戏玩家 |
| 飞书 | ⭐⭐⭐ | 企业用户、国内团队 |

### 你学到了什么？

- ✅ 创建 Telegram/Discord/飞书 Bot
- ✅ 配置 OpenClaw
- ✅ 配对和测试
- ✅ 添加到群组

### 下一步

- 尝试在群里使用 AI
- 设置定时推送任务
- 自定义 AI 角色

---

> 祝使用愉快！🚀

---

*教程作者：小鱼*
