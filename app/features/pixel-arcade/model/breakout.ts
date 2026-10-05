export const board = {
  width: 280,
  height: 120,
  paddleWidth: 72,
  paddleY: 108,
  radius: 3,
};
export type Round = {
  paddle: number;
  ball: { x: number; y: number; vx: number; vy: number };
  bricks: { x: number; y: number; alive: boolean }[];
  score: number;
  lives: number;
  result: "playing" | "won" | "lost";
};
const clampPaddle = (x: number) =>
  Math.max(6, Math.min(board.width - board.paddleWidth - 6, x));
export function movePaddle(round: Round, center: number) {
  round.paddle = clampPaddle(center - board.paddleWidth / 2);
}
export function steerAutoplay(round: Round) {
  const target = round.bricks.find((brick) => brick.alive);
  const angle = target
    ? Math.atan2(target.x + 18 - round.ball.x, board.paddleY - target.y - 12)
    : 0;
  // Przesunięcie paletki kieruje odbicie w stronę pozostałych klocków.
  const offset =
    (Math.max(-0.85, Math.min(0.85, angle / 1.05)) * board.paddleWidth) / 2;
  movePaddle(round, round.ball.x - offset);
}
export function createRound(): Round {
  return {
    paddle: (board.width - board.paddleWidth) / 2,
    ball: { x: 140, y: 96, vx: 45, vy: -70 },
    score: 0,
    lives: 3,
    result: "playing",
    bricks: [
      [46, 10],
      [184, 10],
      [114, 44],
      [222, 64],
    ].map(([x, y]) => ({ x, y, alive: true })),
  };
}
export function advanceRound(round: Round, elapsed: number, direction = 0) {
  if (round.result !== "playing") return;
  // Krótkie kroki fizyki zapobiegają przelatywaniu piłki przez klocki.
  let remaining = Math.min(Math.max(elapsed, 0), 0.05);
  while (remaining > 0 && round.result === "playing") {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    round.paddle = clampPaddle(round.paddle + direction * 180 * dt);
    const b = round.ball,
      r = board.radius,
      oldX = b.x,
      oldY = b.y;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x < 6 + r) {
      b.x = 6 + r;
      b.vx = Math.abs(b.vx);
    }
    if (b.x > board.width - 6 - r) {
      b.x = board.width - 6 - r;
      b.vx = -Math.abs(b.vx);
    }
    if (b.y < 6 + r) {
      b.y = 6 + r;
      b.vy = Math.abs(b.vy);
    }
    if (
      b.vy > 0 &&
      oldY + r <= board.paddleY &&
      b.y + r >= board.paddleY &&
      b.x + r >= round.paddle &&
      b.x - r <= round.paddle + board.paddleWidth
    ) {
      b.y = board.paddleY - r;
      const angle =
        ((b.x - (round.paddle + board.paddleWidth / 2)) /
          (board.paddleWidth / 2)) *
        1.05;
      const speed = Math.min(150, Math.hypot(b.vx, b.vy) + 2);
      b.vx = Math.sin(angle) * speed;
      b.vy = -Math.cos(angle) * speed;
    }
    for (const brick of round.bricks) {
      if (
        !brick.alive ||
        b.x + r < brick.x ||
        b.x - r > brick.x + 36 ||
        b.y + r < brick.y ||
        b.y - r > brick.y + 24
      )
        continue;
      brick.alive = false;
      round.score += 10;
      if (oldY + r <= brick.y) {
        b.y = brick.y - r;
        b.vy = -Math.abs(b.vy);
      } else if (oldY - r >= brick.y + 24) {
        b.y = brick.y + 24 + r;
        b.vy = Math.abs(b.vy);
      } else {
        b.vx = -b.vx;
        b.x = oldX;
      }
      if (round.bricks.every((item) => !item.alive)) round.result = "won";
      break;
    }
    if (b.y - r > board.height) {
      round.lives -= 1;
      if (!round.lives) round.result = "lost";
      else
        round.ball = {
          x: round.paddle + board.paddleWidth / 2,
          y: 96,
          vx: 45,
          vy: -70,
        };
    }
  }
}
