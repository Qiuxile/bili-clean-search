// ==UserScript==
// @name         Bilibili - 极简搜索页
// @namespace    https://github.com/Qiuxile/bili-clean-search
// @version      1.0
// @description  屏蔽 B 站首页推荐流、分类推荐等推荐内容，把首页变成极简视频搜索页。
// @author       Surile
// @match        https://www.bilibili.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/Qiuxile/bili-clean-search/main/bili-clean-search.user.js
// @downloadURL  https://raw.githubusercontent.com/Qiuxile/bili-clean-search/main/bili-clean-search.user.js
// ==/UserScript==

(function() {
    'use strict';

    // ========== 工具：判断当前是否首页 ==========
    function isHomePage() {
        const p = location.pathname;
        return p === '/' || p === '/index.html';
    }

    // ========== 一、CSS 按需注入 ==========
    const cssText = `
        .header-channel,
        .bili-header__channel,
        .bili-feed4-layout,
        .bili-header__banner,
        .bili-skeleton,
        .feed-skeleton {
            display: none !important;
        }

        .center-search-container {
            position: fixed !important;
            top: 30% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 0 !important;
            width: 50% !important;
            max-width: 600px !important;
            min-width: 350px !important;
            border-radius: 12px !important;
            overflow: visible !important;
            background: #fff !important;
            box-shadow: none !important;
            transition: opacity 0.15s ease !important;
        }

        .menu-center, .menu-center:hover {
            box-shadow: none !important;
        }

        .search-panel {
            z-index: 1 !important;
            max-height: 400px !important;
            overflow-y: auto !important;
            box-shadow: none !important;
        }

        .right-entry, .left-entry {
            min-width: max-content !important;
        }

        .bili-header__banner,
        .bili-feed4-layout {
            content-visibility: hidden !important;
        }
    `;

    let styleElement = null;

    function applyStyle() {
        if (isHomePage()) {
            if (!styleElement) {
                styleElement = GM_addStyle(cssText);
            } else {
                styleElement.disabled = false;
            }
        } else {
            if (styleElement) {
                styleElement.disabled = true;
            }
        }
    }

    // ========== 二、DOM 清理逻辑 ==========
    const REMOVE_SELECTOR = '.bili-feed4-layout, .header-channel, .bili-header__channel, .bili-header__banner, .bili-skeleton';
    const processedVideos = new WeakSet();
    let scheduled = false;

    function cleanup() {
        scheduled = false;

        // 非首页不清理
        if (!isHomePage()) return;

        document.querySelectorAll(REMOVE_SELECTOR).forEach(el => el.remove());

        document.querySelectorAll('video').forEach(v => {
            if (processedVideos.has(v)) return;
            processedVideos.add(v);
            v.preload = 'none';
            v.autoplay = false;
            if (v.readyState > 0) {
                v.pause();
                v.removeAttribute('src');
                v.load();
            }
        });
    }

    function scheduleCleanup() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(cleanup);
    }

    // 首次执行
    applyStyle();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleCleanup);
    } else {
        scheduleCleanup();
    }

    // ========== 三、Observer：只在前 8 秒内监听（首页才需要） ==========
    const observer = new MutationObserver(() => {
        if (!isHomePage()) return;
        scheduleCleanup();
    });

    if (isHomePage()) {
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    setTimeout(() => {
        observer.disconnect();
        if (isHomePage()) {
            document.querySelectorAll(REMOVE_SELECTOR).forEach(el => el.remove());
        }
    }, 8000);

    // ========== 四、SPA 路由监听：切换页面时开关 CSS 并重新清理 ==========
    function onRouteChange() {
        applyStyle();
        scheduleCleanup();
    }

    window.addEventListener('popstate', onRouteChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
        originalPushState.apply(this, arguments);
        onRouteChange();
    };

    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        onRouteChange();
    };
})();
