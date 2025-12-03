// navigate 함수
const navigate = async (pageKey) => {
  const config = pageConfig[pageKey];
  if (!config) return;

  // Sub-layout 불러오기
  await loadComponent("#container", config.file, () => {
    krds_dropEvent.init();
    krds_modal.init();
    krds_tab.init();
    krds_accordion.init();
    krds_contextualHelp.init();
  });
};
