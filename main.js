(() => {
  let quizIndex = 0;
  let correctAns = 0;

  //   単語の追加をする
  const addWord = document.querySelector("#add-word");
  const newWord = document.querySelector("#new-word");
  const newMean = document.querySelector("#new-meaning");
  addWord.addEventListener("click", () => {
    Quiz.push({ word: newWord.value, meaning: newMean.value });
    quizMean.push(newMean.value);
    newWord.value = "";
    newMean.value = "";
  });
  //  スタートボタン
  const start = document.querySelector("#start-btn");

  start.addEventListener("click", () => {
    Modal();
    shuffle(Quiz);
    shuffle($get);
    setupQuiz();
  });

  //選択肢の取得
  const $get = Array.from(document.querySelectorAll("[data-ans]"));

  //単語を追加するモーダル
  const Modal = () => {
    const getModal = document.querySelector("#modal");
    getModal.classList.remove("is-show");
  };

  const Quiz = [
    {
      word: "popular",
      meaning: "人気がある",
    },
    {
      word: "country",
      meaning: "国",
    },
    {
      word: "grass",
      meaning: "芝生",
    },
    {
      word: "book",
      meaning: "本",
    },
    {
      word: "today",
      meaning: "今日",
    },
    {
      word: "wednesday",
      meaning: "水曜日",
    },
    {
      word: "yestarday",
      meaning: "昨日",
    },
    {
      word: "drink",
      meaning: "飲む",
    },
  ];

  // 選択肢の配列を作る
  const quizMean = [];
  for (let i = 0; i < Quiz.length; i++) {
    quizMean.push(Quiz[i].meaning);
  }

  //配列を入れ替える
  const shuffle = (arrays) => {
    for (let i = arrays.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [arrays[i], arrays[randomIndex]] = [arrays[randomIndex], arrays[i]];
    }
    return arrays;
  };

  //   選択肢の中身をからにする
  const clear = () => {
    for (i = 0; i < $get.length; i++) {
      $get[i].innerHTML = "";
    }
  };

  //   クイズの作成
  const createQuiz = () => {
    shuffle(quizMean);
    for (let i = 0; i < $get.length; i++) {
      if (
        $get[i].innerHTML !== Quiz[quizIndex].meaning &&
        quizMean[i] !== Quiz[quizIndex].meaning
      ) {
        $get[i].innerHTML = quizMean[i];
      } else if (
        $get[i].innerHTML !== Quiz[quizIndex].meaning &&
        quizMean[i] === Quiz[quizIndex].meaning
      ) {
        $get[i].innerHTML = quizMean[i + 4];
      } else {
      }
    }
  };

  const word = document.querySelector("#qword");
  const setupQuiz = () => {
    clear();
    word.innerHTML = Quiz[quizIndex].word;
    $get[Math.floor(Math.random() * $get.length)].innerHTML =
      Quiz[quizIndex].meaning;
    createQuiz();
  };

  //すべての選択肢にクリックイベントを付与
  for (i = 0; i < $get.length; i++) {
    $get[i].addEventListener("click", (els) => judge(els));
  }

  //正誤判定
  const judge = (els) => {
    els.preventDefault();
    if (els.target.innerHTML == Quiz[quizIndex].meaning) {
      alert("正解！");
      correctAns++;
    } else {
      alert("不正解！");
    }
    quizIndex++;
    if (quizIndex < Quiz.length) {
      setupQuiz();
    } else {
      alert(Quiz.length + "問中" + correctAns + "問正解です！");
    }
  };
})();
