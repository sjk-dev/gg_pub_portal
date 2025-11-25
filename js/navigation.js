// navigate 함수
const navigate = async (pageKey) => {
  const config = pageConfig[pageKey];
  if (!config) return;

  // Sub-layout 불러오기
  await loadComponent("#gg-content", config.file, () => {
    document.querySelectorAll(".tab-area").forEach(initTabs);
  });
};

document
  .querySelectorAll('[role="tab"]')
  .forEach((t) =>
    t.addEventListener("click", () =>
      console.log("clicked", t.id, "classes=", t.className)
    )
  );
