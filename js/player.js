// Music Player with Pixelated Spectrum Visualization

class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.spectrumBars = 64; // Number of frequency bars
        this.animationId = null;
        this.stateKey = 'musicPlayerState';
        
        this.init();
    }
    
    async init() {
        await this.loadPlaylist();
        this.setupElements();
        this.setupEventListeners();
        this.createSpectrumBars();
        
        // Restore saved state if exists
        const savedState = this.loadState();
        if (savedState && this.playlist.length > 0) {
            this.restoreState(savedState);
        } else if (this.playlist.length > 0) {
            this.loadTrack(0);
        }
        
        // Save state before page unload
        window.addEventListener('beforeunload', () => this.saveState());
    }
    
    saveState() {
        if (!this.audio.src) return;
        
        const state = {
            currentIndex: this.currentIndex,
            currentTime: this.audio.currentTime,
            isPlaying: this.isPlaying,
            timestamp: Date.now()
        };
        sessionStorage.setItem(this.stateKey, JSON.stringify(state));
    }
    
    loadState() {
        try {
            const stateJson = sessionStorage.getItem(this.stateKey);
            if (!stateJson) return null;
            
            const state = JSON.parse(stateJson);
            // Only restore if state is less than 30 minutes old
            if (Date.now() - state.timestamp > 30 * 60 * 1000) {
                sessionStorage.removeItem(this.stateKey);
                return null;
            }
            return state;
        } catch (e) {
            return null;
        }
    }
    
    restoreState(state) {
        if (state.currentIndex >= 0 && state.currentIndex < this.playlist.length) {
            this.loadTrack(state.currentIndex);
            
            // Wait for audio metadata to load before setting time and playing
            const restorePlayback = () => {
                this.audio.currentTime = state.currentTime || 0;
                if (state.isPlaying) {
                    this.audio.play().catch(e => {
                        // Auto-play may be blocked by browser policy
                        console.log('Auto-play prevented by browser:', e?.message || e);
                    });
                }
                this.audio.removeEventListener('loadedmetadata', restorePlayback);
            };
            this.audio.addEventListener('loadedmetadata', restorePlayback);
        }
    }
    
    async loadPlaylist() {
        try {
            // Determine base path based on current page location
            const isCharacterPage = window.location.pathname.includes('/character/');
            const basePath = isCharacterPage ? '../' : '';
            const response = await fetch(basePath + 'data/playlist.json');
            const playlistData = await response.json();
            // Convert absolute paths to relative paths based on current page location
            this.playlist = playlistData.map(track => ({
                ...track,
                url: basePath + track.url.replace(/^\//, ''),
                cover: basePath + track.cover.replace(/^\//, '')
            }));
        } catch (error) {
            console.error('Failed to load playlist:', error);
            this.playlist = [];
        }
    }
    
    setupElements() {
        this.playerElement = document.getElementById('music-player');
        this.coverElement = document.getElementById('player-cover');
        this.titleElement = document.getElementById('player-title');
        this.artistElement = document.getElementById('player-artist');
        this.progressElement = document.getElementById('player-progress');
        this.currentTimeElement = document.getElementById('player-current-time');
        this.durationElement = document.getElementById('player-duration');
        this.playButton = document.getElementById('player-play');
        this.playIcon = document.getElementById('play-icon');
        this.pauseIcon = document.getElementById('pause-icon');
        this.prevButton = document.getElementById('player-prev');
        this.nextButton = document.getElementById('player-next');
        this.listButton = document.getElementById('player-list');
        this.downloadButton = document.getElementById('player-download');
        this.spectrumContainer = document.getElementById('spectrum');
        this.playlistPanel = document.getElementById('playlist-panel');
        this.playlistElement = document.getElementById('playlist');
    }
    
    setupEventListeners() {
        // Play/Pause
        this.playButton?.addEventListener('click', () => this.togglePlay());
        
        // Previous/Next
        this.prevButton?.addEventListener('click', () => this.prev());
        this.nextButton?.addEventListener('click', () => this.next());
        
        // Progress bar
        this.progressElement?.addEventListener('input', (e) => {
            const percent = e.target.value / 100;
            this.audio.currentTime = percent * this.audio.duration;
        });
        
        // Playlist toggle
        this.listButton?.addEventListener('click', () => this.togglePlaylist());
        
        // Download button
        this.downloadButton?.addEventListener('click', () => {
            if (this.playlist[this.currentIndex]) {
                window.openDownloadModal(this.playlist[this.currentIndex].url);
            }
        });
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.next());
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.startSpectrum();
        });
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.stopSpectrum();
        });
        
        // Build playlist UI
        this.buildPlaylistUI();
    }
    
    createSpectrumBars() {
        if (!this.spectrumContainer) return;
        
        this.spectrumContainer.innerHTML = '';
        for (let i = 0; i < this.spectrumBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'spectrum-bar bg-indigo-500';
            bar.style.flex = '1';
            bar.style.maxWidth = '4px';
            bar.style.marginRight = '1px';
            bar.style.height = '2px';
            bar.style.minWidth = '1px';
            this.spectrumContainer.appendChild(bar);
        }
    }
    
    initAudioContext() {
        if (this.audioContext) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.source = this.audioContext.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
        }
    }
    
    startSpectrum() {
        if (!this.audioContext) {
            this.initAudioContext();
        }
        
        if (this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.drawSpectrum();
    }
    
    stopSpectrum() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    drawSpectrum() {
        if (!this.analyser || !this.spectrumContainer) {
            this.animationId = requestAnimationFrame(() => this.drawSpectrum());
            return;
        }
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        const bars = this.spectrumContainer.children;
        const step = Math.floor(bufferLength / this.spectrumBars);
        
        // Spectrum display constants
        const SPECTRUM_MAX_HEIGHT = 28; // Max bar height to fit within container (h-10 = 40px, minus padding and visual margin)
        const SPECTRUM_MIN_HEIGHT = 2;  // Minimum bar height
        const PIXEL_STEP = 2;           // Pixelated effect step size
        const MAX_FREQUENCY_VALUE = 255;
        const HIGH_INTENSITY_THRESHOLD = 0.7;
        const MEDIUM_INTENSITY_THRESHOLD = 0.4;
        
        for (let i = 0; i < this.spectrumBars && i < bars.length; i++) {
            // Average frequency values for this bar
            let sum = 0;
            for (let j = 0; j < step; j++) {
                sum += dataArray[i * step + j];
            }
            const value = sum / step;
            const intensity = value / MAX_FREQUENCY_VALUE;
            
            // Calculate height with pixelated effect (round to PIXEL_STEP increments)
            const scaledHeight = intensity * SPECTRUM_MAX_HEIGHT;
            const pixelatedHeight = Math.round(scaledHeight / PIXEL_STEP) * PIXEL_STEP;
            const height = Math.max(SPECTRUM_MIN_HEIGHT, Math.min(SPECTRUM_MAX_HEIGHT, pixelatedHeight));
            bars[i].style.height = `${height}px`;
            
            // Color based on intensity
            if (intensity > HIGH_INTENSITY_THRESHOLD) {
                bars[i].className = 'spectrum-bar bg-red-500';
            } else if (intensity > MEDIUM_INTENSITY_THRESHOLD) {
                bars[i].className = 'spectrum-bar bg-amber-500';
            } else {
                bars[i].className = 'spectrum-bar bg-indigo-500';
            }
        }
        
        this.animationId = requestAnimationFrame(() => this.drawSpectrum());
    }
    
    loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentIndex = index;
        const track = this.playlist[index];
        
        this.audio.src = track.url;
        
        if (this.coverElement) {
            this.coverElement.src = track.cover;
        }
        if (this.titleElement) {
            this.titleElement.textContent = track.title;
        }
        if (this.artistElement) {
            this.artistElement.textContent = `${track.artist} · ${track.engine}`;
        }
        
        // Update playlist active state
        this.updatePlaylistActiveState();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(e => console.log('Playback failed:', e));
        }
    }
    
    play() {
        this.audio.play().catch(e => console.log('Playback failed:', e));
    }
    
    pause() {
        this.audio.pause();
    }
    
    prev() {
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) newIndex = this.playlist.length - 1;
        this.loadTrack(newIndex);
        if (this.isPlaying) this.play();
    }
    
    next() {
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.playlist.length) newIndex = 0;
        this.loadTrack(newIndex);
        if (this.isPlaying) this.play();
    }
    
    updatePlayButton() {
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.classList.add('hidden');
                this.pauseIcon.classList.remove('hidden');
            } else {
                this.playIcon.classList.remove('hidden');
                this.pauseIcon.classList.add('hidden');
            }
        }
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        if (this.progressElement) {
            this.progressElement.value = percent;
        }
        if (this.currentTimeElement) {
            this.currentTimeElement.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        if (this.durationElement) {
            this.durationElement.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    togglePlaylist() {
        if (this.playlistPanel) {
            this.playlistPanel.classList.toggle('hidden');
        }
    }
    
    buildPlaylistUI() {
        if (!this.playlistElement) return;
        
        this.playlistElement.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors';
            li.dataset.index = index;
            
            li.innerHTML = `
                <img src="${track.cover}" alt="${track.title}" class="w-10 h-10 rounded object-cover">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">${track.title}</p>
                    <p class="text-xs text-gray-400 truncate">${track.artist}</p>
                </div>
            `;
            
            li.addEventListener('click', () => {
                this.loadTrack(index);
                this.play();
            });
            
            this.playlistElement.appendChild(li);
        });
    }
    
    updatePlaylistActiveState() {
        if (!this.playlistElement) return;
        
        const items = this.playlistElement.children;
        for (let i = 0; i < items.length; i++) {
            if (i === this.currentIndex) {
                items[i].classList.add('bg-indigo-600/30');
            } else {
                items[i].classList.remove('bg-indigo-600/30');
            }
        }
    }
}

// Sample audio player for character pages
class SampleAudioPlayer {
    constructor(container, audioUrl) {
        this.container = container;
        this.audioUrl = audioUrl;
        this.audio = new Audio(audioUrl);
        this.isPlaying = false;
        this.audioContext = null;
        this.analyser = null;
        this.waveformData = null;
        
        this.init();
    }
    
    async init() {
        this.render();
        this.setupEventListeners();
        await this.loadWaveform();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <button class="sample-play-btn p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors">
                    <svg class="play-icon w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <svg class="pause-icon w-4 h-4 hidden" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                    </svg>
                </button>
                <div class="waveform-display flex-1 h-10 flex items-center gap-px bg-gray-900/50 rounded overflow-hidden px-1">
                    <!-- Waveform bars will be generated here -->
                </div>
                <span class="sample-time text-xs text-gray-400 w-12 text-right">0:00</span>
            </div>
        `;
        
        this.playBtn = this.container.querySelector('.sample-play-btn');
        this.playIcon = this.container.querySelector('.play-icon');
        this.pauseIcon = this.container.querySelector('.pause-icon');
        this.waveformDisplay = this.container.querySelector('.waveform-display');
        this.timeDisplay = this.container.querySelector('.sample-time');
    }
    
    setupEventListeners() {
        this.playBtn?.addEventListener('click', () => this.togglePlay());
        
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => {
            this.timeDisplay.textContent = this.formatTime(this.audio.duration);
        });
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.audio.currentTime = 0;
        });
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
        });
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
        
        // Click on waveform to seek
        this.waveformDisplay?.addEventListener('click', (e) => {
            if (!this.audio.duration) return;
            const rect = this.waveformDisplay.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        });
    }
    
    async loadWaveform() {
        // Generate pixelated waveform visualization
        const barCount = 80;
        this.waveformDisplay.innerHTML = '';
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar bg-gray-600 transition-colors';
            bar.style.flex = '0 0 2px';
            bar.style.marginRight = '1px';
            bar.style.borderRadius = '0';
            // Random height for visual placeholder (will be replaced with actual waveform data)
            const height = Math.random() * 24 + 8;
            bar.style.height = `${height}px`;
            this.waveformDisplay.appendChild(bar);
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(e => console.log('Playback failed:', e));
        }
    }
    
    updatePlayButton() {
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.classList.add('hidden');
                this.pauseIcon.classList.remove('hidden');
            } else {
                this.playIcon.classList.remove('hidden');
                this.pauseIcon.classList.add('hidden');
            }
        }
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const percent = this.audio.currentTime / this.audio.duration;
        const bars = this.waveformDisplay?.children;
        
        if (bars) {
            for (let i = 0; i < bars.length; i++) {
                const barPercent = i / bars.length;
                if (barPercent <= percent) {
                    bars[i].classList.remove('bg-gray-600');
                    bars[i].classList.add('bg-indigo-500');
                } else {
                    bars[i].classList.remove('bg-indigo-500');
                    bars[i].classList.add('bg-gray-600');
                }
            }
        }
        
        const remaining = this.audio.duration - this.audio.currentTime;
        this.timeDisplay.textContent = this.formatTime(remaining);
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize music player on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('music-player')) {
        window.musicPlayer = new MusicPlayer();
    }
});

// Export for use in character pages
window.SampleAudioPlayer = SampleAudioPlayer;
