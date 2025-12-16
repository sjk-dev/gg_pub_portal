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
  // 참여·소통
  news: {
    file: "pages/community/news-list.html",
  },
  news_detail: {
    file: "pages/community/news-detail.html",
  },
  notice: {
    file: "pages/community/notice-list.html",
  },
  notice_detail: {
    file: "pages/community/notice-detail.html",
  },
  faq: {
    file: "pages/community/faq.html",
  },
  qna_write: {
    file: "pages/community/qna-write.html",
  },
  // 마이페이지
  mypage: {
    file: "pages/mypage/main.html",
  },
  // 나의 문의내역
  qna_list: {
    file: "pages/mypage/qna/list.html",
  },
  qna_detail: {
    file: "pages/mypage/qna/detail.html",
  },
  mypage_qna_write: {
    file: "pages/mypage/qna/write.html",
  },
  // 나의 활용 갤러리
  gallery: {
    file: "pages/mypage/gallery/list.html",
  },
  gallery_detail: {
    file: "pages/mypage/gallery/detail.html",
  },
  gallery_write: {
    file: "pages/mypage/gallery/write.html",
  },
  // 나의 신청관리
  open_api: {
    file: "pages/mypage/open-api/main.html",
  },
  // 나의 정보관리
  account: {
    file: "pages/mypage/account/pw-check.html",
  },
  account_my_info: {
    file: "pages/mypage/account/my-info.html",
  },
  account_delete: {
    file: "pages/mypage/account/account-delete.html",
  },
  // 서비스안내
  // 홍보관
  promo: {
    file: "pages/service-info/promo/main.html",
  },
  // 갤러리
  // 분석갤러리
  anal_list: {
    file: "pages/service-info/gallery/anal-list.html",
  },
  anal_detail: {
    file: "pages/service-info/gallery/anal-detail.html",
  },
  // 활용갤러리
  use_list: {
    file: "pages/service-info/gallery/use-list.html",
  },
  use_detail: {
    file: "pages/service-info/gallery/use-detail.html",
  },
  use_write: {
    file: "pages/service-info/gallery/use-write.html",
  },
  use_edit: {
    file: "pages/service-info/gallery/use-edit.html",
  },
  // 데이터시각화
  visual_list: {
    file: "pages/service-info/gallery/visual-list.html",
  },
  visual_detail: {
    file: "pages/service-info/gallery/visual-detail.html",
  },
  // 관련사이트
  site: {
    file: "pages/service-info/site.html",
  },
};
