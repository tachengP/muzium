/* ============================================
   藏声馆 - 虚拟歌手官网
   主要JavaScript文件
   ============================================ */

// 多语言支持
const i18n = {
  'zh-CN': {
    nav: {
      home: '主页',
      eula: '使用规约',
      tools: '工具',
      about: '关于'
    },
    home: {
      enter: '进入角色页面',
      viewMore: '了解更多'
    },
    player: {
      title: '试听曲播放器',
      download: '下载音乐',
      prev: '上一首',
      next: '下一首',
      play: '播放',
      pause: '暂停'
    },
    character: {
      design: '角色设定',
      voicebank: '声库信息',
      samples: '清唱试听',
      download: '下载立绘'
    },
    modal: {
      title: '下载确认',
      readComplete: '我已阅读并同意使用规约',
      cancel: '取消',
      confirm: '确认下载'
    },
    footer: {
      copyright: '© 2025 Muzium. 保留所有权利。',
      fontCredit: '字体来源：MiSans SC by Xiaomi',
      contact: '联系方式',
      links: '相关链接'
    }
  },
  'en': {
    nav: {
      home: 'Home',
      eula: 'EULA',
      tools: 'Tools',
      about: 'About'
    },
    home: {
      enter: 'Enter Character Page',
      viewMore: 'Learn More'
    },
    player: {
      title: 'Music Player',
      download: 'Download',
      prev: 'Previous',
      next: 'Next',
      play: 'Play',
      pause: 'Pause'
    },
    character: {
      design: 'Character Design',
      voicebank: 'Voice Bank',
      samples: 'Voice Samples',
      download: 'Download Illustration'
    },
    modal: {
      title: 'Download Confirmation',
      readComplete: 'I have read and agree to the EULA',
      cancel: 'Cancel',
      confirm: 'Confirm Download'
    },
    footer: {
      copyright: '© 2025 Muzium. All rights reserved.',
      fontCredit: 'Font: MiSans SC by Xiaomi',
      contact: 'Contact',
      links: 'Links'
    }
  },
  'ja': {
    nav: {
      home: 'ホーム',
      eula: '利用規約',
      tools: 'ツール',
      about: '概要'
    },
    home: {
      enter: 'キャラクターページへ',
      viewMore: '詳細を見る'
    },
    player: {
      title: '試聴プレーヤー',
      download: 'ダウンロード',
      prev: '前へ',
      next: '次へ',
      play: '再生',
      pause: '一時停止'
    },
    character: {
      design: 'キャラクター設定',
      voicebank: '音声ライブラリ',
      samples: 'ボイスサンプル',
      download: 'イラストをダウンロード'
    },
    modal: {
      title: 'ダウンロード確認',
      readComplete: '利用規約を読み、同意しました',
      cancel: 'キャンセル',
      confirm: 'ダウンロード'
    },
    footer: {
      copyright: '© 2025 Muzium. 全著作権所有。',
      fontCredit: 'フォント：MiSans SC by Xiaomi',
      contact: 'お問い合わせ',
      links: 'リンク'
    }
  }
};

// 当前语言
let currentLang = 'zh-CN';

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initBackToTop();
  initMusicPlayer();
  initDownloadModal();
  initIllustGallery();
  initVoiceSamples();
  initLanguageSwitcher();
  
  // 如果在角色页面，初始化Bilibili数据
  if (document.querySelector('.bilibili-stats')) {
    fetchBilibiliStats();
  }
});

/* ============================================
   导航栏功能
   ============================================ */

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 滚动时改变导航栏背景
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(10, 10, 20, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 20, 0.95)';
    }
    
    lastScrollTop = scrollTop;
  });
}

/* ============================================
   返回顶部按钮
   ============================================ */

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================
   音乐播放器
   ============================================ */

let audioContext = null;
let analyser = null;
let sourceNode = null;
let animationId = null;
let currentTrackIndex = 0;
let playlist = [];
let isPlaying = false;

function initMusicPlayer() {
  const player = document.querySelector('.music-player');
  if (!player) return;
  
  const audio = player.querySelector('audio') || createAudioElement(player);
  const playBtn = player.querySelector('.player-btn.main');
  const prevBtn = player.querySelector('.player-btn.prev');
  const nextBtn = player.querySelector('.player-btn.next');
  const progress = player.querySelector('.player-progress');
  const progressFill = player.querySelector('.player-progress-fill');
  const currentTimeEl = player.querySelector('.time-current');
  const durationEl = player.querySelector('.time-duration');
  const minimizeBtn = player.querySelector('.player-minimize');
  const downloadBtn = player.querySelector('.player-download');
  const spectrumContainer = player.querySelector('.spectrum-container');
  
  // 加载播放列表
  loadPlaylist().then(tracks => {
    playlist = tracks;
    if (playlist.length > 0) {
      loadTrack(0);
    }
  });
  
  // 播放/暂停
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }
  
  // 上一首/下一首
  if (prevBtn) {
    prevBtn.addEventListener('click', playPrevious);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', playNext);
  }
  
  // 进度条点击
  if (progress) {
    progress.addEventListener('click', function(e) {
      const rect = progress.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * audio.duration;
    });
  }
  
  // 更新进度
  audio.addEventListener('timeupdate', function() {
    if (progressFill && audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + '%';
    }
    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });
  
  // 加载元数据
  audio.addEventListener('loadedmetadata', function() {
    if (durationEl) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });
  
  // 播放结束
  audio.addEventListener('ended', function() {
    playNext();
  });
  
  // 最小化/展开
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', function() {
      player.classList.toggle('minimized');
    });
  }
  
  // 下载
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (playlist[currentTrackIndex]) {
        const link = document.createElement('a');
        link.href = playlist[currentTrackIndex].url;
        link.download = playlist[currentTrackIndex].title + '.mp3';
        link.click();
      }
    });
  }
  
  // 创建频谱条
  if (spectrumContainer) {
    createSpectrumBars(spectrumContainer, 50);
  }
  
  function togglePlay() {
    const audio = player.querySelector('audio');
    if (audio.paused) {
      audio.play();
      isPlaying = true;
      playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      startSpectrum();
    } else {
      audio.pause();
      isPlaying = false;
      playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
      stopSpectrum();
    }
  }
  
  function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      player.querySelector('audio').play();
    }
  }
  
  function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      player.querySelector('audio').play();
    }
  }
  
  function loadTrack(index) {
    if (!playlist[index]) return;
    
    const track = playlist[index];
    const audio = player.querySelector('audio');
    const titleEl = player.querySelector('.player-title');
    const artistEl = player.querySelector('.player-artist');
    const coverEl = player.querySelector('.player-cover');
    
    audio.src = track.url;
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (coverEl && track.cover) coverEl.src = track.cover;
  }
}

function createAudioElement(player) {
  const audio = document.createElement('audio');
  audio.preload = 'metadata';
  player.appendChild(audio);
  return audio;
}

async function loadPlaylist() {
  try {
    const response = await fetch('/data/playlist.json');
    if (!response.ok) return [];
    return await response.json();
  } catch (e) {
    console.log('播放列表加载失败，使用默认列表');
    return [];
  }
}

function createSpectrumBars(container, count) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('div');
    bar.className = 'spectrum-bar';
    bar.style.height = '3px';
    container.appendChild(bar);
  }
}

function startSpectrum() {
  const player = document.querySelector('.music-player');
  const audio = player.querySelector('audio');
  const container = player.querySelector('.spectrum-container');
  
  if (!audio || !container) return;
  
  // 创建音频上下文
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // 创建分析器
  if (!analyser) {
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
  }
  
  // 连接音频源
  if (!sourceNode) {
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }
  
  const bars = container.querySelectorAll('.spectrum-bar');
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function updateSpectrum() {
    analyser.getByteFrequencyData(dataArray);
    
    const barCount = bars.length;
    const step = Math.floor(bufferLength / barCount);
    
    bars.forEach((bar, i) => {
      const index = i * step;
      const value = dataArray[index] || 0;
      // 像素化效果 - 量化高度
      const height = Math.floor(value / 25) * 5 + 3;
      bar.style.height = Math.min(height, 40) + 'px';
    });
    
    animationId = requestAnimationFrame(updateSpectrum);
  }
  
  updateSpectrum();
}

function stopSpectrum() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // 重置频谱条
  const container = document.querySelector('.spectrum-container');
  if (container) {
    const bars = container.querySelectorAll('.spectrum-bar');
    bars.forEach(bar => {
      bar.style.height = '3px';
    });
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

/* ============================================
   下载确认弹窗
   ============================================ */

let currentDownloadUrl = '';
let currentDownloadName = '';

function initDownloadModal() {
  const modal = document.querySelector('.download-modal');
  if (!modal) return;
  
  const checkbox = modal.querySelector('input[type="checkbox"]');
  const confirmBtn = modal.querySelector('.modal-btn.confirm');
  const cancelBtn = modal.querySelector('.modal-btn.cancel');
  
  // 勾选状态控制确认按钮
  if (checkbox && confirmBtn) {
    checkbox.addEventListener('change', function() {
      confirmBtn.disabled = !this.checked;
    });
  }
  
  // 取消按钮
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeDownloadModal);
  }
  
  // 确认下载
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
      if (currentDownloadUrl) {
        const link = document.createElement('a');
        link.href = currentDownloadUrl;
        link.download = currentDownloadName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeDownloadModal();
      }
    });
  }
  
  // 点击背景关闭
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeDownloadModal();
    }
  });
}

function showDownloadModal(url, filename) {
  const modal = document.querySelector('.download-modal');
  if (!modal) return;
  
  currentDownloadUrl = url;
  currentDownloadName = filename;
  
  // 重置状态
  const checkbox = modal.querySelector('input[type="checkbox"]');
  const confirmBtn = modal.querySelector('.modal-btn.confirm');
  if (checkbox) checkbox.checked = false;
  if (confirmBtn) confirmBtn.disabled = true;
  
  modal.classList.add('active');
}

function closeDownloadModal() {
  const modal = document.querySelector('.download-modal');
  if (modal) {
    modal.classList.remove('active');
    currentDownloadUrl = '';
    currentDownloadName = '';
  }
}

/* ============================================
   立绘画廊
   ============================================ */

function initIllustGallery() {
  const thumbnails = document.querySelectorAll('.illust-thumb');
  const mainImage = document.querySelector('.illust-main');
  const downloadBtn = document.querySelector('.illust-download');
  
  if (!thumbnails.length || !mainImage) return;
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // 更新活动状态
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 更新主图
      const fullSrc = this.dataset.full || this.src.replace('_thumb', '');
      mainImage.src = fullSrc;
      
      // 更新下载链接
      if (downloadBtn) {
        downloadBtn.dataset.url = fullSrc;
        downloadBtn.dataset.name = this.dataset.name || 'illustration';
      }
    });
  });
  
  // 下载按钮点击
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showDownloadModal(this.dataset.url, this.dataset.name);
    });
  }
}

/* ============================================
   清唱试听
   ============================================ */

function initVoiceSamples() {
  const samples = document.querySelectorAll('.voice-sample');
  
  samples.forEach(sample => {
    const audio = sample.querySelector('audio');
    const playBtn = sample.querySelector('.play-btn');
    const progressBar = sample.querySelector('.voice-progress');
    const progressFill = sample.querySelector('.voice-progress-fill');
    const waveformContainer = sample.querySelector('.waveform-container');
    
    if (!audio || !playBtn) return;
    
    // 创建波形条
    if (waveformContainer) {
      createWaveformBars(waveformContainer, 40);
    }
    
    playBtn.addEventListener('click', function() {
      // 暂停其他正在播放的样本
      samples.forEach(s => {
        const otherAudio = s.querySelector('audio');
        const otherBtn = s.querySelector('.play-btn');
        if (otherAudio !== audio && !otherAudio.paused) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          if (otherBtn) {
            otherBtn.innerHTML = '▶';
          }
        }
      });
      
      if (audio.paused) {
        audio.play();
        this.innerHTML = '⏸';
        if (waveformContainer) {
          animateWaveform(waveformContainer, audio);
        }
      } else {
        audio.pause();
        this.innerHTML = '▶';
      }
    });
    
    // 更新进度
    audio.addEventListener('timeupdate', function() {
      if (progressFill && audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
      }
    });
    
    // 点击进度条跳转
    if (progressBar) {
      progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
      });
    }
    
    // 播放结束
    audio.addEventListener('ended', function() {
      playBtn.innerHTML = '▶';
      if (progressFill) progressFill.style.width = '0%';
    });
  });
}

function createWaveformBars(container, count) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    // 预设静态波形高度
    const height = Math.random() * 30 + 10;
    bar.style.height = height + 'px';
    container.appendChild(bar);
  }
}

function animateWaveform(container, audio) {
  const bars = container.querySelectorAll('.waveform-bar');
  
  function update() {
    if (audio.paused) return;
    
    bars.forEach(bar => {
      // 像素化随机动画
      const height = Math.floor(Math.random() * 8) * 5 + 5;
      bar.style.height = height + 'px';
    });
    
    requestAnimationFrame(update);
  }
  
  update();
}

/* ============================================
   语言切换
   ============================================ */

function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      setLanguage(lang);
      
      // 更新按钮状态
      langBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('en')) {
    setLanguage('en');
  } else if (browserLang.startsWith('ja')) {
    setLanguage('ja');
  } else {
    setLanguage('zh-CN');
  }
}

function setLanguage(lang) {
  currentLang = lang;
  const texts = i18n[lang] || i18n['zh-CN'];
  
  // 更新带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const keys = key.split('.');
    let value = texts;
    for (const k of keys) {
      if (value[k]) {
        value = value[k];
      } else {
        return;
      }
    }
    if (typeof value === 'string') {
      el.textContent = value;
    }
  });
  
  // 保存语言偏好
  localStorage.setItem('preferredLang', lang);
}

/* ============================================
   Bilibili 数据获取
   ============================================ */

async function fetchBilibiliStats() {
  const statsContainer = document.querySelector('.bilibili-stats');
  if (!statsContainer) return;
  
  try {
    // 从配置获取用户ID
    const response = await fetch('/data/bilibili-config.json');
    if (!response.ok) return;
    
    const config = await response.json();
    
    // 由于跨域限制，这里需要使用代理或服务端请求
    // 暂时使用静态数据展示
    updateBilibiliStats(config.cachedStats || {
      videoCount: '-',
      totalViews: '-',
      lastUpdate: '数据加载中...'
    });
  } catch (e) {
    console.log('Bilibili数据获取失败');
  }
}

function updateBilibiliStats(stats) {
  const videoCountEl = document.querySelector('.stat-video-count .stat-value');
  const totalViewsEl = document.querySelector('.stat-total-views .stat-value');
  const lastUpdateEl = document.querySelector('.stat-last-update');
  
  if (videoCountEl) videoCountEl.textContent = formatNumber(stats.videoCount);
  if (totalViewsEl) totalViewsEl.textContent = formatNumber(stats.totalViews);
  if (lastUpdateEl) lastUpdateEl.textContent = stats.lastUpdate;
}

function formatNumber(num) {
  if (typeof num !== 'number') return num;
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}

/* ============================================
   工具函数
   ============================================ */

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 滚动到指定元素
function scrollToElement(selector, offset = 70) {
  const element = document.querySelector(selector);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
}
