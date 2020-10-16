/**
 * Jefe al que tenemos que destruir
 * @extends Opponent
 */
class Boss extends Opponent {
  /**
   * @param game {Game} La instancia del juego al que pertenece el oponente
   */
  constructor(game) {
    const speed = BOSS_SPEED,
          myImage = BOSS_PICTURE,
          myImageDead = BOSS_PICTURE_DEAD;

    super(game, speed, myImage, myImageDead);
  }

  collide(){
    if (!this.dead) {
      console.log("Jefe muerto");
      this.game.score += 2;
      super.collide();
      setTimeout(() => {
          this.game.endGame();
      }, 2000);
  }
  }
}
