// 影片橫幅播放器 JavaScript
class VideoBanner {
    constructor() {
        // 狀態管理
        this.isPlaying = false;
        this.isHovered = false;
        this.showPlayButton = true;
        
        // YouTube 影片 ID（從原始 iframe 中提取）
        this.youtubeEmbedId = 'Jz2OveGX4UY';
        
        // DOM 元素
        if (!this.initializeElements()) {
            return; // 如果元素初始化失敗，停止初始化
        }
        
        // 事件監聽器
        this.initializeEventListeners();
        
        // 檢查自動播放設定
        this.checkAutoplay();
        
        console.log('影片橫幅播放器已初始化');
    }
    
    // 初始化 DOM 元素
    initializeElements() {
        this.videoBanner = document.getElementById('videoBanner');
        this.playButton = document.getElementById('playButton');
        this.playButtonContainer = document.querySelector('.play-button-container');
        this.contentContainer = document.querySelector('.content-container');
        this.playIcon = document.getElementById('playIcon');
        this.closeButton = document.getElementById('closeButton');
        this.thumbnailView = document.getElementById('thumbnailView');
        this.videoContainer = document.getElementById('videoContainer');
        this.youtubeIframe = document.getElementById('youtubeIframe');
        this.bottomContent = document.getElementById('bottomContent');
        this.gradientOverlays = document.getElementById('gradientOverlays');
        this.darkOverlay = document.getElementById('darkOverlay');
        
        // 檢查必要元素是否存在
        const missingElements = [];
        
        if (!this.videoBanner) missingElements.push('videoBanner');
        if (!this.playButton) missingElements.push('playButton');
        if (!this.playButtonContainer) missingElements.push('playButtonContainer');
        if (!this.contentContainer) missingElements.push('contentContainer');
        if (!this.playIcon) missingElements.push('playIcon');
        if (!this.closeButton) missingElements.push('closeButton');
        if (!this.thumbnailView) missingElements.push('thumbnailView');
        if (!this.videoContainer) missingElements.push('videoContainer');
        if (!this.youtubeIframe) missingElements.push('youtubeIframe');
        if (!this.bottomContent) missingElements.push('bottomContent');
        if (!this.gradientOverlays) missingElements.push('gradientOverlays');
        if (!this.darkOverlay) missingElements.push('darkOverlay');
        
        if (missingElements.length > 0) {
            console.error('以下 DOM 元素未找到:', missingElements.join(', '));
            console.error('影片橫幅播放器初始化失敗');
            return false;
        }
        
        console.log('所有 DOM 元素已成功找到');
        return true;
    }
    
    // 初始化事件監聽器
    initializeEventListeners() {
        // 播放按鈕點擊事件
        if (this.playButton) {
            this.playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePlayClick();
            });
        } else {
            console.warn('播放按鈕元素未找到');
        }
        
        // 關閉按鈕點擊事件
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleCloseVideo();
            });
        } else {
            console.warn('關閉按鈕元素未找到');
        }
        
        // 橫幅點擊事件
        if (this.videoBanner) {
            this.videoBanner.addEventListener('click', () => {
                this.handleBannerClick();
            });
        } else {
            console.warn('影片橫幅元素未找到');
        }
        
        // 內容容器點擊事件（暫停影片）
        if (this.contentContainer) {
            this.contentContainer.addEventListener('click', (e) => {
                // 避免點擊播放按鈕時觸發暫停
                if (e.target.closest('.play-button')) {
                    return;
                }
                
                // 避免點擊關閉按鈕時觸發暫停
                if (e.target.closest('.close-button')) {
                    return;
                }
                
                // 只有在影片播放時才能暫停
                if (this.isPlaying) {
                    console.log('點擊內容容器，暫停影片');
                    this.handleCloseVideo();
                }
            });
        } else {
            console.warn('內容容器元素未找到');
        }
        
        // 滑鼠懸停事件
        if (this.videoBanner) {
            this.videoBanner.addEventListener('mouseenter', () => {
                this.setHovered(true);
            });
            
            this.videoBanner.addEventListener('mouseleave', () => {
                this.setHovered(false);
            });
        }
        
        // 鍵盤事件（空白鍵播放/暫停）
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isTyping()) {
                e.preventDefault();
                if (this.showPlayButton) {
                    this.handlePlayClick();
                } else if (this.isPlaying) {
                    this.handleCloseVideo();
                }
            }
        });
    }
    
    // 處理播放按鈕點擊
    handlePlayClick() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.showPlayButton = false;
            this.showVideo();
        } else {
            this.showPlayButton = true;
            this.hideVideo();
        }
        
        console.log(this.isPlaying ? '播放影片' : '暫停影片');
    }
    
    // 處理關閉影片
    handleCloseVideo() {
        this.isPlaying = false;
        this.showPlayButton = true;
        this.hideVideo();
        console.log('關閉影片');
    }
    
    // 處理橫幅點擊
    handleBannerClick() {
        if (!this.showPlayButton && !this.isPlaying) {
            this.showPlayButton = true;
            this.updateUI();
        }
    }
    
    // 設置懸停狀態
    setHovered(hovered) {
        this.isHovered = hovered;
        
        if (this.showPlayButton) {
            if (hovered) {
                this.playButton.classList.add('hovered');
            } else {
                this.playButton.classList.remove('hovered');
            }
        }
    }
    
    // 顯示影片
    showVideo() {
        // 設置 YouTube iframe 的 src，啟用 API 和事件監聽
        const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeEmbedId}?autoplay=1&si=Ue29b3zi-VJsrDNc&enablejsapi=1&origin=${window.location.origin}`;
        this.youtubeIframe.src = youtubeUrl;
        
        // 隱藏縮圖視圖和相關元素
        this.thumbnailView.classList.add('hidden');
        this.bottomContent.classList.add('hidden');
        this.gradientOverlays.classList.add('hidden');
        this.playButtonContainer.classList.add('hidden');
        
        // 顯示影片容器並添加播放狀態類別
        this.videoContainer.classList.remove('hidden');
        this.videoContainer.classList.add('fade-in');
        this.videoBanner.classList.add('playing');
        
        // 設置 YouTube Player API 監聽器
        this.setupYouTubePlayerListener();
        
        console.log('顯示 YouTube 影片:', youtubeUrl);
    }
    
    // 隱藏影片
    hideVideo() {
        // 停止 YouTube 影片
        this.youtubeIframe.src = '';
        
        // 清理 YouTube 事件監聽器
        if (this.youtubeMessageHandler) {
            window.removeEventListener('message', this.youtubeMessageHandler);
            this.youtubeMessageHandler = null;
        }
        
        // 顯示縮圖視圖和相關元素
        this.thumbnailView.classList.remove('hidden');
        this.bottomContent.classList.remove('hidden');
        this.gradientOverlays.classList.remove('hidden');
        this.playButtonContainer.classList.remove('hidden');
        
        // 隱藏影片容器並移除播放狀態類別
        this.videoContainer.classList.add('hidden');
        this.videoContainer.classList.remove('fade-in');
        this.videoBanner.classList.remove('playing');
        
        this.updateUI();
    }
    
    // 檢查自動播放設定
    checkAutoplay() {
        if (!this.videoBanner) {
            console.warn('videoBanner 元素不存在，無法檢查自動播放設定');
            return;
        }
        
        // 檢查 data-autoplay 屬性
        const autoplayValue = this.videoBanner.getAttribute('data-autoplay');
        const shouldAutoplay = autoplayValue === 'true' || autoplayValue === '1';
        
        if (shouldAutoplay) {
            console.log('檢測到自動播放設定，開始播放影片');
            // 延遲一點時間確保所有元素都已載入
            setTimeout(() => {
                this.handlePlayClick();
            }, 500);
        } else {
            console.log('未設定自動播放或設定為 false');
        }
    }
    
    // 設置 YouTube Player API 監聽器
    setupYouTubePlayerListener() {
        // 監聽來自 YouTube iframe 的訊息
        const messageHandler = (event) => {
            // 確保訊息來自 YouTube
            if (event.origin !== 'https://www.youtube.com') return;
            
            try {
                const data = JSON.parse(event.data);
                
                // 監聽播放狀態變化
                if (data.event === 'video-progress' || data.event === 'onStateChange') {
                    // YouTube 播放狀態：
                    // -1: 未開始, 0: 結束, 1: 播放中, 2: 暫停, 3: 緩衝中, 5: 提示
                    if (data.info && data.info.playerState === 2) {
                        // 影片被暫停，延遲一點時間後關閉影片
                        setTimeout(() => {
                            if (this.isPlaying) {
                                console.log('YouTube 影片暫停，自動關閉影片');
                                this.handleCloseVideo();
                            }
                        }, 1000); // 1秒延遲，避免誤觸
                    } else if (data.info && data.info.playerState === 0) {
                        // 影片播放結束，自動關閉
                        console.log('YouTube 影片播放結束，自動關閉影片');
                        this.handleCloseVideo();
                    }
                }
            } catch (e) {
                // 忽略無法解析的訊息
            }
        };
        
        // 移除之前的監聽器（如果存在）
        if (this.youtubeMessageHandler) {
            window.removeEventListener('message', this.youtubeMessageHandler);
        }
        
        // 添加新的監聽器
        this.youtubeMessageHandler = messageHandler;
        window.addEventListener('message', messageHandler);
    }
    
    // 更新 UI 狀態
    updateUI() {
        // 更新播放按鈕顯示
        if (this.showPlayButton) {
            this.playButton.style.display = 'flex';
            this.darkOverlay.style.display = 'block';
        } else {
            this.playButton.style.display = 'none';
            this.darkOverlay.style.display = 'none';
        }
        
        // 更新播放圖標
        if (this.isPlaying) {
            // 暫停圖標 (兩個豎線)
            this.playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
            this.playIcon.setAttribute('class', 'lucide lucide-pause w-8 h-8 sm:w-12 sm:h-12 fill-current ml-1');
        } else {
            // 播放圖標 (三角形)
            this.playIcon.innerHTML = '<polygon points="6 3 20 12 6 21 6 3"></polygon>';
            this.playIcon.setAttribute('class', 'lucide lucide-play w-8 h-8 sm:w-12 sm:h-12 fill-current ml-1');
        }
    }
    
    // 檢查是否正在輸入
    isTyping() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true'
        );
    }
    
    // 公共方法：設置影片資訊
    setVideoInfo(title, subtitle, duration, date) {
        const titleElement = document.getElementById('videoTitle');
        const subtitleElement = document.getElementById('videoSubtitle');
        const durationElement = document.getElementById('videoDuration');
        const dateElement = document.getElementById('videoDate');
        
        if (titleElement) titleElement.textContent = title;
        if (subtitleElement) subtitleElement.textContent = subtitle;
        if (durationElement) durationElement.textContent = duration;
        if (dateElement) dateElement.textContent = date;
    }
    
    // 公共方法：設置縮圖
    setThumbnail(url) {
        const thumbnailImage = document.getElementById('thumbnailImage');
        if (thumbnailImage) {
            thumbnailImage.src = url;
        }
    }
    
    // 公共方法：設置 YouTube 影片 ID
    setYouTubeVideo(embedId) {
        this.youtubeEmbedId = embedId;
        console.log('設置 YouTube 影片 ID:', embedId);
    }
    
    // 公共方法：設置自動播放
    setAutoplay(autoplay) {
        if (this.videoBanner) {
            this.videoBanner.setAttribute('data-autoplay', autoplay ? 'true' : 'false');
            console.log('設置自動播放:', autoplay);
            
            // 如果設置為 true 且當前未播放，則立即播放
            if (autoplay && !this.isPlaying) {
                setTimeout(() => {
                    this.handlePlayClick();
                }, 100);
            }
        }
    }
    
    // 公共方法：獲取自動播放設定
    getAutoplay() {
        if (this.videoBanner) {
            const autoplayValue = this.videoBanner.getAttribute('data-autoplay');
            return autoplayValue === 'true' || autoplayValue === '1';
        }
        return false;
    }
}

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 創建影片橫幅實例
    window.videoBanner = new VideoBanner();
    
    // 可選：設置自定義配置
    // window.videoBanner.setVideoInfo('自定義標題', '自定義副標題', '15 MIN', '25/9/25');
    // window.videoBanner.setThumbnail('./custom-thumbnail.jpg');
    // window.videoBanner.setYouTubeVideo('YOUR_YOUTUBE_VIDEO_ID');
});

// 導出類別供外部使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoBanner;
}
