import { board, type Round } from "../model/breakout";

export function drawRound(
  context: CanvasRenderingContext2D,
  round: Round,
  active = false,
) {
  context.clearRect(0, 0, board.width, board.height);
  context.fillStyle = active ? "#c7ef79" : "#92939b";
  const sprite = ["01010", "11111", "10101", "01010"];
  for (const brick of round.bricks)
    if (brick.alive) {
      for (let y = 0; y < sprite.length; y++)
        for (let x = 0; x < sprite[y].length; x++) {
          if (sprite[y][x] === "1")
            context.fillRect(brick.x + 3 + x * 6, brick.y + y * 6, 6, 6);
        }
    }
  context.fillStyle = "#f1f1f2";
  const paddle = Math.round(round.paddle);
  context.fillRect(paddle + 2, board.paddleY, board.paddleWidth - 4, 3);
  context.fillRect(paddle, board.paddleY + 1, board.paddleWidth, 1);
  context.fillRect(
    Math.round(round.ball.x) - board.radius,
    Math.round(round.ball.y) - board.radius,
    board.radius * 2,
    board.radius * 2,
  );
}
