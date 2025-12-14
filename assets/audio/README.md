# 音频文件目录

此目录用于存放试听曲和清唱样本的音频文件。

## 试听曲播放列表

试听曲配置文件位于 `/data/playlist.json`，请按照以下格式添加音乐：

```json
[
  {
    "title": "歌曲名称",
    "artist": "角色名",
    "url": "/assets/audio/filename.mp3",
    "cover": "/images/Cover.jpg"
  }
]
```

## 清唱样本

各角色页面中的清唱试听需要以下文件：

### 浮亦 (Fuyi)
- `fuyi_natural.wav` - Natural（自然音色）
- `fuyi_whisper.wav` - Whisper（轻柔音色）
- `fuyi_mature.wav` - Mature（成熟音色）
- `fuyi_ace.wav` - ACE Studio默认音色

### 宛沚 (Wanzhi)
- `wanzhi_vogen.wav` - Project Vogen默认音色
- `wanzhi_ds.wav` - DiffSinger默认音色

### 浮曜 (Fuyao)
- `fuyao_dv.wav` - DeepVocal默认音色
- `fuyao_ds.wav` - DiffSinger默认音色

## 支持格式

- MP3 (推荐用于试听曲)
- WAV (推荐用于清唱样本，以保持音质)

## 注意事项

音频文件不包含在本仓库中，请自行添加或联系管理员获取。
