/* ============================================================
   송윤화 반응형 웹 포트폴리오 — 동작
   쪽번호는 포트폴리오_송윤화.pdf(28쪽) 기준
   ============================================================ */
'use strict';

/* 작업 목록 --------------------------------------------------- */
var WORKS = [
  {
    cat : 'UX/UI DESIGN',
    name: 'SDA 삼육어학원 홈페이지 리디자인',
    desc: '콘텐츠 중심의 홈페이지로, SDA 학원만의 장점과 특징을 중점적으로 설명하는 사이트로 제작했습니다.',
    meta: ['1인 작업 · 2024', 'Pretendard / Roboto'],
    thumb: 3,
    pages: [3,4,5,6,7,8,9]
  },
  {
    cat : 'EXHIBITION DESIGN',
    name: '전시회 디자인',
    desc: '카달로그, X배너, 전단지, 보드사인까지 전시 현장에 필요한 인쇄물을 하나의 톤으로 묶었습니다.',
    meta: ['카달로그 · X배너', '전단지 · 보드사인'],
    thumb: 10,
    pages: [10,11,12,13,14]
  },
  {
    cat : 'WEB CONTENTS',
    name: '웹 콘텐츠 디자인',
    desc: '뉴스레터와 웹배너부터 홈페이지형 블로그, 유튜브 채널아트, 제안서까지 온라인 접점을 두루 맡았습니다.',
    meta: ['뉴스레터 · 배너', '블로그 · 유튜브 · 제안서'],
    thumb: 15,
    pages: [15,16,17,18,19,20]
  },
  {
    cat : 'BRANDING',
    name: 'The Bee — 과학놀이터 브랜딩',
    desc: '캐릭터 로고에서 출발해 전단지, 스티커, 굿즈, 명함까지 한 벌로 이어지는 브랜드를 만들었습니다.',
    meta: ['전단지 · 스티커 · 굿즈', '명함'],
    thumb: 21,
    pages: [21,22,23,24]
  },
  {
    cat : 'PACKAGE DESIGN',
    name: '패키지 디자인',
    desc: '약품과 자재 패키지를 제품 성격에 맞춰 정보 전달과 매대 주목도를 함께 잡았습니다.',
    meta: ['약품 패키지', '자재 패키지'],
    thumb: 25,
    pages: [25,26,27]
  }
];

var pad = function (n) { return (n < 10 ? '0' : '') + n; };
var big = function (n) { return 'images/p' + pad(n) + '.jpg'; };
var small = function (n) { return 'images/thumb/p' + pad(n) + '.jpg'; };

/* 1. 작업 카드 만들기 ----------------------------------------- */
(function buildWorks() {
  var list = document.getElementById('works-list');
  if (!list) { return; }

  WORKS.forEach(function (w, i) {
    var li = document.createElement('li');
    li.className = 'up';
    li.style.transitionDelay = (i % 3) * 0.08 + 's';

    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'work';
    card.setAttribute('data-index', i);
    card.setAttribute('aria-label', w.name + ' 크게 보기');
    card.innerHTML =
      '<div class="work__thumb">' +
        '<img src="' + small(w.thumb) + '" alt="' + w.name + '" loading="lazy" decoding="async">' +
        '<span class="work__more">' + w.pages.length + '장 모두 보기 →</span>' +
      '</div>' +
      '<div class="work__body">' +
        '<p class="work__cat">' + w.cat + '</p>' +
        '<h3 class="work__name">' + w.name + '</h3>' +
        '<p class="work__desc">' + w.desc + '</p>' +
        '<div class="work__meta"><span>' + w.meta[0] + '</span><span>' + w.meta[1] + '</span></div>' +
      '</div>';

    card.addEventListener('click', function () { openViewer(i); });
    li.appendChild(card);
    list.appendChild(li);
  });
})();

/* 2. 크게 보기 ------------------------------------------------- */
var viewer   = document.getElementById('viewer');
var vImg     = document.getElementById('viewer-img');
var vTitle   = document.getElementById('viewer-title');
var vCount   = document.getElementById('viewer-count');
var vPrev    = document.getElementById('viewer-prev');
var vNext    = document.getElementById('viewer-next');
var vClose   = document.getElementById('viewer-close');
var nowWork  = 0;
var nowPage  = 0;
var lastFocus = null;

function drawPage() {
  var w = WORKS[nowWork];
  var p = w.pages[nowPage];
  vImg.src = big(p);
  vImg.alt = w.name + ' ' + (nowPage + 1) + '번째 장';
  vTitle.textContent = w.name;
  vCount.textContent = (nowPage + 1) + ' / ' + w.pages.length;
  vPrev.disabled = (nowPage === 0);
  vNext.disabled = (nowPage === w.pages.length - 1);

  // 다음 장을 미리 받아 둔다
  if (nowPage + 1 < w.pages.length) {
    var pre = new Image();
    pre.src = big(w.pages[nowPage + 1]);
  }
}

function openViewer(i) {
  lastFocus = document.activeElement;
  nowWork = i;
  nowPage = 0;
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  drawPage();
  vClose.focus();
}

function closeViewer() {
  viewer.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) { lastFocus.focus(); }
}

function move(step) {
  var last = WORKS[nowWork].pages.length - 1;
  var next = nowPage + step;
  if (next < 0 || next > last) { return; }
  nowPage = next;
  drawPage();
}

vPrev.addEventListener('click', function () { move(-1); });
vNext.addEventListener('click', function () { move(1); });
vClose.addEventListener('click', closeViewer);
viewer.addEventListener('click', function (e) {
  if (e.target === viewer || e.target.id === 'viewer-stage') { closeViewer(); }
});

document.addEventListener('keydown', function (e) {
  if (viewer.hidden) { return; }
  if (e.key === 'Escape')     { closeViewer(); }
  if (e.key === 'ArrowLeft')  { move(-1); }
  if (e.key === 'ArrowRight') { move(1); }
});

/* 손가락으로 넘기기 */
(function swipe() {
  var x0 = null;
  var stage = document.getElementById('viewer-stage');
  stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (x0 === null) { return; }
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 55) { move(dx < 0 ? 1 : -1); }
    x0 = null;
  }, { passive: true });
})();

/* 3. 헤더 · 메뉴 · 진행 막대 ---------------------------------- */
var head     = document.getElementById('head');
var burger   = document.getElementById('burger');
var gnb      = document.getElementById('gnb');
var progress = document.getElementById('progress');
var totop    = document.getElementById('totop');

burger.addEventListener('click', function () {
  var open = gnb.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});

gnb.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    gnb.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

function onScroll() {
  var y = window.scrollY;
  head.classList.toggle('is-solid', y > 12);
  totop.classList.toggle('is-on', y > 500);

  var max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

totop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* 4. 지금 보는 곳 메뉴에 표시 --------------------------------- */
(function spy() {
  var links = {};
  gnb.querySelectorAll('a[href^="#"]').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var secs = Object.keys(links)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!secs.length) { return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) { return; }
      Object.keys(links).forEach(function (id) { links[id].classList.remove('is-on'); });
      var on = links[en.target.id];
      if (on) { on.classList.add('is-on'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secs.forEach(function (s) { io.observe(s); });
})();

/* 5. 스크롤하면 나타나기 -------------------------------------- */
(function reveal() {
  var targets = document.querySelectorAll('.sec__num, .sec__title, .sec__lead, .about__row, .contact__box, .up');
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) { return; }
      en.target.classList.add('is-in');
      obs.unobserve(en.target);
    });
  }, { threshold: 0.12 });

  targets.forEach(function (t) {
    t.classList.add('up');
    io.observe(t);
  });
})();
