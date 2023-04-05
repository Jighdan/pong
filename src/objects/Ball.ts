import { Position } from "../types";
import { COLORS } from "../constants";

export class Ball {
	private readonly radius = 30;
	private position: Position;
	private velocity: Position;

	constructor(initialPosition: Position, initialVelocity: number) {
		this.position = initialPosition
		this.velocity = { x: initialVelocity, y: initialVelocity };
	}

	public updatePosition = (canvas: HTMLCanvasElement) => {
		const collidesWithRightWall = this.position.x + this.radius >= canvas.width;
		const collidesWithLeftWall = this.position.x - this.radius <= 0;
		const collidesWithTopWall = this.position.y - this.radius <= 0;
		const collidesWithBottomWall = this.position.y + this.radius >= canvas.height;

		if (collidesWithRightWall || collidesWithLeftWall) {
			this.velocity.x *= -1;
		}

		if (collidesWithTopWall || collidesWithBottomWall) {
			this.velocity.y *= -1;
		}

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	public getPosition = () => this.position;

	public getRadius = () => this.radius;

	public draw = (context: CanvasRenderingContext2D) => {
		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = COLORS.white;
		context.fill();
		context.closePath();
	}
}