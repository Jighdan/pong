import { COLORS } from "../constants";
import { Position, Size } from "../types";
import { Ball } from "./Ball";

export class Paddle {
	private position: Position;
	private size: Size;
	private velocity: number;
	private velocityCap: number;

	constructor(initialPosition: Position, size: Size, velocity: number, velocityCap = 0.75) {
		this.position = initialPosition;
		this.size = size;
		this.velocity = velocity;
		this.velocityCap = velocityCap;
	}

	public updatePosition = (canvas: HTMLCanvasElement, ball: Ball) => {
		const ballPosition = ball.getPosition();
		const halfOfCanvasWidth = canvas.width / 2;
		const paddleDistanceFromMiddle = this.position.x - halfOfCanvasWidth;
		const isBallOnTheSideOfPaddle = ballPosition.x > halfOfCanvasWidth && paddleDistanceFromMiddle > 0 || ballPosition.x < halfOfCanvasWidth && paddleDistanceFromMiddle < 0;
		const cappedVelocity = isBallOnTheSideOfPaddle ? this.velocity : this.velocity * this.velocityCap;

		const collidesWithTopWall = this.position.y + this.size.height <= 0;
		const collidesWithBottomWall = this.position.y >= canvas.height;

		const positionYWithHalvedSize = this.position.y + this.size.height / 2;
		const shouldMoveDown = ballPosition.y > positionYWithHalvedSize;
		const shouldMoveUp = ballPosition.y < positionYWithHalvedSize;

		if (shouldMoveDown && !collidesWithBottomWall) {
			this.position.y += cappedVelocity;
		};

		if (shouldMoveUp && !collidesWithTopWall) {
			this.position.y -= cappedVelocity;
		};
	};

	public draw = (context: CanvasRenderingContext2D) => {
		context.fillStyle = COLORS.white;
		context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}
}