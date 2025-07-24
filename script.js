// 최종 수정된 script.js

const checkBtn = document.getElementById("checkBtn");
const overlay = document.getElementById("overlay");
const video = document.getElementById("introVideo");
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");

/*
✅ 문제 1 해결: ENTER 클릭 시 서서히 어두워지게 하기
*/
checkBtn.addEventListener("click", function () {
  // 1. 오버레이를 화면에 표시하되, 아직은 투명한 상태로 만듭니다.
  overlay.style.display = "flex";

  // 2. 아주 잠깐(10ms)의 시간차를 두고 'show' 클래스를 추가합니다.
  //    이렇게 하면 display 속성이 먼저 적용된 후 opacity 애니메이션이 실행되어
  //    화면이 '확' 어두워지지 않고 부드럽게 어두워집니다.
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  // 기존의 초대장 화면이 서서히 사라지는 로직은 그대로 유지합니다.
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1000);

  // 2초 후 영상을 재생하는 로직도 그대로 유지합니다.
  setTimeout(() => {
    video.classList.add("show");
    video.muted = false;
    video.volume = 0.5;
    video.play();
  }, 2000);
});

video.addEventListener("ended", () => {
  // 1. 영상이 재생되던 검은색 오버레이를 서서히 투명하게 만듭니다.
  //    이 과정에서 body에 설정된 '전체배경.png'가 자연스럽게 드러납니다.
  overlay.classList.remove("show");

  // 2. 오버레이가 사라지는 동시에, 최종 콘텐츠(#mainContent)를 화면에 표시합니다.
  mainContent.classList.remove("hidden");
  mainContent.style.display = "flex";

  // 3. #mainContent가 서서히 나타나도록(fade-in) 투명도를 1로 변경합니다.
  //    #mainContent의 배경은 투명하므로, 텍스트와 다른 내용들만 보이게 됩니다.
  setTimeout(() => {
    mainContent.classList.add("is-visible");
  }, 1000);
});