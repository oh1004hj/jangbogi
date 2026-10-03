# 장보기 계산기 (PWA)

카드를 눌러 품목을 담고, 가격과 수량을 입력하면 합계가 자동으로 계산되는 장보기 앱입니다.
목록과 가격은 각자 휴대폰 브라우저에 저장됩니다.

## 파일 구성
- index.html — 앱 화면과 기능
- manifest.json — 앱 이름, 아이콘, 전체 화면 설정
- sw.js — 오프라인 사용
- icon-192.png, icon-512.png, apple-touch-icon.png — 앱 아이콘

## GitHub Pages 배포
1. GitHub에서 새 저장소(Public)를 만듭니다. 예: jangbogi
2. Add file → Upload files로 이 폴더의 파일을 모두 올리고 Commit 합니다.
3. Settings → Pages → Branch를 main / (root)로 선택하고 Save 합니다.
4. 1~2분 뒤 https://아이디.github.io/jangbogi/ 주소로 열립니다.

## 수정해서 다시 올릴 때
고친 파일을 같은 이름으로 다시 업로드하고, sw.js의 CACHE 버전(v1 → v2)도 올려주세요.
