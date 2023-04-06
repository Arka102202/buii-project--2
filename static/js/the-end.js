const topBottomSelector = function (flipCard) {
  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");

  return [topHalf, bottomHalf];
};

const topBottomValueSetter = function (flipCard, value) {
  const [topHalf, bottomHalf] = topBottomSelector(flipCard);
  topHalf.textContent = bottomHalf.textContent = value;
};

const animation = function (flipCard) {
  const [topHalf, bottomHalf] = topBottomSelector(flipCard);
  const topFlip = document.createElement("div");
  const bottomFlip = document.createElement("div");
  const bottomShadow = document.createElement("div");

  topFlip.classList.add("top_flip", "top_flip_anim");
  bottomFlip.classList.add("bottom_flip", "bottom_flip_anim");
  bottomShadow.classList.add("bottom_shadow", "shadow_anim");
  let startNumber = Number(topHalf.textContent);

  topHalf.textContent =
    bottomHalf.textContent =
    topFlip.textContent =
      startNumber;

  if (
    startNumber - 1 < 0 &&
    (flipCard == flipCardSecond0 || flipCard == flipCardMinute0)
  )
    startNumber = 10;

  if (
    startNumber - 1 < 0 &&
    (flipCard == flipCardSecond1 || flipCard == flipCardMinute1)
  )
    startNumber = 6;
  bottomFlip.textContent = startNumber - 1;

  topFlip.addEventListener("animationstart", function () {
    topHalf.textContent = startNumber - 1;
  });
  topFlip.addEventListener("animationend", function () {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", function () {
    bottomHalf.textContent = startNumber - 1;
    bottomFlip.remove();
    bottomShadow.remove();
  });

  flipCard.append(topFlip, bottomFlip, bottomShadow);
};

const flipCardHour1 = document.querySelector(".flip_card--hour-1");
const flipCardHour0 = document.querySelector(".flip_card--hour-0");
const flipCardMinute1 = document.querySelector(".flip_card--minute-1");
const flipCardMinute0 = document.querySelector(".flip_card--minute-0");
const flipCardSecond1 = document.querySelector(".flip_card--second-1");
const flipCardSecond0 = document.querySelector(".flip_card--second-0");

const startCountDown = function (remTime) {
  const hour = String(Math.trunc(remTime / 3600)).padStart(2, 0);
  let hour1 = Math.trunc(hour / 10);
  let hour0 = Math.trunc(hour % 10);

  const minute = String(
    Math.trunc((remTime - Number(hour) * 3600) / 60)
  ).padStart(2, 0);
  let minute1 = Math.trunc(minute / 10);
  let minute0 = Math.trunc(minute % 10);

  const sec = String(
    remTime - Number(hour) * 3600 - Number(minute) * 60
  ).padStart(2, 0);
  let sec1 = Math.trunc(sec / 10);
  let sec0 = Math.trunc(sec % 10);

  // console.log(`${hour}:${minute}:${sec}`);

  topBottomValueSetter(flipCardHour1, hour1);
  topBottomValueSetter(flipCardHour0, hour0);
  topBottomValueSetter(flipCardMinute1, minute1);
  topBottomValueSetter(flipCardMinute0, minute0);
  topBottomValueSetter(flipCardSecond1, sec1);
  topBottomValueSetter(flipCardSecond0, sec0);

  let mCount = 0;
  let hCount = 0;

  const tickSec1 = function (flipCard) {
    animation(flipCard);
  };

  const tickSec0 = function (flipCard) {
    animation(flipCard);
    if (sec0 == 0) {
      tickSec1(flipCardSecond1);
      sec1--;
    }
    sec0--;
    if ((sec0 < 0) & (sec1 < 0) && mCount === 0) {
      tickMinute0(flipCardMinute0);
      setInterval(tickMinute0, 60000, flipCardMinute0);
      sec0 = 9;
      sec1 = 5;
      mCount++;
    }
    if (sec0 < 0) sec0 = 9;
  };
  // tickSec0(flipCardSecond0);
  const intervalSec0 = setInterval(tickSec0, 1000, flipCardSecond0);

  /// minute////////////////////////////////////////////////////////////////////

  const tickMinute1 = function (flipCard) {
    animation(flipCard);
  };

  const tickMinute0 = function (flipCard) {
    animation(flipCard);
    if (minute0 == 0) {
      tickMinute1(flipCardMinute1);
      minute1--;
    }
    minute0--;
    if ((minute0 < 0) & (minute1 < 0) && hCount === 0) {
      tickHour0(flipCardHour0);
      setInterval(tickHour0, 3600000, flipCardHour0);
      minute0 = 9;
      minute1 = 5;
      hCount++;
    }

    if (minute0 < 0) minute0 = 9;
  };

  /// hour////////////////////////////////////////////////////////////////////

  const tickHour1 = function (flipCard) {
    animation(flipCard);
  };

  const tickHour0 = function (flipCard) {
    animation(flipCard);
    if (hour0 == 0) {
      tickHour1(flipCardHour1);
      hour1--;
    }
    hour0--;

    if (hour0 < 0) hour0 = 9;
  };
};

const endingTime1 = new Date(2024, 1, 12);
let remTime = Math.trunc((endingTime1 - Date.now()) / 1000);

startCountDown(remTime);
