import './styles.css';

import { Ball } from './objects/Ball';
import { Paddle } from './objects/Paddle';

class PongGame {
  private speed = 20;
  private readonly elements = {
    root: document.querySelector('#root') as HTMLElement,
    canvas: document.querySelector('canvas') as HTMLCanvasElement
  };

  private readonly context = this.elements.canvas.getContext('2d') as CanvasRenderingContext2D;

  private ball: Ball;
  private paddleLeft: Paddle;
  private paddleRight: Paddle;

  constructor() {
    this.ball = this.getBallInitialState();
    this.paddleLeft = this.getPaddleInitialState('left');
    this.paddleRight = this.getPaddleInitialState('right');

    this.adjustCanvasSize();
  }

  public run = () => {
    this.adjustCanvasSize();
    this.runFrames();
  };

  public adjustCanvasSize = () => {
    this.elements.canvas.width = this.elements.root.clientWidth;
    this.elements.canvas.height = this.elements.root.clientHeight;

    this.ball = this.getBallInitialState();
    this.paddleLeft = this.getPaddleInitialState('left');
    this.paddleRight = this.getPaddleInitialState('right');
  };

  private runFrames = () => {
    this.ball.updatePosition(this.elements.canvas);
    this.paddleLeft.updatePosition(this.elements.canvas, this.ball);
    this.paddleRight.updatePosition(this.elements.canvas, this.ball);

    this.clearCanvas();
    this.ball.draw(this.context);
    this.paddleLeft.draw(this.context);
    this.paddleRight.draw(this.context);

    window.requestAnimationFrame(this.runFrames);
  };

  private getBallInitialState = () => {
    const middleOfAxisX = this.elements.canvas.width / 2;
    const middleOfAxisY = this.elements.canvas.height / 2;

    return new Ball({ x: middleOfAxisX, y: middleOfAxisY }, this.speed);
  };

  private getPaddleInitialState = (side: 'left' | 'right') => {
    const middleOfAxisY = this.elements.canvas.height / 2;
    const positionX = side === 'left' ? 0 : this.elements.canvas.width - 10;

    return new Paddle({ x: positionX, y: middleOfAxisY }, { width: 10, height: this.elements.canvas.height * 0.25 }, this.speed, 0.5);
  }

  private clearCanvas = () => {
    this.context.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
  }
};

const game = new PongGame();

window.addEventListener('resize', game.adjustCanvasSize);
window.addEventListener('load', game.run);
