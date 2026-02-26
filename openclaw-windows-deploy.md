# OpenClaw Windows 电脑部署完全指南

> 📅 更新日期：2026年2月
> 👨‍🏫 适合人群：电脑小白、完全没有编程经验
> ⏱️ 预计耗时：30-45分钟

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

> 💡 **温馨提醒**：强烈建议在 Windows 上使用 **WSL2**（Windows Linux 子系统）来运行 OpenClaw，体验更流畅！如果你不想用 WSL，也可以直接用 PowerShell 安装（见下文）。

---

## 🛠️ 第一章：准备工作

### 1.1 检查你的电脑

首先确认电脑满足以下条件：

- ✅ **Windows 10 或 Windows 11**（点击开始 → 设置 → 关于查看）
- ✅ **至少 4GB 内存**（越多越好）
- ✅ **20GB 可用硬盘空间**
- ✅ **稳定的网络连接**

### 1.2 选择安装方式

OpenClaw 在 Windows 上有两种安装方式：

| 方式 | 优点 | 缺点 |
|------|------|------|
| **方式一：WSL2（推荐）** | 体验最接近 Linux，兼容性最好 | 需要启用 WSL2 功能 |
| **方式二：PowerShell** | 安装简单，直接运行 | 可能遇到兼容性问题 |

> ⚠️ **官方建议**：OpenClaw 官方推荐使用 **WSL2**，可获得最佳体验。以下教程会分别介绍两种方式。

---

## 📦 第二章：安装 OpenClaw

### 方式一：使用 WSL2 安装（推荐 🌟）

#### 2.1.1 启用 WSL2

**什么是 WSL2？**
WSL2 是 Windows 自带的 Linux 环境，就像在 Windows 里运行一台虚拟电脑。

**启用步骤：**

1. **以管理员身份打开 PowerShell**
   - 右键点击开始菜单
   - 选择 "Windows PowerShell (管理员)"

2. **输入以下命令并回车：**
   ```powershell
   wsl --install
   ```

3. **等待安装完成**，电脑会自动重启

4. **重启后**，会自动弹出 Ubuntu 终端，设置用户名和密码

> 💡 如果 `wsl --install` 不起作用，先手动启用 WSL 功能：
> ```powershell
> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
> ```

#### 2.1.2 在 WSL2 中安装 OpenClaw

**打开 WSL 终端（Ubuntu）：**

1. 点击开始菜单
2. 输入 "Ubuntu"
3. 点击 "Ubuntu" 应用

**运行安装命令：**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**这行命令的意思：**
- `curl` = 下载安装脚本
- `fsSL` = 静默下载
- `https://openclaw.ai/install.sh` = 安装脚本地址
- `| bash` = 执行脚本

**等待安装完成：**

```
🔄 正在下载和安装...
✅ 安装成功！
```

> ⏱️ 预计耗时：3-5分钟

#### 2.1.3 验证 WSL2 中的安装

**检查版本：**

```bash
openclaw --version
```

如果成功，会显示版本号：

```
🦞 OpenClaw 2026.x.x
```

---

### 方式二：直接用 PowerShell 安装

#### 2.2.1 打开 PowerShell

**方法：**
1. 按 `Win + S`
2. 输入 "PowerShell"
3. 右键点击 "Windows PowerShell"
4. 选择 "以管理员身份运行"

#### 2.2.2 运行安装命令

**安装命令：**

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

**这行命令的意思：**
- `iwr` = Invoke-WebRequest（下载脚本）
- `-useb` = 使用 Bencoding 编码
- `https://openclaw.ai/install.ps1` = 安装脚本
- `| iex` = 执行脚本

**等待安装完成：**

```
🔄 正在下载和安装...
✅ 安装成功！
```

> ⏱️ 预计耗时：3-5分钟

#### 2.2.3 验证安装

**检查版本：**

```powershell
openclaw --version
```

如果成功，会显示版本号：

```
🦞 OpenClaw 2026.x.x
```

---

### 2.3 启动 Gateway 服务

**Gateway 是什么？**
Gateway 是 OpenClaw 的"大脑"，负责连接你和 AI。需要一直运行。

**安装 Gateway：**

```bash
# 在 WSL2 中
openclaw gateway install

# 在 PowerShell 中
openclaw gateway install
```

**启动 Gateway：**

```bash
openclaw gateway start
```

> 💡 首次启动可能需要 1-2 分钟，请耐心等待

**检查运行状态：**

```bash
openclaw gateway status
```

如果一切正常，会显示：

```
✅ Gateway 正在运行
🔗 连接地址：ws://127.0.0.1:8080
```

> 🎉 **太棒了！** Gateway 已经正常运行！

---

## 🔑 第三章：获取和配置 API Key

### 3.1 什么是 API Key？

**简单解释：**
- AI 服务（如 MiniMax、Claude）就像"付费图书馆"
- API Key = 你的"借书卡"
- 每次问问题 = 借一本书，要收费

### 3.2 获取免费 API Key（推荐 MiniMax）

**注册步骤：**

1. 打开浏览器，访问：https://platform.minimax.chat/
2. 点击"注册/开始使用"
3. 用手机号或微信注册
4. 登录后，点击左侧"API Keys"
5. 点击"创建 API Key"
6. 复制生成的密钥

> 💡 **新用户福利**：MiniMax 新用户有免费额度，够用几个月！

### 3.3 配置 API Key

**方法一：临时配置（每次打开终端都要输入）**

```bash
# 在 WSL2 中
export OPENCLAW_API_KEY="你的APIKey"

# 在 PowerShell 中
$env:OPENCLAW_API_KEY="你的APIKey"
```

**方法二：永久配置（推荐）**

1. 创建配置文件夹：
   ```bash
   # 在 WSL2 中
   mkdir -p ~/.openclaw
   
   # 在 PowerShell 中
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.openclaw"
   ```

2. 创建配置文件：
   
   **在 WSL2 中：**
   ```bash
   nano ~/.openclaw/config.json
   ```
   
   **在 PowerShell 中：**
   ```powershell
   notepad "$env:USERPROFILE\.openclaw\config.json"
   ```

3. 粘贴以下内容（替换"你的APIKey"）：
   ```json
   {
     "apiKeys": {
       "minimax": "你的APIKey"
     },
     "defaultModel": "MiniMax-M2.5"
   }
   ```

4. 保存并退出

---

## 🎯 第四章：首次使用教程

### 4.1 启动对话

**方法一：命令行对话**

```bash
openclaw
```

然后直接输入你的问题。

**方法二：Web 界面**

```bash
openclaw dashboard
```

这会打开浏览器，显示可视化界面。

### 4.2 第一个任务：让 AI 帮你查天气

**输入：**

```
帮我查一下今天北京的天气怎么样？
```

**AI 会：**
1. 自动搜索天气
2. 整理信息
3. 回答你的问题

### 4.3 第二个任务：让 AI 帮你写东西

**输入：**

```
帮我写一封请假条，因为我明天感冒了
```

**AI 会：** 生成一封专业的请假条

### 4.4 第三个任务：让 AI 操作浏览器

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

## 🔧 第五章：进阶配置

### 5.1 设置默认模型

OpenClaw 支持多个 AI 模型：

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| MiniMax-M2.5 | 便宜、中文好 | 日常对话 |
| DeepSeek-Chat | 便宜、快速 | 简单问答 |

**设置默认模型：**

```bash
openclaw models set-default MiniMax-M2.5
```

### 5.2 配置消息渠道

OpenClaw 可以连接多个聊天软件：

**查看可用渠道：**

```bash
openclaw channels list
```

**连接 Telegram：**

1. 找 @BotFather 创建机器人
2. 获取 bot token
3. 运行：
```bash
openclaw channels add telegram
```

### 5.3 设置定时任务

**什么是定时任务？**
让 AI 定时帮你做事情。

**设置每天早上 8 点提醒：**

```bash
openclaw cron add --name "早安提醒" --schedule "0 8 * * *" --task "发送天气和问候"
```

---

## ❓ 第六章：常见问题解答

### Q1: WSL2 安装失败？

**问题：** `wsl --install` 报错

**解决方法：**
1. 确保 BIOS 中已启用虚拟化
2. 手动启用 WSL 功能：
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
3. 重启电脑

---

### Q2: 提示"找不到命令"？

**问题：** 输入 `openclaw` 显示找不到

**解决方法：**
1. 重新打开终端（WSL 或 PowerShell）
2. 检查是否安装成功：
   ```bash
   # WSL2
   npm list -g openclaw
   
   # PowerShell
   npm list -g openclaw
   ```
3. 如果没装上，重新安装

---

### Q3: Gateway 启动失败？

**问题：** 启动报错或闪退

**解决方法：**
```bash
# 停止所有相关进程
pkill -f node

# 重新启动
openclaw gateway start
```

---

### Q4: API Key 每次都要重新输入？

**问题：** 每次打开终端都要设置

**解决方法：**
1. 打开终端配置文件：
   - WSL2: `nano ~/.bashrc`
   - PowerShell: `notepad $PROFILE`
2. 在最后添加：
   ```bash
   # WSL2
   export OPENCLAW_API_KEY="你的APIKey"
   
   # PowerShell
   $env:OPENCLAW_API_KEY="你的APIKey"
   ```
3. 保存并关闭
4. 重新打开终端

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

```bash
# 停止 Gateway
openclaw gateway stop

# 卸载 Gateway 服务
openclaw gateway uninstall

# 删除 CLI
npm uninstall -g openclaw

# 删除配置文件夹
# WSL2
rm -rf ~/.openclaw

# PowerShell
Remove-Item -Recurse -Force "$env:USERPROFILE\.openclaw"
```

---

### Q7: 什么时候用 WSL2？什么时候用 PowerShell？

| 场景 | 推荐 |
|------|------|
| 长期使用、追求稳定性 | WSL2 |
| 偶尔尝鲜、快速测试 | PowerShell |
| 需要经常操作文件 | WSL2 |
| 只想简单体验 | PowerShell |

---

## 🎉 总结

### 你学到了什么？

通过本教程，你已经掌握了：

- ✅ **启用 WSL2**（可选）- Windows Linux 子系统
- ✅ **安装 OpenClaw** - 安装 AI 助手
- ✅ **配置 Gateway** - 启动核心服务
- ✅ **获取 API Key** - 连接 AI 服务
- ✅ **首次使用** - 和 AI 开始对话
- ✅ **进阶配置** - 个性化设置

### 费用说明

| 项目 | 费用 |
|------|------|
| Windows 电脑 | 自有或 3000+ 元 |
| Openclaw | 免费 |
| API Key | 免费额度用完需充值（约 20-50 元/月） |

### 下一步做什么？

1. **多和 AI 聊天** - 熟悉各种功能
2. **尝试浏览器操作** - 让 AI 帮你操作电脑
3. **配置消息渠道** - 连接 Telegram、Discord、飞书等 → [查看教程](./openclaw-channels-config.html)
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
