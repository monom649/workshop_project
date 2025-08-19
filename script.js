// スクロール時のアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を観察
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// カードクリックアニメーション
function initCardClickAnimations() {
    const clickableCards = document.querySelectorAll('.clickable-card');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            // クリックエフェクト
            this.classList.add('clicked');
            
            // パルスエフェクト
            this.classList.add('pulse-animation');
            
            // 一定時間後にクラスを削除
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
            
            setTimeout(() => {
                this.classList.remove('pulse-animation');
            }, 1500);
        });
    });
}

// スムーススクロール
function initSmoothScroll() {
    // ページ内リンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCardClickAnimations();
    initSmoothScroll();
    
    // セクションにアニメーションクラスを追加
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Heroセクション以外
            section.classList.add('animate-on-scroll');
        }
    });
    
    // カードにクリック可能クラスを追加
    const cards = document.querySelectorAll('.flow-card, .comparison-card, .tool-card, .summary-item, .step-card, .vs-item, .timeline-bubble');
    cards.forEach(card => {
        card.classList.add('clickable-card');
    });
});

// スクロール時のヘッダー効果（オプション）
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // パララックス効果
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = Math.max(1 - scrolled / window.innerHeight, 0);
    }
});