/*
* author: otoniel19
* since: 11/01/2022
* at: 10:24 PM
* desc: Canvas Colision Test
*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scoreRes = document.querySelector('#score')

var player = {
    x: 50,
    y: 50
  },
  enemy = {
    x: Math.floor(Math.random() * canvas.width - 50),
    y: Math.floor(Math.random() * canvas.height - 50)
  }

function CheckEnemyPosition() {
  requestAnimationFrame(CheckEnemyPosition)
  if (enemy.x == 50 && enemy.y == 50) enemy = {
    x: Math.floor(Math.random() * canvas.width - 50),
    y: Math.floor(Math.random() * canvas.height - 50)
  }
  if (enemy.y >= 350) enemy = {
    x: Math.floor(Math.random() * canvas.width - 50),
    y: Math.floor(Math.random() * canvas.height - 50)
  }
  if (enemy.y <= 0) enemy = {
    x: Math.floor(Math.random() * canvas.width - 50),
    y: Math.floor(Math.random() * canvas.height - 50)
  }
  if (enemy.x <= 0) enemy = {
    x: Math.floor(Math.random() * canvas.width - 50),
    y: Math.floor(Math.random() * canvas.height - 50)
  }
}

CheckEnemyPosition()

var size = 50
var bg = 'lime'

const stick = new JoyStick("stick", {}, function(data) {
  if (stick.GetPosX() > 50) player.x++
  if (stick.GetPosX() < 50) player.x--
  if (stick.GetPosY() > 50) player.y++
  if (stick.GetPosY() < 50) player.y--
});

class Player {
  constructor(p) {
    this.p = p
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = bg
    ctx.fillRect(this.p.x, this.p.y, size, size)
  }
  checkWallColision() {
    //down colision
    if (this.p.y >= 350) player.y = 350
    //up colision
    if (this.p.y <= 0) player.y = 0
    //left colision
    if (this.p.x <= 0) player.x = 0
    //right colision
    if (this.p.x >= 350) player.x = 350
  }
  checkEnemyClash() {
    //colision check player with enemy
    if (player.x < enemy.x + size && player.x + size > enemy.x && player.y < enemy.y + size && player.y + size > enemy.y || player.y < enemy.y + size && player.y + size > enemy.y && player.x < enemy.x + size && player.x + size > enemy.x) {
      enemy = {
        x: Math.floor(Math.random() * canvas.width - 50),
        y: Math.floor(Math.random() * canvas.height - 50)
      }
      player = { x: 50, y: 50 }
      location.reload(1)
    }
  }
}

class Enemy {
  constructor(p) {
    this.p = p
  }
  draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.p.x, this.p.y, size, size)
  }
}

const startPlayer = new Player(player)
const startEnemy = new Enemy(enemy)

function main() {
  requestAnimationFrame(main)
  startPlayer.checkWallColision()
  startPlayer.checkEnemyClash()
  startPlayer.draw()
  startEnemy.draw()
}

main()