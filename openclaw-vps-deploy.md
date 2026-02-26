# OpenClaw VPS 服务器部署完全指南

> 📅 更新日期：2026年2月
> 👨‍🏫 适合人群：电脑小白、完全没有编程经验、需要远程运行
> ⏱️ 预计耗时：45-60分钟

---

## 📖 前言：为什么要用 VPS 运行 OpenClaw？

### 什么是 VPS？

**简单解释：**
- VPS = Virtual Private Server（虚拟专用服务器）
- 想象一下，你租了一台永远开机的电脑
- 它 24 小时运行，不需要你维护
- 无论你在哪里，都能通过手机或电脑访问它

### 为什么选择 VPS 运行 OpenClaw？

| 优点 | 说明 |
|------|------|
| 🌐 随时随地访问 | 不在电脑前也能用 AI |
| ⚡ 24小时运行 | 定时任务随时执行 |
| 🔒 更安全 | 不暴露个人电脑 |
| 💻 不占本地资源 | 不影响你正常使用电脑 |

### 什么时候用 VPS？

- ✅ 需要 24 小时运行 AI 任务
- ✅ 不在电脑旁边也想用 AI
- ✅ 需要同时运行多个 AI 任务
- ✅ 想要更专业的运行环境

---

## 🛠️ 第一章：准备工作

### 1.1 购买 VPS 服务器

**推荐服务商：**

| 服务商 | 特点 | 推荐配置 |
|--------|------|----------|
| 阿里云 | 国内访问快，稳定 | 2核4G |
| 腾讯云 | 国内访问快，便宜 | 2核4G |
| DigitalOcean | 国际线路好 | 2核4G |
| 搬瓦工 | 性价比高 | 2核2G |

> 💡 **新手推荐**：阿里云或腾讯云的新用户优惠，1年大约 100-200 元

**购买后的信息：**

购买 VPS 后，你会收到以下信息（保存好！）：

```
🖥️ 服务器 IP：123.45.67.890
👤 用户名：root
🔑 登录密码：xxxxxx（或者 SSH 密钥）
```

> ⚠️ **温馨提醒**：这些信息很重要，不要泄露给其他人！

### 1.2 连接 VPS

#### Windows 用户：使用远程桌面

1. 按 `Win + R`，输入 `mstsc`
2. 输入 VPS 的 IP 地址
3. 输入用户名 `root` 和密码
4. 点击连接

#### Mac 用户：使用终端

1. 打开终端（Terminal）
2. 输入以下命令：

```bash
ssh root@123.45.67.890
```

> 💡 把 `123.45.67.890` 替换成你的 VPS IP 地址

3. 第一次连接会问 "Are you sure you want to continue?"，输入 `yes` 然后回车
4. 输入 VPS 密码（输入时不显示字符是正常的）

> 🎉 **恭喜！** 你已经连接到 VPS 了！

---

## 📦 第二章：在 VPS 上安装 OpenClaw

### 2.1 安装必要软件

连接到 VPS 后，先更新系统：

```bash
# 更新软件包列表（需要 sudo 权限）
apt update && apt upgrade -y
```

**命令解释：**
- `apt` = Ubuntu/Debian 的软件管理器
- `update` = 检查更新
- `upgrade` = 升级软件
- `-y` = 自动确认所有询问

> ⏱️ 预计耗时：5-10分钟

### 2.2 安装 Node.js

**安装 Node.js 环境：**

```bash
# 安装 Node.js 18 版本
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

**验证安装：**

```bash
node --version
npm --version
```

如果成功，会显示版本号，例如：

```
v18.19.0
10.2.4
```

### 2.3 安装 OpenClaw

**安装 OpenClaw CLI：**

```bash
npm install -g openclaw
```

**验证安装：**

```bash
openclaw --version
```

如果成功，会显示版本信息：

```
🦞 OpenClaw 2026.2.15
```

> 🎉 **太棒了！** OpenClaw 已经安装成功！

---

## ⚙️ 第三章：配置 OpenClaw

### 3.1 安装 Gateway 服务

**安装 Gateway：**

```bash
openclaw gateway install
```

这行命令会在 VPS 上安装一个"后台服务"，让 OpenClaw 始终保持运行。

### 3.2 启动 Gateway

**启动服务：**

```bash
openclaw gateway start
```

**检查状态：**

```bash
openclaw gateway status
```

正常情况下会显示：

```
✅ Gateway 正在运行
🔗 连接地址：ws://0.0.0.0:8080
```

> 💡 **VPS 特点**：`0.0.0.0` 意味着可以从任何地方访问！

### 3.3 配置 API Key

**获取 API Key（见 Mac 版教程第四章）**

这里有两种配置方式：

#### 方式一：环境变量（临时）

```bash
export OPENCLAW_API_KEY="你的API Key"
```

#### 方式二：配置文件（永久）

```bash
mkdir -p ~/.openclaw
nano ~/.openclaw/config.json
```

添加以下内容：

```json
{
  "apiKeys": {
    "minimax": "你的MiniMax API Key"
  },
  "defaultModel": "MiniMax-M2.5"
}
```

按 `Ctrl + O` 保存，`Ctrl + X` 退出。

---

## 🌐 第四章：远程访问设置

### 4.1 为什么需要远程访问？

VPS 上的 OpenClaw 运行后，你可能想：
- 在家里电脑上使用
- 在手机上使用
- 让别人也能使用

这就需要配置**远程访问**。

### 4.2 方法一：Tailscale（推荐）

**什么是 Tailscale？**
- 类似 VPN，但更容易设置
- 让你安全地访问 VPS

**安装步骤：**

1. 在 VPS 上安装：
```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

2. 启动 Tailscale：
```bash
tailscale up
```

3. 会显示一个网址，复制到浏览器打开
4. 用 Google/微软账号登录
5. 获取设备连接命令

**获取你的 VPS 地址：**
```bash
tailscale ip -4
```

会显示类似 `100.xx.xx.xx` 的地址，这就是你从任何地方访问 VPS 的地址！

### 4.3 方法二：配置密码访问

**设置 Gateway 密码：**

```bash
openclaw gateway stop
openclaw gateway start --auth password --password 你的密码
```

这样别人访问时需要输入密码，更加安全。

---

## 📱 第五章：如何使用

### 5.1 本地电脑连接 VPS

**方法一：通过命令行**

在本地电脑上安装 OpenClaw 后：

```bash
openclaw connect ws://你的VPSIP:8080 --token 你的token
```

**方法二：通过 Web 界面**

1. 打开浏览器
2. 访问：`http://你的VPSIP:8080`
3. 输入密码（如果设置了）

### 5.2 常用命令

在 VPS 上执行的命令：

```bash
# 查看 Gateway 状态
openclaw gateway status

# 查看日志
openclaw logs

# 重启 Gateway
openclaw gateway restart

# 停止 Gateway
openclaw gateway stop
```

---

## 🔧 第六章：定时任务配置

### 6.1 什么是定时任务？

让 AI 在指定时间自动执行任务，例如：

- 📰 每天早上 8 点推送新闻
- 💰 每天下午 5 点提醒检查订单
- 📊 每周一生成周报

### 6.2 设置定时任务

**添加定时任务：**

```bash
openclaw cron add --name "每日天气" --schedule "0 8 * * *" --task "查询北京天气并发送到Telegram"
```

**查看定时任务：**

```bash
openclaw cron list
```

**删除定时任务：**

```bash
openclaw cron delete 任务ID
```

### 6.3 常用定时任务示例

| 任务 | Cron 表达式 | 说明 |
|------|-------------|------|
| 每天早上8点 | `0 8 * * *` | 每天 8:00 执行 |
| 每小时 | `0 * * * *` | 每小时整点执行 |
| 每天3次 | `0 9,12,18 * * *` | 9点、12点、18点执行 |
| 每周一 | `0 9 * * 1` | 每周一 9:00 执行 |

---

## ❓ 第七章：常见问题解答

### Q1: VPS 性能不够用？

**问题：** 运行卡顿、反应慢

**解决方法：**
- 升级 VPS 配置（增加内存）
- 关闭不需要的服务
- 使用更轻量的模型

---

### Q2: 如何备份数据？

**定期备份很重要！**

```bash
# 备份配置文件
cp -r ~/.openclaw ~/openclaw-backup
```

---

### Q3: Gateway 总是自动停止？

**问题：** 重启后 Gateway 不自动运行

**解决方法：**
```bash
# 检查是否开机自启
systemctl status openclaw-gateway

# 重新启用开机自启
systemctl enable openclaw-gateway
```

---

### Q4: 忘记 VPS 密码怎么办？

**找回方法：**
1. 登录服务商后台
2. 找到 VPS 管理页面
3. 选择"重置密码"或"Console"
4. 按照提示操作

---

### Q5: 不用了怎么卸载？

**完全卸载步骤：**

```bash
# 停止 Gateway
openclaw gateway stop
openclaw gateway uninstall

# 删除 CLI
npm uninstall -g openclaw

# 删除数据（谨慎！）
rm -rf ~/.openclaw
```

---

## 🎉 总结

### 你学到了什么？

- ✅ **购买和连接 VPS** - 获得远程服务器
- ✅ **安装 OpenClaw** - 在服务器上部署
- ✅ **配置 Gateway** - 启动核心服务
- ✅ **远程访问设置** - 随时随地使用
- ✅ **定时任务** - 自动化工作流程

### 费用估算

| 项目 | 月费用 | 年费用 |
|------|--------|--------|
| VPS (2核4G) | 30-50元 | 300-500元 |
| 域名（可选） | 5元 | 60元 |
| API 调用 | 20-50元 | 240-600元 |
| **合计** | **55-105元** | **600-1160元** |

### 下一步

1. **配置更多功能** - 消息渠道、浏览器操作
2. **设置定时任务** - 让 AI 自动工作
3. **监控使用量** - 避免超额

---

> 📝 **结束语**
> 
> 恭喜你已经掌握了 VPS 部署！🎉
> 
> 现在你可以：
> - 24 小时运行 AI 任务
> - 随时随地通过手机或电脑访问
> - 设置自动化工作流程
> 
> 祝你使用愉快！🚀

---

*教程作者：小鱼*
*如有更新，恕不另行通知*
