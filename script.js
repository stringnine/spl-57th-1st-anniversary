// script.js (전체 수정된 최종 코드)

// 모든 화면 요소들을 미리 가져옵니다.
const checkBtn = document.getElementById("checkBtn");
const overlay = document.getElementById("overlay");
const video = document.getElementById("introVideo");
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const endScreen = document.getElementById("endScreen");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");

// --- 화면 전환 함수 (재사용을 위해 만듦) ---
// 화면을 서서히 사라지게 하는 함수
function fadeOut(element) {
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.display = 'none';
  }, 1500);
}

// ✅ 수정된 fadeIn 함수
// 화면을 서서히 나타나게 하는 함수 (어떤 display 타입으로 나타낼지 지정 가능)
function fadeIn(element, displayType = 'flex') { // 기본값을 'flex'로 설정
  element.style.display = displayType;
  setTimeout(() => {
    element.style.opacity = '1';
  }, 1500);
}

// --- 이벤트 리스너 설정 ---

// 1. 첫 화면 -> 영상
checkBtn.addEventListener("click", function () {
  fadeIn(overlay); // overlay는 flex로 나타나야 함

  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  fadeOut(introScreen);

  setTimeout(() => {
    video.classList.add("show");
    video.muted = false;
    video.volume = 0.5;
    video.play();
  }, 2000);
});

// 2. 영상 -> 초대장 화면
video.addEventListener("ended", () => {
  overlay.classList.remove("show");
  fadeIn(mainContent); // mainContent는 flex로 나타나야 함
});

// ✅ 3. X 버튼 클릭: 초대장 화면 -> 첫 화면으로
rejectBtn.addEventListener('click', () => {
  fadeOut(mainContent);
  setTimeout(() => {
    // introScreen은 flex가 아닌 block으로 나타나야 레이아웃이 유지됨
    fadeIn(introScreen, 'block'); 
  }, 1500);
});

// 4. O 버튼 클릭: 초대장 화면 -> 마지막 이미지 화면으로
acceptBtn.addEventListener('click', () => {
  fadeOut(mainContent);
  setTimeout(() => {
    fadeIn(endScreen); // endScreen은 flex로 나타나야 함
  }, 1500);
});