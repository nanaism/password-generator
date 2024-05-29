"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const btn = document.getElementById("btn");
  const passwordLength = document.getElementById("password-length");
  const result = document.getElementById("result");
  const numbersCheckbox = document.getElementById("numbers-checkbox");
  const symbolsCheckbox = document.getElementById("symbols-checkbox");
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!#$%&()";

  // スライダーの初期値を表示
  passwordLength.textContent = slider.value;

  // スライダーの値が変わったときの処理
  slider.addEventListener("input", () => {
    passwordLength.textContent = slider.value;
  });

  // パスワード生成ボタンのクリック処理
  btn.addEventListener("click", () => {
    let password = "";

    // 必ず数字と記号を1つずつ含める処理
    if (numbersCheckbox.checked) {
      password += getRandomChar(numbers);
    }
    if (symbolsCheckbox.checked) {
      password += getRandomChar(symbols);
    }

    // 残りの文字を生成
    let seed = letters + letters.toUpperCase();
    if (numbersCheckbox.checked) {
      seed += numbers;
    }
    if (symbolsCheckbox.checked) {
      seed += symbols;
    }

    for (let i = password.length; i < slider.value; i++) {
      password += getRandomChar(seed);
    }

    // シャッフルしてランダム性を向上
    password = shuffleString(password);

    // 結果を表示
    result.textContent = password;

    // アニメーション効果
    result.style.opacity = 0;
    setTimeout(() => {
      result.style.opacity = 1;
    }, 0);
  });

  // ランダムな文字を取得する関数
  function getRandomChar(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  // 文字列をシャッフルする関数
  function shuffleString(str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
});
