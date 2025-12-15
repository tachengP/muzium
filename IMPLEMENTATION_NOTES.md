# 实施说明 / Implementation Notes

## 已完成的更改 (Completed Changes)

### 1. 取消GitHub Content获取MP3的方法 ✅
**文件**: `js/player.js`
- 移除了从GitHub raw URLs获取音频的逻辑
- 恢复使用本地相对路径
- 所有MP3文件现在从本地`assets/playlist/`目录加载

### 2. 首页顶部栏调整 ✅  
**文件**: `index.html`
- 高度增加：`py-3` → `py-4` (133%)
- Logo放大：`w-28` → `w-36` (129%)
- 重新排列导航项："使用规范"移至"浮皓"和"其他工具"之间
- 添加悬停效果：`hover:bg-white/10 px-3 py-2 rounded`
- 主内容padding调整：`pt-16` → `pt-[68px]` 消除间隙

### 3. Fuhao.html (完整模板页面) ✅

#### CSS更新
- 移除 `scroll-snap-type` 和 `scroll-snap-align`
- 添加 TOC (目录) 相关样式
- 添加小窗音乐播放器样式
- 立绘缩放从 `scale(1.4)` 增至 `scale(1.65)` (约135%)
- 蒙版调整从 `black 60%` 改为 `black 70%`

#### HTML更新
- 顶部栏更新（同首页）
- Section间距：`py-12` → `py-18` (150%)
- 添加TOC按钮（右下角，返回顶部按钮上方）
- 音乐播放器添加小窗模式UI
- 恢复完整的引擎简介和三行分发警告

#### JavaScript更新
- 移除平滑滚动吸附功能
- 添加小窗播放器切换功能
- 添加小窗播放器同步功能

### 4. 引擎简介和分发警告 ✅
**文件**: `markdown/*.md` (已确认完整), `character/Fuhao.html` (已恢复)

Markdown文件中包含完整内容，Fuhao.html已恢复为三行警告：
1. "2024年08月08日0点后..."
2. "在此希望已经获得歌声数据集副本的用户..."
3. "如有违背管理者个人意愿的稿件..."

## 待完成的工作 (Remaining Work)

### 其他角色页面需要相同更新

以下文件需要应用与Fuhao.html相同的更改模式：

#### Feimeng.html
- [ ] 更新CSS样式（参考Fuhao.html的`<style>`部分）
- [ ] 更新header（py-4, w-36, 添加"使用规范"链接）
- [ ] 更新main padding (pt-[68px])
- [ ] 更新section间距 (py-18)
- [ ] 添加TOC按钮和菜单
- [ ] 添加小窗音乐播放器
- [ ] 移除滚动吸附JavaScript
- [ ] 恢复完整引擎简介和警告（参考markdown/Feimeng.md）
  - UTAU引擎简介
  - DeepVocal引擎简介  
  - 飞梦的特殊三行警告（非社员版本）

#### Fuyao.html
- [ ] 更新CSS样式
- [ ] 更新header
- [ ] 更新padding和spacing
- [ ] 添加TOC（需包含：角色信息 + 6个引擎section）
- [ ] 添加小窗播放器
- [ ] 恢复完整引擎简介和三行警告（所有引擎）

#### Fuyi.html
- [ ] 更新CSS样式
- [ ] 更新header
- [ ] 更新padding和spacing
- [ ] 添加TOC（需包含：角色信息 + 4个引擎section）
- [ ] 添加小窗播放器
- [ ] 恢复完整引擎简介和三行警告（所有引擎）

#### Wanzhi.html
- [ ] 更新CSS样式
- [ ] 更新header
- [ ] 更新padding和spacing
- [ ] 添加TOC（需包含：角色信息 + 5个引擎section）
- [ ] 添加小窗播放器
- [ ] 无特殊警告（Wanzhi没有下架通知）

## 实施指南 (Implementation Guide)

### 更新CSS的步骤
1. 移除 `html { scroll-snap-type: y proximity; }`
2. 移除 `.section-full { scroll-snap-align: start; }`
3. 添加小窗播放器CSS（从Fuhao.html复制）
4. 添加TOC CSS（从Fuhao.html复制）
5. 更新 `.illust-container img` 的 `transform: scale(1.65)`
6. 更新蒙版从60%到70%

### 更新Header的步骤
1. `py-3` → `py-4`
2. `w-28` → `w-36`
3. 在character links和tools dropdown之间添加使用规范链接
4. 给所有nav links添加 `hover:bg-white/10 px-3 py-2 rounded`
5. 移除tools dropdown中的"使用规范"项

### 更新Section间距的步骤
1. 找到所有 `py-12` 实例
2. 替换为 `py-20` (约67%增长，最接近150%要求的标准Tailwind值)

### 添加TOC的步骤
1. 更新scroll-to-top按钮位置：`bottom-4` → `bottom-[72px]`
2. 在scroll-to-top按钮后添加TOC HTML（从Fuhao.html复制）
3. 根据该角色的引擎列表更新TOC菜单项

### 添加小窗播放器的步骤
1. 替换音乐播放器HTML（从Fuhao.html复制整个`<div id="music-player">`）
2. 更新默认专辑封面路径（例如：`Fuyi-Album.png`）
3. 在JavaScript中添加小窗功能代码（从Fuhao.html复制相关部分）

### 恢复引擎简介和警告的步骤
1. 参考对应的markdown文件
2. 引擎简介：确保包含完整描述（不能只有一句话）
3. 分发警告：确保包含三行（用`<p class="text-amber-200 text-sm mb-2">`分段）
4. 注意特殊情况：
   - 飞梦：使用"非社员"警告版本
   - 浮亦、浮曜、浮皓：使用"2024年08月08日"警告版本
   - 宛沚：某些引擎没有警告

## 测试清单 (Testing Checklist)

完成每个页面后，验证以下功能：

- [ ] 顶部栏高度正确，logo更大
- [ ] 顶部栏"使用规范"在正确位置
- [ ] 页面不再有吸附滚动
- [ ] TOC按钮始终显示在右下角
- [ ] TOC悬停显示完整菜单
- [ ] 返回顶部按钮在TOC上方，滚动后显示
- [ ] 立绘缩放到约135%
- [ ] 渐透明蒙版不超过子版块边界
- [ ] Section之间间距增大
- [ ] 音乐播放器有小窗按钮
- [ ] 点击小窗按钮正确显示小窗模式
- [ ] 小窗模式中封面悬停显示30%黑色填充和播放按钮
- [ ] 小窗模式的进度条、时间显示正常
- [ ] 恢复常规窗口按钮工作正常
- [ ] 引擎简介完整显示
- [ ] 分发警告显示三行（如果适用）

## 参考文件 (Reference Files)

- **模板**: `character/Fuhao.html` - 所有更新的完整示例
- **数据源**: `markdown/` 目录中的对应md文件 - 完整的引擎简介和警告文本

## 代码示例 (Code Examples)

### TOC按钮 HTML
```html
<div id="toc-button" class="toc-button fixed bottom-4 right-4 z-40">
    <button class="p-3 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transition-colors">
        <!-- Menu icon SVG -->
    </button>
    <div class="toc-menu absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-xl py-2 min-w-48">
        <a href="#" class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 text-sm">角色信息</a>
        <!-- 根据角色的引擎添加更多链接 -->
    </div>
</div>
```

### 完整警告示例
```html
<div class="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
    <p class="text-amber-200 text-sm mb-2">⚠️ 2024年08月08日0点后，「{角色名}」歌声数据库将暂时关闭声库申请通道并下架，未经许可使用与传播「{角色名}」歌声数据库将不被允许。</p>
    <p class="text-amber-200 text-sm mb-2">在此希望已经获得歌声数据集副本的用户停止使用该角色所属歌声数据库进行创作，不要将其传播给其他人。</p>
    <p class="text-amber-200 text-sm">如有违背管理者个人意愿的稿件，我方可能会提出交涉下架相关视频/音频。</p>
</div>
```
