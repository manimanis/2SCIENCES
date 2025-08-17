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