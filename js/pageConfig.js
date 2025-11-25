const pageConfig = {
  home: {
    title: "Home",
    breadcrumb: null,
    file: "index.html",
  },
  test: {
    title: "test",
    breadcrumb: [{ label: "홈", page: "home" }, { label: "테스트" }],
    layout: "sub-layout.html",
    file: "pages/test.html",
  },
  test2: {
    title: "test2",
    breadcrumb: [{ label: "홈", page: "home" }, { label: "테스트" }],
    layout: "sub-layout.html",
    file: "pages/test2.html",
  },
  dataset: {
    layout: "sub-layout.html",
    file: "pages/open-data/data/dataset.html",
  },
  multimediaData: {
    layout: "sub-layout.html",
    file: "pages/open-data/data/multimedia_data.html",
  },
  // 회원
  // - 회원가입
  join: {
    layout: "sub-layout.html",
    file: "pages/member/join/main.html",
  },
  join_terms: {
    file: "pages/member/join/terms.html",
  },
  join_form: {
    file: "pages/member/join/form.html",
  },
  join_complete: {
    file: "pages/member/join/complete.html",
  },
  join_child_terms: {
    file: "pages/member/join/child-terms.html",
  },
  join_child_guardian_form: {
    file: "pages/member/join/child-guardian-form.html",
  },
  join_child_form: {
    file: "pages/member/join/child-form.html",
  },
  join_child_complete: {
    file: "pages/member/join/child-complete.html",
  },
  // - 회원전환
  convert_intro: {
    file: "pages/member/convert/intro.html",
  },
  convert: {
    file: "pages/member/convert/main.html",
  },
  convert_terms: {
    file: "pages/member/convert/terms.html",
  },
  convert_form: {
    file: "pages/member/convert/form.html",
  },
  convert_complete: {
    file: "pages/member/convert/complete.html",
  },
  convert_child_terms: {
    file: "pages/member/convert/child-terms.html",
  },
  convert_child_guardian_form: {
    file: "pages/member/convert/child-guardian-form.html",
  },
  convert_child_form: {
    file: "pages/member/convert/child-form.html",
  },
  convert_child_complete: {
    file: "pages/member/convert/child-complete.html",
  },
  // - 로그인
  login: {
    file: "pages/member/login.html",
  },
  find_id: {
    file: "pages/member/find-id.html",
  },
  find_pw: {
    file: "pages/member/find-pw.html",
  },
  // 참여소통
  // 새소식
  news: {
    file: "pages/community/news-list.html",
  },
  news_detail: {
    file: "pages/community/news-detail.html",
  },
  faq: {
    file: "pages/community/faq.html",
  },
  qna_write: {
    file: "pages/community/qna-write.html",
  },
};
