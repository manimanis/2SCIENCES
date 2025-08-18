function randint(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

const nine_balls = new Vue({
  el: "#nine-balls-app",
  data: {
    step: 0,
    ballWeight: 100,
    balls: [],
    lessWeightIdx: -1,
    ballsLeft: [],
    ballsRight: [],
    plateau1: 0,
    plateau2: 0
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.step = 0;
      this.balls = new Array(9).fill(0).map((item, idx) => {
        return {
          num: idx + 1,
          weight: this.ballWeight
        };
      });
      this.lessWeightIdx = randint(0, this.balls.length - 1);
      this.balls[this.lessWeightIdx].weight = this.ballWeight - 10;
      this.ballsLeft = [];
      this.ballsRight = [];
      this.plateau1 = 0;
      this.plateau2 = 0;
    },
    addBall(idx) {
      if (this.step == 0) {
        if (this.ballsLeft.length < 3) {
          this.ballsLeft.push(this.balls[idx]);
          this.balls.splice(idx, 1);
        } else if (this.ballsRight.length < 3) {
          this.ballsRight.push(this.balls[idx]);
          this.balls.splice(idx, 1);
        }
      } else if (this.step == 2) {
        if (this.ballsLeft.length < 1) {
          this.ballsLeft.push(this.balls[idx]);
          this.balls.splice(idx, 1);
        } else if (this.ballsRight.length < 1) {
          this.ballsRight.push(this.balls[idx]);
          this.balls.splice(idx, 1);
        }
      }
    },
    removeBall(arr, idx) {
      if (this.step == 0 || this.step == 2) {
        this.balls.push(arr[idx]);
        arr.splice(idx, 1);
        this.balls.sort((ba, bb) => ba.num - bb.num);
      }
    },
    nextStep() {
      if (this.step == 0) {
        this.plateau1 = this.ballsLeft.reduce((pv, cv) => pv + cv.weight, 0);
        this.plateau2 = this.ballsRight.reduce((pv, cv) => pv + cv.weight, 0);
        this.step = 1;
      } else if (this.step == 1) {
        if (this.plateau1 < this.plateau2) {
          this.balls = this.ballsLeft;
        } else if (this.plateau1 > this.plateau2) {
          this.balls = this.ballsRight;
        }
        this.ballsLeft = [];
        this.ballsRight = [];
        this.plateau1 = 0;
        this.plateau2 = 0;
        this.step = 2;
      } else if (this.step == 2) {
        this.plateau1 = this.ballsLeft.reduce((pv, cv) => pv + cv.weight, 0);
        this.plateau2 = this.ballsRight.reduce((pv, cv) => pv + cv.weight, 0);
        this.step = 3;
      }
    }
  }
});

const prob_riv = new Vue({
  el: "#probleme-riviere",
  data: {
    objets: {},
    steps: [],
    isRunning: false,
    barque: '',
    currStep: 0,
    message: '',
    failed: false
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initPosition();
      this.steps = [];
    },
    initPosition() {
      this.objets = {
        'passeur': 'rive-droite',
        'loup': 'rive-droite',
        'agneau': 'rive-droite',
        'choux': 'rive-droite'
      };
      this.isRunning = false;
      this.barque = "";
      this.currStep = 0;
      this.message = '';
      this.failed = false;
    },
    addStep(stepText) {
      this.steps.push(stepText);
      this.$forceUpdate();
    },
    removeStep(idx) {
      this.steps.splice(idx, 1);
      this.$forceUpdate();
    },
    run() {
      this.initPosition();
      this.isRunning = true;
      setTimeout(this.nextStep, 1000);
    },
    stop() {
      this.failed = this.objets["loup"] == 'rive-droite' ||
        this.objets["agneau"] == 'rive-droite' ||
        this.objets["choux"] == 'rive-droite';
      this.isRunning = false;
    },
    charger(objet) {
      if (this.barque != '') {
        this.message = "La barque n'est pas vide, décharger !";
        this.stop();
        return;
      }

      if (this.objets[objet] == this.objets['passeur']) {
        this.objets[objet] = 'barque';
        this.barque = objet;
      } else {
        this.message = "L'objet '" + objet + "' est sur l'autre rive !";
        this.stop();
      }
    },
    decharger() {
      if (this.barque != '') {
        this.objets[this.barque] = this.objets['passeur'];
        this.barque = '';
      } else {
        this.message = "Rien à décharger !";
        this.stop();
      }
    },
    passer() {
      const othRive = (this.objets['passeur'] == 'rive-droite') ? 'rive-gauche' : 'rive-droite';
      this.objets['passeur'] = othRive;

      if (this.objets['agneau'] == this.objets['choux']) {
        this.message = 'L\'agneau mange les choux. ';
        this.stop();
      }

      if (this.objets['loup'] == this.objets['agneau']) {
        this.message += 'Le loup mange l\'agneau. ';
        this.stop();
      }
      
    },
    nextStep() {
      const op = this.steps[this.currStep];
      console.log(this.currStep, '->', op);

      if (op.startsWith('Charger(')) {
        const obj = op.substring(8, op.length - 1);
        this.charger(obj);
      } else if (op == 'Passer()') {
        this.passer();
      } else if (op == 'Décharger()') {
        this.decharger();
      }

      if (this.isRunning) {
        if (this.currStep < this.steps.length - 1) {
          this.currStep++;
          setTimeout(this.nextStep, 1000);
        } else {
          this.stop();
          if (this.failed) {
            this.message = "Incomplet, déplacer tous les objets à la rive gauche !";
          }
        }
      }
      this.$forceUpdate();
    }
  }
});