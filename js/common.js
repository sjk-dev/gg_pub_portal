/* 스킵 네비게이션
==========================================================================*/
document.querySelectorAll(".skip-nav a").forEach(function (skipEle) {
  skipEle.addEventListener("focus", function () {
    skipEle.closest(".skip-nav").classList.add("on");
  });
  skipEle.addEventListener("blur", function () {
    skipEle.closest(".skip-nav").classList.remove("on");
  });
});

/* header */
/* gnb menu
==========================================================================*/
initGnbMenu = () => {
  const gnb = document.querySelector(".gnb");
  const mainButtons = gnb.querySelectorAll(".mn");
  const backdrop = document.querySelector(".gnb-backdrop");
  const html = document.documentElement;
  const body = document.body;

  // 메뉴 닫기
  function closeAll() {
    gnb
      .querySelectorAll(".w-gnb-wrap")
      .forEach((w) => w.classList.remove("is-open"));
    mainButtons.forEach((btn) => btn.classList.remove("active"));
    mainButtons.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    backdrop.classList.remove("is-active");

    // 스크롤 다시 허용
    html.style.overflow = "";
    body.style.overflow = "";
  }

  // 메뉴 클릭
  mainButtons.forEach((mn) => {
    mn.setAttribute("aria-expanded", "false");

    mn.addEventListener("click", () => {
      closeAll();

      const li = mn.closest("li");
      const wrap = li.querySelector(".w-gnb-wrap");
      const isOpen = wrap.classList.contains("is-open");

      if (!isOpen) {
        mn.classList.add("active");
        wrap.classList.add("is-open");
        mn.setAttribute("aria-expanded", "true");
        backdrop.classList.add("is-active");

        // 스크롤 막기 (메뉴 열릴 때만)
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        // 첫번째 서브메뉴 활성화
        const firstSm = wrap.querySelector(".sm");
        if (firstSm) {
          wrap
            .querySelectorAll(".sm")
            .forEach((sm) => sm.classList.remove("active"));
          firstSm.classList.add("active");
        }
      }
    });
  });

  // 서브메뉴 클릭
  gnb.querySelectorAll(".sm").forEach((sm) => {
    sm.addEventListener("click", () => {
      const wrap = sm.closest(".w-gnb-wrap");
      wrap
        .querySelectorAll(".sm")
        .forEach((sib) => sib.classList.remove("active"));
      sm.classList.add("active");
    });
  });

  // 모든 하위 메뉴 a 태그 클릭 시 메뉴 닫기
  gnb.querySelectorAll(".w-gnb-wrap a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // loadComponent() 호출 후 메뉴 닫기
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        loadComponent("#content", href, () => {
          closeAll(); // 메뉴 닫기
        });
      } else {
        closeAll();
      }
    });
  });

  // ESC & backdrop 닫기
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeAll());
  backdrop.addEventListener("click", closeAll);
};

/* header */
/* scroll
==========================================================================*/
//  스티키 헤더
let lastScrollY = 0; // 이전 스크롤 위치를 저장하는 변수
let ticking = false; // 현재 스크롤 위치와 비교하여 스크롤 방향 판단

handleScrollDirection = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const body = document.body;
      const scrollY = window.scrollY;

      if (scrollY > 150 && scrollY > lastScrollY) {
        body.classList.add("scroll");
      } else {
        body.classList.remove("scroll");
      }

      lastScrollY = scrollY; // 현재 스크롤 위치 저장
      ticking = false;
    });
    ticking = true;
  }
};

// 스크롤 이벤트 리스너 등록
window.addEventListener("scroll", handleScrollDirection);

/* header */
/* search bar
==========================================================================*/
searchBar = () => {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");
  const searchWrapper = document.getElementById("searchWrapper");

  if (input) {
    input.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        clearBtn.classList.add("show");
      } else {
        clearBtn.classList.remove("show");
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        clearBtn.classList.remove("show");
        input.focus();
      });
    }

    input.addEventListener("focus", () => {
      searchWrapper.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      searchWrapper.classList.remove("focused");
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        console.log("검색:", input.value);
        // 여기에 검색 로직을 추가 가능
      }
    });
  }
};

/* 모바일 : 전체메뉴 */
const moblnb = {
  target: {
    header: "#gg-header",
    lnbOpen: "#m-lnb-open",
    lnbWrap: ".m-lnb-wrap",
    lnbIn: ".m-lnb-wrap .m-lnb-in",
    lnbBody: ".m-lnb-wrap .m-lnb-body",
    lnbMenu: ".m-lnb-wrap .menu-wrap .mn",
    lnbMenuHori: ".m-lnb-wrap .menu-hori",
    lnbClose: ".m-lnb-wrap .ico-close",
    lnbAnchor: ".m-lnb-menu .submenu-wrap .dl",
    lnbTopScroll: ".m-lnb-wrap .m-lnb-top-scroll",
  },
  init: () => {
    const $mlnbBtn = document.querySelector(moblnb.target.lnbOpen);
    const $mlnb = document.querySelector(moblnb.target.lnbWrap);
    const $mlnbCloseBtn = $mlnb.querySelector(moblnb.target.lnbClose);
    const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);

    moblnb.anchor();
    $mlnb.setAttribute("aria-hidden", "true");
    $mlnbBtn.addEventListener("click", moblnb.open);
    $mlnbCloseBtn.addEventListener("click", moblnb.close);
    $mlnbBody.addEventListener("scroll", moblnb.anchorScroll);
  },
  open: () => {
    const $header = document.querySelector(moblnb.target.header);
    const $mlnb = document.querySelector(moblnb.target.lnbWrap);
    const $mlnbIn = document.querySelector(moblnb.target.lnbIn);

    $header.style.zIndex = "1000";
    $mlnb.setAttribute("aria-hidden", "false");
    $mlnb.classList.add("is-open");
    $mlnbIn.setAttribute("tabindex", 0);
    $mlnbIn.focus();
    document.body.classList.add("is-m-lnb");
  },
  close: () => {
    const $body = document.body;
    const $header = document.querySelector(moblnb.target.header);
    const $mlnb = document.querySelector(moblnb.target.lnbWrap);
    const $mlnbBtn = document.querySelector(moblnb.target.lnbOpen);
    const $mlnbIn = document.querySelector(moblnb.target.lnbIn);

    $mlnb.classList.remove("is-open");
    $mlnb.classList.add("is-close");
    $mlnbIn.removeAttribute("tabindex");
    $mlnb.setAttribute("aria-hidden", "true");
    $body.classList.remove("is-m-lnb");
    $mlnbBtn.focus();

    setTimeout(() => {
      $mlnb.classList.remove("is-close");
      $header.style.zIndex = "";
    }, 500);
  },
  anchormenuReset: () => {
    const $mlnbMenu = document.querySelectorAll(moblnb.target.lnbMenu);

    $mlnbMenu.forEach(($menu) => {
      $menu.classList.remove("active");
    });
  },
  anchor: () => {
    const $mlnb = document.querySelector(moblnb.target.lnbWrap);
    const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);
    const $mlnbMenus = $mlnb.querySelectorAll(moblnb.target.lnbMenu);
    const $mlnbAnchors = $mlnb.querySelectorAll(moblnb.target.lnbAnchor);

    let currentKey = null;
    try {
      const currentUrl = new URL(window.location.href);
      currentKey = currentUrl.searchParams.get("key") || null;
    } catch (error) {
      //console.error(error);
    }

    const smElements = $mlnbBody.querySelectorAll(".submenu-wrap .dl .dd .sm");
    let hasActiveSm = false;

    smElements.forEach(($sm) => {
      try {
        const smUrl = new URL($sm.href, window.location.origin);
        const smKey = smUrl.searchParams.get("key") || null;

        if (currentKey && smKey && currentKey === smKey) {
          $sm.classList.add("active");
          hasActiveSm = true;
        }
      } catch (error) {
        //console.error(error);
      }
    });

    const $mlnbAnchor99 = document.querySelector("#mlnb-anchor99");
    if ($mlnbAnchor99 && hasActiveSm) {
      const $mnMenu = document.querySelector(
        '.m-lnb-menu .menu-wrap .mn[href="#mlnb-anchor99"]'
      );
      if ($mnMenu) $mnMenu.classList.add("active");

      const $dt = $mlnbAnchor99.querySelector("dt");
      if ($dt) $dt.classList.add("active");
    }

    const $activeMenu = $mlnbBody.querySelector(
      ".submenu-wrap .dl .dd .sm.active"
    );

    if ($activeMenu) {
      const menuRect = $activeMenu.getBoundingClientRect();
      const bodyRect = $mlnbBody.getBoundingClientRect();
      const activeOffsetTop =
        menuRect.top - bodyRect.top + $mlnbBody.scrollTop - 9;

      $mlnbBody.scrollTop = activeOffsetTop;
    } else {
      $mlnbMenus[0].classList.add("active");
    }

    $mlnbAnchors.forEach(($item) => {
      const _depth4s = $item.querySelectorAll(".is-depth4");
      if (_depth4s.length > 0) {
        _depth4s.forEach(($el) => {
          $el.addEventListener("click", ($btn) => {
            const $target = $btn.target.nextElementSibling;
            const $btnPrev = $target.querySelector(".ico-prev");
            const $btnClose = $target.querySelector(".ico-close");

            $target.style.display = "block";
            setTimeout(function () {
              $target.classList.add("is-open");
            }, 0);
            $btnPrev.focus();
            $btnPrev.addEventListener("click", ($prev) => {
              depth4Close();
            });
            $btnClose.addEventListener("click", ($prev) => {
              depth4Close();
            });

            function depth4Close() {
              $target.classList.remove("is-open");
              $btn.target.focus();
              setTimeout(function () {
                $target.style.display = "";
              }, 400);
            }
          });
        });
      }
    });
  },
  anchorScroll: () => {
    const $mlnb = document.querySelector(moblnb.target.lnbWrap);
    const $mlnbIn = $mlnb.querySelector(moblnb.target.lnbIn);
    const $mlnbMenuHori = $mlnb.querySelector(moblnb.target.lnbMenuHori);
    const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);
    const $mlnbAnchors = $mlnb.querySelectorAll(moblnb.target.lnbAnchor);
    const $mlnbTopScroll = $mlnb.querySelector(moblnb.target.lnbTopScroll);
    const _scrollTop = $mlnbBody.scrollTop;
    const _scrollH = $mlnbBody.scrollHeight;
    const _bodyH = $mlnbBody.clientHeight;

    $mlnbAnchors.forEach(($item) => {
      const _id = $item.getAttribute("id");
      const $mn = $mlnb.querySelector(`[href="#${_id}"]`);
      const _offset = $item.offsetTop;
      if (_scrollTop >= _offset || _bodyH + _scrollTop >= _scrollH) {
        moblnb.anchormenuReset();
        $mn.classList.add("active");
        if ($mlnbTopScroll) {
          const $mlnbMenuHoriUl = $mlnbMenuHori.querySelector(".ul");
          const _offsetLeft = $mn.offsetLeft;
          $mlnbBody.addEventListener("scrollend", () => {
            $mlnbMenuHoriUl.scrollLeft = _offsetLeft;
          });
        }
      }
    });

    //lnb type2
    if ($mlnbTopScroll) {
      let _lastBodyScrollY = 0;
      $mlnbBody.addEventListener("scroll", (e) => {
        const _bodyScrollY = e.target.scrollTop;
        if (_bodyScrollY > 0) {
          const _mlnbMenuScrollH = $mlnbTopScroll.scrollHeight;
          $mlnbTopScroll.style.height = `${_mlnbMenuScrollH}px`;
          $mlnbTopScroll.style.transition = "ease-out .4s";
          $mlnbIn.classList.add("is-active");
        } else if (_bodyScrollY < 50 && _bodyScrollY < _lastBodyScrollY) {
          $mlnbTopScroll.style.height = "";
          $mlnbTopScroll.style.transition = "ease-out .4s .2s";
          setTimeout(() => {
            $mlnbIn.classList.remove("is-active");
          }, 600);
        }
        _lastBodyScrollY = _bodyScrollY;
      });
    }
  },
};

/* tab
==========================================================================*/
const initTabs = (container) => {
  const tabs = container.querySelectorAll('[role="tab"]');

  tabs.forEach((tab, index) => {
    // 클릭 이벤트
    tab.addEventListener("click", (e) => {
      e.stopPropagation();
      activateTab(container, tab);
    });

    // 키보드 이벤트
    tab.addEventListener("keydown", (e) => {
      let newIndex = index;

      if (e.key === "ArrowRight") {
        newIndex = (index + 1) % tabs.length;
        tabs[newIndex].focus();
      } else if (e.key === "ArrowLeft") {
        newIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[newIndex].focus();
      } else if (e.key === "Home") {
        newIndex = 0;
        tabs[newIndex].focus();
      } else if (e.key === "End") {
        newIndex = tabs.length - 1;
        tabs[newIndex].focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateTab(container, tab);
      }
    });
  });
};

// 탭 활성화 로직 분리
function activateTab(container, tab) {
  const currentTabList = tab.closest('[role="tablist"]');
  const siblingTabs = currentTabList.querySelectorAll('[role="tab"]');

  siblingTabs.forEach((t) => {
    t.setAttribute("aria-selected", "false");
    t.classList.remove("active");
  });

  const currentPanelContainer = container.querySelector(
    `[role="tabpanel"]#${tab.getAttribute("aria-controls")}`
  )?.parentElement;

  if (currentPanelContainer) {
    const siblingPanels =
      currentPanelContainer.querySelectorAll('[role="tabpanel"]');
    siblingPanels.forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove("active");
    });
  }

  // 현재 탭 활성화
  tab.setAttribute("aria-selected", "true");
  tab.classList.add("active");

  // 연결된 패널 표시
  const panelId = tab.getAttribute("aria-controls");
  const targetPanel = container.querySelector(`#${panelId}`);
  if (targetPanel) {
    targetPanel.hidden = false;
    targetPanel.classList.add("active");
  }
}

/* 공통 popup
==========================================================================*/
// 팝업열기
// 모달 열기
const openPopup = (selector, triggerBtn) => {
  const popup = document.querySelector(selector);
  if (!popup) return;

  // 스크롤바 보정
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;

  // 접근성 속성
  popup.removeAttribute("inert");
  popup.setAttribute("aria-hidden", "false");
  popup.setAttribute("aria-modal", "true");
  popup.classList.add("is-active");

  const scrollHeight = document.querySelector(".wrapper").scrollHeight;
  // popup.style.height = `${scrollHeight}px`;
  const popDialog = popup.querySelector(".modal-dialog");

  // 트리거 버튼 저장 (dataset에 id 저장)
  if (triggerBtn) {
    const btnId = triggerBtn.id || `btn-${Date.now()}`;
    triggerBtn.id = btnId;
    popup.dataset.triggerBtn = btnId;
  }

  // focus trap 시작
  initFocusTrap(popup);

  // 첫 포커스 이동
  const focusable = popup.querySelector(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  );
  focusable?.focus();

  // ESC 닫기 (중복 방지 위해 once: true)
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  };
  document.addEventListener("keydown", escHandler, { once: true });
};

// 모달 닫기
const closePopup = (popup) => {
  if (!popup) return;

  popup.setAttribute("aria-hidden", "true");
  popup.removeAttribute("aria-modal");
  popup.classList.remove("is-active");
  popup.setAttribute("inert", "");

  // body 스타일 원복
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";

  // 트리거 버튼으로 포커스 복귀
  const triggerBtnId = popup.dataset.triggerBtn;
  if (triggerBtnId) {
    document.getElementById(triggerBtnId)?.focus();
    delete popup.dataset.triggerBtn;
  }

  const modalBody = document.querySelector(".modal-body");
  if (modalBody) modalBody.scrollTop = 0;
};

// Focus Trap
const initFocusTrap = (popup) => {
  const focusableEls = popup.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  );
  if (focusableEls.length === 0) return;

  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  const trapHandler = (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  // 기존 핸들러 제거 후 새로 바인딩
  popup.removeEventListener("keydown", trapHandler);
  popup.addEventListener("keydown", trapHandler);
};

// 이벤트 위임
document.addEventListener("click", (e) => {
  // 열기 버튼
  const openBtn = e.target.closest(".btn-open");
  if (openBtn) {
    const target = openBtn.getAttribute("data-popup");
    openPopup(target, openBtn);
  }

  // 닫기 버튼 close-modal
  const closeBtn = e.target.closest(".btn-close");
  if (closeBtn) {
    const popup = closeBtn.closest(".gg-modal-alert");
    closePopup(popup);
  }
  const confirmBtn = e.target.closest(".close-modal");
  if (confirmBtn) {
    const popup = confirmBtn.closest(".gg-modal-alert");
    closePopup(popup);
  }
});

/* 공통 모바일 bottom sheet
==========================================================================*/
const modal = document.querySelector(".m-bottom-sheet");
const dialog = modal?.querySelector(".modal-dialog");
const closeBtn = document?.querySelector(".close-modal");

// 열기
function openBottomSheet() {
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("is-active"); // 아래 -> 위로 올라오기
  });
}

// 닫기
function closeBottomSheet() {
  modal.classList.remove("is-active"); // 위 -> 아래로 내려가기

  // transition 끝나면 display:none
  dialog.addEventListener("transitionend", function handler() {
    modal.style.display = "none";
    dialog.removeEventListener("transitionend", handler);
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeBottomSheet);

/* footer */
/* 레이어 팝업 스크립트
==========================================================================*/
class LayerPopup {
  constructor(selector) {
    this.el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    if (!this.el) throw new Error("Popup element not found");

    this.el.setAttribute("role", "dialog");
    this.el.setAttribute("aria-modal", "true");
    this.el.querySelector(".btn-close").addEventListener("click", () => {
      this.close();
    });
    this._onKeydown = (e) => {
      if (e.key === "Escape") this.close();
    };
  }

  open = () => {
    this.el.classList.add("lp-open");
    document.addEventListener("keydown", this._onKeydown);
  };

  close = () => {
    this.el.classList.remove("lp-open");
    document.removeEventListener("keydown", this._onKeydown);
  };
}

// 전역 이벤트 바인딩 (overlay 없이)
(() => {
  const instances = new Map();

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-popup-open]");
    const closeBtn = e.target.closest("[data-popup-close]");

    if (openBtn) {
      e.preventDefault();
      const target = openBtn.getAttribute("data-popup-open");
      const popup = document.querySelector(target);
      if (!popup) return;

      let inst = instances.get(popup);
      if (!inst) {
        inst = new LayerPopup(popup);
        instances.set(popup, inst);
      }
      inst.open();
    }

    if (closeBtn) {
      e.preventDefault();
      const popup = closeBtn.closest(".layer-popup");
      if (!popup) return;
      const inst = instances.get(popup);
      if (inst) inst.close();
    }
  });
})();

// ------------------------
// 객체 리터럴

const common = {
  init() {
    // this.popup.init();
    this.dropdown.init();
  },

  // popup: {},

  dropdown: {
    init(selector = ".drop-wrap") {
      const $dropdowns = document.querySelectorAll(selector);
      if (!$dropdowns.length) return;

      $dropdowns.forEach(($wrap) => {
        const $btn = $wrap.querySelector(".drop-btn");
        const $menu = $wrap.querySelector(".drop-menu");
        let $sr = $wrap.querySelector(".sr-only");

        if (!$btn || !$menu) return;

        // 버튼 클릭 시 토글
        $btn.addEventListener("click", (e) => {
          e.preventDefault();
          const isOpen = $wrap.classList.contains("is-open");

          this.closeAll(); // 다른 드롭다운 닫기

          if (!isOpen) {
            $wrap.classList.add("is-open");
            $sr.textContent = "닫기";
          } else {
            $wrap.classList.remove("is-open");
            $sr.textContent = "열기";
          }
        });
      });

      // 외부 클릭 시 닫기
      document.addEventListener("click", (e) => {
        if (!e.target.closest(selector)) this.closeAll();
      });
    },

    closeAll() {
      document.querySelectorAll(".drop-wrap.is-open").forEach(($el) => {
        $el.classList.remove("is-open");
        const $btn = $el.querySelector(".drop-btn");
        const $sr = $btn.querySelector(".sr-only");
        if ($sr) $sr.textContent = "열기";
      });
    },
  },
};

// 페이지 로딩 후 실행
document.addEventListener("DOMContentLoaded", async () => {
  await common.init();
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#header", "components/header.html", () => {
    initGnbMenu();
    searchBar();
    window.addEventListener("scroll", handleScrollDirection);

    common.init();

    setTimeout(() => {
      moblnb.init(); // DOM 렌더링 후 실행
    }, 0);
  });
  await loadComponent("#footer", "components/footer.html");
  // footer 관련 팝업 전용 인스턴스
  new LayerPopup("#layerRelatedChannel");
});
