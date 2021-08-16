new Vue({
  el: "#app",
  data: {
    meHeal: 100,
    monsterHeal: 100,
    logs: [],
    starter_game: true,
    aidkit: true,
    specialdamage: true,
    basic_attack_multiple: 10,
    special_attack_multiple: 15,
    heal_up_multiple: 20,
    monster_attack_multiple: 10,
    log_text: {
      player_attack: "Sizin Vurduğunuz Hasar : ",
      specialAtacl: "Vurduğunuz Kritik Hasar :",
      monsterAttack: "Canavarın Size Vurduğu Hasar :",
      firstAidKit: "Kendinizi İyileştiriniz :",
      surrender: "Savaştan Çekildiniz : ",
    },
  },

  methods: {
    startGame: function () {
      alert();
    },

    basicattack: function () {
      const mdg = Math.floor(Math.random() * this.basic_attack_multiple);
      this.monsterHeal -= mdg;

      this.add_to_logs({
        turn: "p",
        text: this.log_text.player_attack + mdg,
      });
      this.monster_attack();
    },
    monster_attack: function () {
      const dmg = Math.floor(Math.random() * this.monster_attack_multiple);
      this.meHeal -= dmg;
      this.add_to_logs({
        turn: "m",
        text: this.log_text.monsterAttack + dmg,
      });
    },

    specAttack: function () {
      const dmg = Math.floor(
        Math.random(20 - 15 + 1) + this.special_attack_multiple
      );
      this.monsterHeal -= dmg;
      this.specialdamage = !this.specialdamage;

      const mdg = Math.floor(Math.random() * 15);
      this.meHeal -= mdg;
      this.add_to_logs({
        turn: "p",
        text: this.log_text.specialAtacl + dmg,
      });
      this.add_to_logs({
        turn: "m",
        text: this.log_text.monsterAttack + mdg,
      });
      console.log(this.monsterHeal);
    },

    surrender: function () {
      this.meHeal = 0;
      this.add_to_logs({
        turn: "p",
        text: this.log_text.surrender + this.meHeal,
      });
    },

    firstHeal: function () {
      const aid = Math.floor(Math.random(20 - 1 + 1) * this.heal_up_multiple);
      this.meHeal += aid;
      this.aidkit = !this.aidkit;

      this.add_to_logs({
        turn: "p",
        text: this.log_text.firstAidKit + aid,
      });
    },
    maxHeal: function () {
      if (this.meHeal <= 99) {
        this.aidkit = !this.aidkit;
      }
    },
    add_to_logs: function (log) {
      this.logs.push(log);
    },
  },

  computed: {
    playerHP: function () {
      return {
        width: this.meHeal + "% !important",
      };
    },
    monsterHP: function () {
      return {
        width: this.monsterHeal + "%",
      };
    },
    damagebar: function () {
      if (this.meHeal <= 70) {
        return {
          backGround: yellow,
        };
      }
    },
  },
  watch: {
    meHeal: function (value) {
      if (value <= 0) {
        this.meHeal = 0;
        if (
          confirm(
            "Çılgın sharky seni canlı canlı yuttu \n Onunla tekrar savaşmak ister misin"
          )
        ) {
          this.meHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
          this.aidkit = !this.aidKit;
          this.specialdamage = !this.specialdamage;
        }
      } else if (value >= 100) {
        this.meHeal = 100;
      }
    },
    monsterHeal: function (value) {
      if (value <= 0) {
        this.meHeal = 0;
        if (
          confirm(
            "Dostum bu inanılmaz çılgın sharky'i altettin. \n Onunla tekrar savaşmak ister misin"
          )
        ) {
          this.meHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
          this.aidkit = !this.aidkit;
          this.specialdamage = !this.specialdamage;
        }
      } else if (value >= 100) {
        this.meHeal = 100;
      }
    },
  },
});
