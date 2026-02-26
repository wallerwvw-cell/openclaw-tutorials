# OpenClaw Mac mini 本地部署完全指南

> 📅 更新日期：2026年2月
> 👨‍🏫 适合人群：电脑小白、完全没有编程经验
> ⏱️ 预计耗时：30-45分钟

---

## 📖 前言：为什么要用 OpenClaw？

### 什么是 OpenClaw？

想象一下，你的电脑上有一个**超级智能助手**，它可以：

- 📝 **帮你写文章** - 不管是工作总结还是学习笔记
- 🔍 **帮你查资料** - 自动搜索网络、整理信息
- 💻 **帮你操作电脑** - 点点鼠标就能完成复杂任务
- 📱 **帮你管理消息** - 同时管理微信、Telegram、飞书等多个平台
- 🌐 **帮你操作浏览器** - 自动填写表单、截图、点按钮

**简单来说，OpenClaw 就是让你用说话的方式指挥 AI 帮你干活！**

### 为什么选择 Mac mini？

Mac mini 是运行 OpenClaw 的完美选择：

| 优点 | 说明 |
|------|------|
| 🖥️ 体积小巧 | 只有手掌大小，不占空间 |
| ⚡ 性能强大 | M系列芯片运行流畅 |
| 🔇 静音省电 | 可以24小时开机 |
| 🍎 macOS稳定 | 不需要频繁维护 |

---

## 🛠️ 第一章：准备工作

### 1.1 检查你的 Mac mini

首先，确认你的电脑满足以下条件：

- ✅ **Mac mini**（任何年份都可以，M1/M2/M3/M4 都没问题）
- ✅ ** macOS 12.0 或更高版本**（点击苹果图标 → 关于本机查看）
- ✅ **稳定的网络连接**（OpenClaw 需要联网才能工作）

> 💡 **温馨提醒**：如果不确定系统版本，点屏幕左上角苹果图标 → "关于本机"就能看到。

### 1.2 需要的工具

在安装 OpenClaw 之前，你需要准备以下工具：

#### 工具一：终端（Terminal）

这是 Mac 自带的命令行工具，就像 Windows 的"命令提示符"：

**打开方法：**
1. 点击屏幕右上角的 🔍（搜索图标）
2. 输入 "Terminal" 或 "终端"
3. 点击出现的 "终端" 应用

> 💡 **小贴士**：建议把终端固定到程序坞（ Dock），方便以后使用。
> - 右键点击程序坞中的终端图标
> - 选择"选项" → "在程序坞中保留"

#### 工具二：Homebrew（包管理器）

这是 Mac 的软件安装工具，相当于 App Store 的命令行版本。

**安装方法：**

打开终端，粘贴以下命令，然后按回车：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**安装过程中的说明：**

```
🍎  安装过程可能会问你要密码
→ 输入你电脑的登录密码（输入时不显示字符是正常的）
→ 输入完按回车

📋  安装完成后会显示 "Installation successful!"
```

> ⚠️ **温馨提醒**：
> - 密码输入时屏幕不会显示任何字符，别以为键盘坏了
> - 如果安装失败，可能是网络问题，请尝试使用手机热点

---

## 📦 第二章：安装 OpenClaw

### 2.1 安装 Node.js

OpenClaw 需要 Node.js 环境才能运行。**按步骤来：**

**第一步：打开终端**

**第二步：安装 Node.js**

```bash
brew install node
```

这行命令的意思是：
- `brew` = 使用 Homebrew 安装工具
- `install` = 安装
- `node` = Node.js 软件

**第三步：等待安装完成**

终端会显示下载进度，等待看到新的命令行提示符（如 `~ %`）就表示安装完成。

> ⏱️ 预计耗时：3-5分钟，取决于网速

### 2.2 安装 OpenClaw

**第一步：安装 OpenClaw CLI**

在终端中输入：

```bash
npm install -g openclaw
```

这行命令的意思：
- `npm` = Node.js 的包管理器
- `install` = 安装
- `-g` = 全局安装（让所有用户都能用）
- `openclaw` = 要安装的软件

**第二步：等待安装完成**

看到新的 `~ %` 提示符就表示安装成功了！

> ⚠️ **温馨提醒**：如果提示 "npm: command not found"，请先完成上一节的 Node.js 安装。

### 2.3 验证安装成功

**第一步：检查 OpenClaw 版本**

```bash
openclaw --version
```

如果安装成功，会显示类似这样的信息：

```
🦞 OpenClaw 2026.2.15
```

> 🎉 **恭喜你！** OpenClaw 已经安装成功了！

---

## ⚙️ 第三章：配置 OpenClaw

### 3.1 首次运行配置

**第一步：启动配置向导**

```bash
openclaw configure
```

这行命令会启动交互式配置界面。

**第二步：按照提示操作**

配置向导会问你一些问题：

```
🤖 欢迎使用 OpenClaw 配置向导！

📍 第一步：选择安装模式
→ 输入 "1" 选择 "本地模式"（推荐）

🔑 第二步：获取 API Key
→ 暂时按 Ctrl+C 跳过，后面再配置

📁 第三步：工作目录
→ 直接按回车，使用默认目录
```

> 💡 **什么是 API Key？**
> 想象一下，API Key 就像是一个"会员卡"，证明你有权限使用 AI 服务。
> 获取方法我们后面会讲到。

### 3.2 安装和启动 Gateway

**Gateway 是什么？**
Gateway 是 OpenClaw 的核心服务，就像是一个"大脑"，负责连接你和 AI。

**第一步：安装 Gateway 服务**

```bash
openclaw gateway install
```

这行命令的意思：
- `openclaw gateway` = OpenClaw 的网关服务
- `install` = 安装到系统中（让开机自动运行）

**第二步：启动 Gateway**

```bash
openclaw gateway start
```

这行命令的意思：
- `start` = 启动服务

**第三步：检查运行状态**

```bash
openclaw gateway status
```

如果一切正常，会显示：

```
✅ Gateway 正在运行
🔗 连接地址：ws://127.0.0.1:8080
```

> 🎉 **太棒了！** Gateway 已经启动成功了！

> ⚠️ **温馨提醒**：
> - 首次启动可能需要1-2分钟，请耐心等待
> - 如果启动失败，尝试运行 `openclaw doctor` 检查问题

---

## 🔑 第四章：配置 AI 服务（API Key）

### 4.1 什么是 API Key？

**简单解释：**
- AI 服务（如 Claude、DeepSeek）就像是一个"付费图书馆"
- API Key 就是你的"借书卡"
- 每次问 AI 问题，就像从图书馆借一本书，要消耗"借书次数"

### 4.2 获取免费 API Key

OpenClaw 支持多种 AI 服务，这里介绍最常用的两种：

#### 方案一：MiniMax（推荐国内用户）

**特点：**
- ✅ 中文优化好
- ✅ 价格便宜
- ✅ 国内访问快

**注册步骤：**

1. 打开浏览器，访问：https://platform.minimax.chat/
2. 点击"注册"或"开始使用"
3. 可以用微信或手机号注册
4. 注册完成后，在控制台找到"API Keys"
5. 点击"创建 API Key"
6. 复制生成的密钥（以 `eyJ` 开头的一大串字符）

#### 方案二：Anthropic Claude（推荐进阶用户）

**特点：**
- ✅ 能力最强
- ✅ 稳定性好
- ⚠️ 需要科学上网

**注册步骤：**

1. 打开 https://www.anthropic.com/
2. 点击"Sign Up"注册账号
3. 完成身份验证
4. 在 Console 找到"API Keys"
5. 创建新密钥并复制

> 💡 **新用户福利**：MiniMax 新用户有免费额度，足够初学者使用几个月！

### 4.3 配置 API Key

**方法一：环境变量（推荐）**

```bash
export OPENCLAW_API_KEY="你的API Key"
```

把上面命令中的 `"你的API Key"` 替换成你复制的密钥。

> ⚠️ **温馨提醒**：
> - 每次打开新的终端都要重新输入这行命令
> - 或者添加到 ~/.zshrc 文件中（后面会教）

**方法二：配置文件**

1. 打开或创建配置文件：
```bash
nano ~/.openclaw/config.json
```

2. 添加以下内容：
```json
{
  "apiKeys": {
    "minimax": "你的MiniMax API Key"
  },
  "defaultModel": "MiniMax-M2.5"
}
```

3. 按 `Ctrl + O` 保存，`Ctrl + X` 退出

---

## 🎯 第五章：首次使用教程

### 5.1 启动对话

**方法一：使用命令行**

```bash
openclaw
```

这会启动一个交互式对话界面，直接输入你的问题即可。

**方法二：使用 Web 界面**

```bash
openclaw dashboard
```

这会打开浏览器，显示一个可视化的控制面板。

### 5.2 第一个任务：让 AI 帮你查天气

**在对话中输入：**

```
帮我查一下今天北京的天气怎么样？
```

**AI 会：**
1. 自动搜索天气信息
2. 整理成易读的形式
3. 回答你的问题

### 5.3 第二个任务：让 AI 帮你写东西

**输入：**

```
帮我写一封辞职信，字数控制在300字左右
```

**AI 会：**
1. 生成一封专业的辞职信
2. 你可以要求修改内容

### 5.4 第三个任务：让 AI 操作浏览器

**输入：**

```
帮我打开百度，搜索"OpenClaw是什么"
```

**AI 会：**
1. 自动打开浏览器
2. 访问百度
3. 搜索相关内容
4. 给你展示结果

> 💡 **温馨提醒**：首次使用浏览器功能，可能需要安装 Chrome 扩展。AI 会提示你操作。

---

## 🔧 第六章：进阶配置

### 6.1 配置模型偏好

OpenClaw 支持多个 AI 模型，你可以根据需求切换：

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| MiniMax-M2.5 | 便宜、中文好 | 日常对话 |
| DeepSeek-Chat | 便宜、快速 | 简单问答 |
| Claude-3.5 | 能力强 | 复杂任务 |

**设置默认模型：**

```bash
openclaw models set-default MiniMax-M2.5
```

### 6.2 配置定时任务

**什么是定时任务？**
就是让 AI 定时帮你做事情，比如每天早上提醒你开会。

**设置定时任务：**

```bash
openclaw cron add --name "早安提醒" --schedule "every 8h" --task "发送天气和日程提醒"
```

### 6.3 配置消息渠道

OpenClaw 可以连接多个消息平台：

**查看可用渠道：**

```bash
openclaw channels list
```

**配置 Telegram：**

1. 找 @BotFather 创建机器人
2. 获取 bot token
3. 运行：`openclaw channels add telegram`

---

## ❓ 第七章：常见问题解答

### Q1: 安装过程中提示权限不足？

**问题：** 终端提示 "Permission denied"

**解决方法：**
```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules
```
然后输入你的电脑密码。

---

### Q2: Gateway 启动失败？

**问题：** `openclaw gateway start` 报错

**解决方法：**
1. 先停止可能存在的旧进程：
```bash
pkill -f openclaw
```
2. 然后重新启动：
```bash
openclaw gateway start
```

---

### Q3: API Key 总是要重新输入？

**问题：** 每次打开新终端都要设置 API Key

**解决方法：**
1. 打开终端配置文件：
```bash
nano ~/.zshrc
```
2. 在文件末尾添加：
```bash
export OPENCLAW_API_KEY="你的API Key"
```
3. 保存退出，然后运行：
```bash
source ~/.zshrc
```

---

### Q4: AI 回答很慢或卡住？

**问题：** 等待很久没有回应

**可能原因：**
1. 网络不稳定（尝试手机热点）
2. API 额度用完了（检查账户余额）
3. 服务器繁忙（稍后再试）

---

### Q5: 想卸载 OpenClaw？

**如果真的不想用了，卸载方法：**

```bash
# 停止 Gateway
openclaw gateway stop

# 卸载 Gateway 服务
openclaw gateway uninstall

# 删除 CLI
npm uninstall -g openclaw
```

---

## 🎉 总结

### 你学到了什么？

通过本教程，你已经掌握了：

- ✅ **安装 OpenClaw** - 在 Mac mini 上安装完整环境
- ✅ **配置 Gateway** - 启动核心服务
- ✅ **获取 API Key** - 连接 AI 服务
- ✅ **首次使用** - 和 AI 开始对话
- ✅ **进阶配置** - 个性化设置

### 下一步做什么？

1. **多和 AI 聊天** - 熟悉各种功能
2. **尝试浏览器操作** - 让 AI 帮你自动化操作
3. **配置消息渠道** - 连接 Telegram、Discord、飞书等 → [查看教程](./openclaw-channels-config.html)
4. **设置定时任务** - 让 AI 自动帮你干活

### 需要帮助？

- 📚 官方文档：https://docs.openclaw.ai
- 💬 社区讨论：https://discord.gg/openclaw
- 🐛 问题反馈：https://github.com/openclaw/openclaw/issues

---

> 📝 **结束语**
> 
> 恭喜你已经成为 OpenClaw 的用户！🎉
> 
> 记住，AI 是工具，不是魔法。越多使用，你会发现它越强大。
> 
> 祝你使用愉快！有任何问题随时问我！🚀

---

*教程作者：小鱼*
*如有更新，恕不另行通知*
