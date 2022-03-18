class Question {
  constructor() {
    this.index = 0;
    this.questionsElement = document.querySelector(".container");
    this.point = 0;
  }

  async getData() {
    const res = await fetch("../questions");
    let data = await res.json();
    return data;
  }

  variantSelected(e, answer) {
    if (e.innerHTML == answer) this.point++;
    console.log(this.point);
    e.classList.add("active");
    this.questionsElement.classList.add("disable");
    if (this.index < 9) {
      setTimeout(() => {
        this.update();
      }, 1000);
    } else {
      this.questionsElement.classList.add("finish");
      let finish = document.querySelector("button");
      this.questionsElement.classList.remove("disable");
      finish.addEventListener("click", (e) => {
        this.getResult();
      });
    }
  }

  getResult() {
    let messages = [
      "Graphic Design",
      "Video Editor",
      "Back End Development",
      "Front End Development",
      "3d Modelling",
      "Cyber Security",
      "SMM",
      "Game Development",
      "UI/UX",
    ];

    let message = messages[Math.floor(Math.random() * messages.length)];

    this.alert_(message + " is the best job for you.");
  }

  alert_(msg) {
    let alertElement = document.createElement("div");
    let a = document.createElement("a");
    a.href = "../index.html";
    a.textContent = "Ana Səhifə";
    alertElement.className = "alert";
    alertElement.textContent = msg;
    alertElement.appendChild(a);
    this.questionsElement.appendChild(alertElement);
  }

  update() {
    this.index++;
    this.questionsElement.classList.add("flip");
    setTimeout(() => {
      this.loadQuestions();
    }, 300);
    setTimeout(() => {
      this.questionsElement.classList.remove("flip");
    }, 300);
    this.questionsElement.classList.remove("disable");
  }

  loadQuestions() {
    this.getData()
      .then((d) => {
        let data = d[this.index],
          q;
        if (this.index == 9) {
          q = `
        <div class='question'>${data.header}</div>
        <div class='answers'>
        <div class='answer'><img src="img/${data.variants[0]}"></div>
        <div class='answer'><img src="img/${data.variants[1]}"></div>
        <div class='answer'><img src="img/${data.variants[2]}"></div>
        </div>
        <button class='finish'>Nəticə</button>`;
        } else {
          q = `
        <div class='question'>${data.header}</div>
        <div class='answers'>
        <div class='answer'>${data.variants[0]}</div>
        <div class='answer'>${data.variants[1]}</div>
        <div class='answer'>${data.variants[2]}</div>
        </div>
        <button class='finish'>Nəticə</button>
        `;
        }

        this.questionsElement.innerHTML = q;

        let answers = document.querySelectorAll(".answer");

        answers.forEach((ans) => {
          ans.setAttribute(
            "onClick",
            `question_.variantSelected(this,"${data.answer}")`
          );
        });
      })
      .catch((err) => console.error(err));
  }
}

const question_ = new Question();

question_.loadQuestions();
