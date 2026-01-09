#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mac 版 QQ 群监控机器人
功能：监控 QQ 群消息，检测关键词后自动@群友并回复自定义消息
注意：需要先安装 qqbot 库：pip3 install qqbot
"""

import sys
import html

# 修复 qqbot 库与 Python 3.9+ 的兼容性问题
# 在导入 qqbot 之前修复 html.unescape 的问题
try:
    # 尝试导入 qqbot 的 common 模块并修复
    from unittest.mock import patch
    import html.parser
    
    # 创建一个补丁函数来替换原来的 htmlUnescape
    def patched_html_unescape():
        return html.unescape
    
    # 应用补丁
    import qqbot
    from qqbot import common
    
    # 替换有问题的 htmlUnescape
    if hasattr(common, 'htmlUnescape'):
        # 检查是否是需要修复的旧版本
        common.htmlUnescape = html.unescape
    else:
        # 尝试在导入时修复
        import qqbot.common as qcommon
        qcommon.htmlUnescape = html.unescape
        
except Exception as e:
    print(f"修复兼容性时遇到问题: {e}")
    print("尝试继续运行...")

# 现在正常导入 qqbot
from qqbot import QQBotSlot as qqbotslot, RunBot


# 配置部分
class QQMonitorConfig:
    """QQ 监控机器人的配置类"""
    
    # 关键词-回复映射表
    # 格式: "关键词": "回复消息"
    KEYWORD_REPLY_MAP = {
        "打卡": "记得坚持哦！辛苦了~ [表情：/可爱]",
        "提问": "好问题，稍后会有同学为你解答。",
        "反馈": "感谢你的反馈，我们已经记录了。",
        "求助": "别着急，马上有同学来帮你！",
        "收到": "好的，已确认收到！",
    }
    
    # 要监控的群列表（可选，为空则监控所有群）
    # 填写群名称，如 ["技术交流群", "学习小组"]
    MONITOR_GROUPS = []
    
    # 忽略的关键词列表（避免某些关键词触发）
    IGNORE_KEYWORDS = []
    
    # 回复频率限制（秒，避免刷屏）
    REPLY_COOLDOWN = 2


# 核心消息处理类
class QQMessageHandler:
    """处理 QQ 群消息的处理器"""
    
    def __init__(self, config):
        self.config = config
        self.last_reply_time = {}  # 用于频率限制
    
    def should_process_group(self, group_name):
        """判断是否应该处理这个群的消息"""
        if not self.config.MONITOR_GROUPS:
            return True
        return group_name in self.config.MONITOR_GROUPS
    
    def check_cooldown(self, group_name):
        """检查冷却时间"""
        import time
        current_time = time.time()
        if group_name in self.last_reply_time:
            time_passed = current_time - self.last_reply_time[group_name]
            if time_passed < self.config.REPLY_COOLDOWN:
                return False
        self.last_reply_time[group_name] = current_time
        return True
    
    def process_message(self, bot, contact, member, content):
        """处理收到的消息"""
        # 只处理群消息
        if contact.ctype != 'group':
            return
        
        group_name = contact.name
        member_name = member.card if member.card else member.nick
        
        print(f"[收到消息] 群: {group_name}, 用户: {member_name}, 内容: {content}")
        
        # 检查是否监控此群
        if not self.should_process_group(group_name):
            return
        
        # 检查冷却时间
        if not self.check_cooldown(group_name):
            return
        
        # 遍历关键词进行匹配
        for keyword, reply_message in self.config.KEYWORD_REPLY_MAP.items():
            # 检查忽略列表
            if keyword in self.config.IGNORE_KEYWORDS:
                continue
                
            # 检查是否包含关键词
            if keyword in content:
                # 构建回复内容
                at_member = f"@{member_name}"
                full_reply = f"{at_member} {reply_message}"
                
                # 发送回复
                try:
                    bot.SendTo(contact, full_reply)
                    print(f"[已回复] 群: {group_name}, 用户: {member_name}, 关键词: {keyword}")
                    print(f"[回复内容] {full_reply}")
                    print("-" * 50)
                except Exception as e:
                    print(f"[发送失败] 错误: {e}")
                
                # 匹配到一个关键词后就返回，避免重复回复
                return


# 创建配置和处理器实例
config = QQMonitorConfig()
handler = QQMessageHandler(config)


# QQBot 消息回调函数
@qqbotslot
def onQQMessage(bot, contact, member, content):
    """QQBot 消息回调函数"""
    handler.process_message(bot, contact, member, content)


# 启动前的提示信息
def print_startup_info():
    """打印启动信息"""
    print("=" * 60)
    print("Mac QQ 群监控机器人")
    print("=" * 60)
    print(f"监控关键词: {', '.join(config.KEYWORD_REPLY_MAP.keys())}")
    if config.MONITOR_GROUPS:
        print(f"监控群组: {', '.join(config.MONITOR_GROUPS)}")
    else:
        print("监控群组: 所有群组")
    print(f"回复冷却时间: {config.REPLY_COOLDOWN}秒")
    print("=" * 60)
    print("提示: 首次运行会要求扫码登录QQ")
    print("按 Ctrl+C 停止机器人")
    print("=" * 60)


# 主函数
def main():
    """主函数"""
    print_startup_info()
    
    try:
        # 运行 QQ 机器人
        RunBot()
    except KeyboardInterrupt:
        print("\n\n机器人已停止")
    except Exception as e:
        print(f"\n运行出错: {e}")
        print("可能的原因:")
        print("1. QQBot 库与当前 Python 版本不兼容")
        print("2. 需要重新登录 (删除 ~/.qqbot-tmp 目录后重试)")
        print("3. 网络连接问题")
        sys.exit(1)


if __name__ == '__main__':
    main()
