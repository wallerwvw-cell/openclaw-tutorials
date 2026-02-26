# OpenClaw Windows 电脑部署完全指南

> 📅 更新日期：2026年2月
> 👨‍🏫 适合人群：电脑小白、完全没有编程经验
> ⏱️ 预计耗时：40-60分钟

---

## 📖 前言：为什么要用 Windows 运行 OpenClaw？

### 什么是 OpenClaw？

**简单来说：**
OpenClaw 是一个 AI 助手，可以帮你完成各种电脑任务：
- 帮你写文章、查资料
- 帮你操作浏览器、点按钮
- 帮你管理多个聊天软件
- 帮你设置定时提醒

**就像有一个隐形助手，你说什么它就做什么！**

### 为什么选择 Windows？

| 优点 | 说明 |
|------|------|
| 💻 电脑人人有 | 不需要额外买设备 |
| 🏠 方便在家用 | 随时能用 |
| ⚙️ 兼容性好 | 软件支持多 |
| 🆓 免费 | 不需要额外费用 |

> 💡 **温馨提醒**：如果你用的是 Mac，请看另一篇《Mac mini 部署教程》

---

## 🛠️ 第一章：准备工作

### 1.1 检查你的电脑

首先确认电脑满足以下条件：

- ✅ **Windows 10 或 Windows 11**（点击开始 → 设置 → 关于查看）
- ✅ **至少 4GB 内存**（越多越好）
- ✅ **20GB 可用硬盘空间**
- ✅ **稳定的网络连接**

### 1.2 需要安装的软件

在安装 OpenClaw 之前，你需要安装以下工具：

#### 软件一：Node.js（必装）

**这是运行 OpenClaw 的基础环境，就像汽车的发动机。**

**下载步骤：**

1. 打开浏览器，访问：https://nodejs.org/
2. 点击 **LTS（长期支持版）** 按钮下载
3. 运行下载的文件

**安装步骤：**

1. 双击下载的 `.msi` 文件
2. 点击 "Next"
3. ✅ 勾选 "I accept..."（我同意）
4. 点击 "Next"
5. ✅ 勾选 "Add to PATH"（添加到环境变量）**← 非常重要！**
6. 点击 "Next" → "Install"
7. 等待安装完成

> ⚠️ **温馨提醒**：
> - 一定要勾选 "Add to PATH"！
> - 安装过程可能需要 1-2 分钟

#### 软件二：Git（建议安装）

**这是版本控制工具，以后会用到。**

**下载步骤：**

1. 打开：https://git-scm.com/
2. 点击 "Download for Windows"
3. 运行下载的文件

**安装步骤：**

全部默认设置，点击 "Next" → "Install" 即可。

### 1.3 打开终端

**Windows 终端是什么？**
终端就像一个"命令输入框"，你输入命令，电脑执行。

**打开方法：**

方法一：
1. 按 `Win + R`
2. 输入 `cmd`
3. 按回车

方法二（推荐）：
1. 按 `Win + S`
2. 输入 "PowerShell"
3. 点击 "Windows PowerShell"

> 💡 **小贴士**：建议把 PowerShell 固定到任务栏（右键图标 → 固定到任务栏）

---

## 📦 第二章：安装 OpenClaw

### 2.1 安装 OpenClaw CLI

**打开终端（PowerShell）**

**安装命令：**

```powershell
npm install -g openclaw
```

**这行命令的意思：**
- `npm` = Node.js 的包管理器（软件安装工具）
- `install` = 安装
- `-g` = 全局安装（让所有用户都能用）
- `openclaw` = 要安装的软件

**等待安装完成：**

```
🔄 正在下载和安装...
✅ 安装成功！
```

> ⏱️ 预计耗时：3-5分钟

### 2.2 验证安装成功

**检查版本：**

```powershell
openclaw --version
```

如果成功，会显示：

```
🦞 OpenClaw 2026.2.15
```

> 🎉 **恭喜！** OpenClaw 已经安装成功！

---

## ⚙️ 第三章：配置 OpenClaw

### 3.1 安装 Gateway 服务

**Gateway 是什么？**
Gateway 是 OpenClaw 的"大脑"，负责连接你和 AI。需要一直运行。

**安装 Gateway：**

```powershell
openclaw gateway install
```

**启动 Gateway：**

```powershell
openclaw gateway start
```

> 💡 首次启动可能需要 1-2 分钟，请耐心等待

### 3.2 检查运行状态

```powershell
openclaw gateway status
```

如果一切正常，会显示：

```
✅ Gateway 正在运行
🔗 连接地址：ws://127.0.0.1:8080
```

> 🎉 **太棒了！** Gateway 已经正常运行！

### 3.3 常见 Gateway 问题

**问题：提示端口被占用？**

```powershell
# 先关闭可能占用的程序
netstat -ano | findstr :8080
# 然后运行
taskkill /PID <进程ID> /F
# 最后重新启动
openclaw gateway start
```

---

## 🔑 第四章：获取和配置 API Key

### 4.1 什么是 API Key？

**简单解释：**
- AI 服务（如 MiniMax、Claude）就像"付费图书馆"
- API Key = 你的"借书卡"
- 每次问问题 = 借一本书，要收费

### 4.2 获取免费 API Key（推荐 MiniMax）

**注册步骤：**

1. 打开浏览器，访问：https://platform.minimax.chat/
2. 点击"注册/开始使用"
3. 用手机号或微信注册
4. 登录后，点击左侧"API Keys"
5. 点击"创建 API Key"
6. 复制生成的密钥

> 💡 **新用户福利**：MiniMax 新用户有免费额度，够用几个月！

### 4.3 配置 API Key

**方法一：临时配置（每次打开终端都要输入）**

```powershell
$env:OPENCLAW_API_KEY="你的APIKey"
```

**方法二：永久配置（推荐）**

1. 打开记事本（Win + R → notepad）
2. 粘贴以下内容：

```json
{
  "apiKeys": {
    "minimax": "你的APIKey"
  },
  "defaultModel": "MiniMax-M2.5"
}
```

> ⚠️ 把"你的APIKey"替换成你复制的密钥！

3. 保存到以下位置：
   - 文件名：`config.json`
   - 路径：`C:\Users\你的用户名\.openclaw\config.json`

**保存步骤：**
1. 记事本 → 文件 → 另存为
2. 浏览到 `C:\Users\你的用户名\` 
3. 右键 → 新建 → 文件夹，命名为 `.openclaw`
4. 保存到 `C:\Users\你的用户名\.openclaw\config.json`

> 💡 如果不会创建 `.openclaw` 文件夹，可以先保存为 `config.json`，然后用命令移动：
> ```powershell
> New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.openclaw"
> Move-Item config.json "$env:USERPROFILE\.openclaw\"
> ```

---

## 🎯 第五章：首次使用教程

### 5.1 启动对话

**方法一：命令行对话**

```powershell
openclaw
```

然后直接输入你的问题。

**方法二：Web 界面**

```powershell
openclaw dashboard
```

这会打开浏览器，显示可视化界面。

### 5.2 第一个任务：让 AI 帮你查天气

**输入：**

```
帮我查一下今天北京的天气怎么样？
```

**AI 会：**
1. 自动搜索天气
2. 整理信息
3. 回答你的问题

### 5.3 第二个任务：让 AI 帮你写东西

**输入：**

```
帮我写一封请假条，因为我明天感冒了
```

**AI 会：** 生成一封专业的请假条

### 5.4 第三个任务：让 AI 操作浏览器

**输入：**

```
帮我打开百度，搜索"OpenClaw 教程"
```

**AI 会：**
1. 自动打开浏览器
2. 访问百度
3. 搜索相关内容
4. 给你展示结果

---

## 🔧 第六章：进阶配置

### 6.1 设置默认模型

OpenClaw 支持多个 AI 模型：

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| MiniMax-M2.5 | 便宜、中文好 | 日常对话 |
| DeepSeek-Chat | 便宜、快速 | 简单问答 |

**设置默认模型：**

```powershell
openclaw models set-default MiniMax-M2.5
```

### 6.2 配置消息渠道

OpenClaw 可以连接多个聊天软件：

**查看可用渠道：**

```powershell
openclaw channels list
```

**连接 Telegram：**

1. 找 @BotFather 创建机器人
2. 获取 bot token
3. 运行：
```powershell
openclaw channels add telegram
```

### 6.3 设置定时任务

**什么是定时任务？**
让 AI 定时帮你做事情。

**设置每天早上 8 点提醒：**

```powershell
openclaw cron add --name "早安提醒" --schedule "0 8 * * *" --task "发送天气和问候"
```

---

## ❓ 第七章：常见问题解答

### Q1: 安装 node.js 失败？

**问题：** 安装报错或卡住

**解决方法：**
1. 关闭杀毒软件后再安装
2. 重启电脑后再尝试
3. 下载离线安装包：https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi

---

### Q2: 提示"找不到命令"？

**问题：** 输入 `openclaw` 显示找不到

**解决方法：**
1. 重新打开 PowerShell
2. 检查是否安装成功：`npm list -g openclaw`
3. 如果没装上，重新安装：`npm install -g openclaw`

---

### Q3: Gateway 启动失败？

**问题：** 启动报错或闪退

**解决方法：**
```powershell
# 停止所有相关进程
Get-Process | Where-Object {$_.Name -match "node"} | Stop-Process -Force
# 重新启动
openclaw gateway start
```

---

### Q4: API Key 每次都要重新输入？

**问题：** 每次打开终端都要设置

**解决方法：**
1. 打开 PowerShell
2. 输入：
```powershell
notepad $PROFILE
```
3. 在打开的记事本中粘贴：
```powershell
$env:OPENCLAW_API_KEY="你的APIKey"
```
4. 保存并关闭
5. 重新打开 PowerShell

---

### Q5: AI 回答很慢？

**问题：** 等待很久没回应

**可能原因：**
1. 网络不稳定 → 尝试切换 WiFi
2. API 额度用完 → 检查账户余额
3. 服务器繁忙 → 稍后再试

---

### Q6: 想卸载 OpenClaw？

**完全卸载步骤：**

```powershell
# 停止 Gateway
openclaw gateway stop

# 卸载 Gateway 服务
openclaw gateway uninstall

# 删除 CLI
npm uninstall -g openclaw

# 删除配置文件夹
Remove-Item -Recurse -Force "$env:USERPROFILE\.openclaw"
```

---

## 🎉 总结

### 你学到了什么？

通过本教程，你已经掌握了：

- ✅ **安装 Node.js** - 运行环境
- ✅ **安装 OpenClaw** - 安装 AI 助手
- ✅ **配置 Gateway** - 启动核心服务
- ✅ **获取 API Key** - 连接 AI 服务
- ✅ **首次使用** - 和 AI 开始对话
- ✅ **进阶配置** - 个性化设置

### 费用说明

| 项目 | 费用 |
|------|------|
| Windows 电脑 | 自有或 3000+ 元 |
| Node.js | 免费 |
| Openclaw | 免费 |
| API Key | 免费额度用完需充值（约 20-50 元/月） |

### 下一步做什么？

1. **多和 AI 聊天** - 熟悉各种功能
2. **尝试浏览器操作** - 让 AI 帮你操作电脑
3. **配置消息渠道** - 连接 Telegram 等
4. **设置定时任务** - 让 AI 自动帮你干活

### 需要帮助？

- 📚 官方文档：https://docs.openclaw.ai
- 💬 社区论坛：https://discord.gg/openclaw
- 🐛 问题反馈：https://github.com/openclaw/openclaw/issues

---

> 📝 **结束语**
> 
> 恭喜你已经成为 OpenClaw 用户！🎉
> 
> 记住：
> - AI 是工具，越用越熟练
> - 不懂就问，AI 会帮你解答
> - 多尝试新功能，会有惊喜！
> 
> 祝你使用愉快！有任何问题随时来问！🚀

---

*教程作者：小鱼*
*如有更新，恕不另行通知*
