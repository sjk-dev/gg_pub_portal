const loadComponent = async (selector, file, callback) => {
  const el = document.querySelector(selector);
  if (!el) {
    console.error(`${selector} 요소를 찾을 수 없습니다.`);
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`${file} 로드 실패: ${response.status}`);
    const html = await response.text();
    el.innerHTML = html;

    // 렌더 완료 후 콜백 실행 (sticky, transition 등 안정적 작동)
    requestAnimationFrame(() => {
      if (typeof callback === "function") callback();
    });
  } catch (error) {
    console.error(error);
  }
};
