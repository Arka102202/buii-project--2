"use strict";
// https://youtu.be/1VKqtr2dxnQ
let audio = document.querySelector("audio");

audio.play();

window.addEventListener("keypress", function (e) {
  e.preventDefault();
  console.log(audio.currentTime);
  if (e.key === " ") {
    if (!audio.paused) audio.pause();
    else audio.play();
  }
});

const layer1 = document.querySelector(".layer_1");
const layer1Container = document.querySelector(".layer_1-container");
const layer2 = document.querySelector(".layer_2");

const body = document.querySelector("body");

const height = parseInt(window.getComputedStyle(body).height);

window.addEventListener("scroll", function () {
  const amount = (height - this.window.scrollY) / height;
  layer1Container.style.opacity = String(amount);
  layer2.style.opacity = String(1 - amount);
});

///////////////////////////////////////////////////

const colorArr = [
  "#e5c58c",
  "#5e6e3f",
  "#a22223",
  "#a03e23",
  "#0076ab",
  "#2f2f2f",
  "#6f2500",
  "#174264",
  "#ffa101",
  "#ff303d",
];

const layer2SubContainer = document.querySelectorAll(".layer_2_sub_container");

const initialShift = -50;

layer2SubContainer.forEach((card, i) => {
  if (i !== 0) card.classList.add("card_right_transform");

  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.dataset.posNo = String(i);
  if (i == 0) dot.classList.add("dot-active");
  document.querySelector(".dots").append(dot);
});

let currentPosition = 0;
const layer2dots = document.querySelectorAll(".dot");
const root = document.querySelector("html");

layer2.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("dot") &&
    !e.target.classList.contains("btn")
  )
    return;
  const dot = e.target;
  if (e.target.dataset.posNo) currentPosition = Number(e.target.dataset.posNo);
  else {
    if (
      e.target.classList.contains("left_btn") ||
      e.target.classList.contains("left_img")
    ) {
      if (currentPosition == 0) currentPosition = layer2SubContainer.length - 1;
      else currentPosition--;
    } else {
      if (currentPosition == layer2SubContainer.length - 1) currentPosition = 0;
      else currentPosition++;
    }
  }

  layer2SubContainer.forEach((card, i) => {
    if (i === currentPosition)
      card.classList.remove("card_right_transform", "card_left_transform");
    else if (i < currentPosition) {
      card.classList.add("card_left_transform");
      card.classList.remove("card_right_transform");
    } else {
      card.classList.remove("card_left_transform");
      card.classList.add("card_right_transform");
    }

    if (i === currentPosition) layer2dots[i].classList.add("dot-active");
    else layer2dots[i].classList.remove("dot-active");

    root.style.setProperty("--layer_2-bg-color", colorArr[currentPosition]);
  });
});

const buiiImgs = document.querySelectorAll(".buii_img");
const monerKathaBgs = document.querySelectorAll(".moner_katha_bg");
const monerKathas = document.querySelectorAll(".moner_katha");
const imgKathas = document.querySelectorAll(".buii_img_katha");

let width;
const widths = [];

const interval = setInterval(function () {
  monerKathas.forEach((katha, i) => {
    width = parseFloat(getComputedStyle(buiiImgs[i]).getPropertyValue("width"));
    widths[i] = width;
    monerKathaBgs[i].style.width =
      imgKathas[i].style.width =
      katha.style.width =
        `${width}px`;
    katha.addEventListener("mouseover", function () {
      monerKathaBgs[i].classList.remove("moner_katha-translate");
    });
  });
  if (widths.every((e) => e !== 0)) clearInterval(interval);
}, 100);

monerKathas.forEach((katha, i) =>
  katha.addEventListener("mouseout", function () {
    monerKathaBgs[i].classList.add("moner_katha-translate");
  })
);
