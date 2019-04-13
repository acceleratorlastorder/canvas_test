const Utils = {
  generateRandomColor: function generateRandomColor() {

  },
  ClearCanvas: function(context, canvasElement) {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  },
  COLOR: {
    black: "rgb(0, 0, 0)"
  }
};
const DrawObject = {
  Circle: function Circle(context, x, y, radius, canvasElement) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
    this.Vx = 0;
    this.Vy = 0;
    this.fillStyle = null;
    this.canvasElement = canvasElement;
    this.diameter = this.radius * 2;
    this.createShape = function() {
      context.beginPath();
      context.lineWidth = 1;
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    };
    this.addBorder = function() {
      context.stroke();
    };
    this.setVelocity = function(x, y) {
      this.Vx = x;
      this.Vy = y;
    };
    this.defineFillStyle = function(style) {
      this.fillStyle = style || Utils.COLOR.black;
      ctx.fillStyle = this.fillStyle;
    };
    this.fillShape = function() {
      context.fill();
    };
    this.reDefineSize = function(rad) {
      this.radius = rad;
    };
    this.draw = function() {
      const collisionPos = this.isCollisionActive(this.canvasElement);
      this.manageCollision(collisionPos);
      if (this.Vx != 0 || this.Vy != 0) {
        this.assignPositionFromVelocity();
      }
      this.createShape();
      this.fillShape();
      this.addBorder();
    };
    this.assignPositionFromVelocity = function() {
      this.x += this.Vx;
      this.y += this.Vy;
    };
    this.manageCollision = function(collisionPos) {
      if (collisionPos.x != 0) {
        this.Vx = collisionPos.x != 0 ? collisionPos.x : this.Vx;
      }
      if (collisionPos.y != 0) {
        this.Vy = collisionPos.y != 0 ? collisionPos.y : this.Vy;
      }
    }
    this.isCollisionActive = function() {
      const result = {
        x: 0,
        y: 0
      };
      if ((this.x - this.radius) <= 0 || (this.x + this.radius) >= this.canvasElement.width) {
        result.x = 0 - this.Vx;
      }
      if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= this.canvasElement.height) {
        result.y = 0 - this.Vy;
      }

      return result;
    };
  }
};
const ITEMS = {};
const canvas = document.getElementById("canvas_1");
const ctx = canvas.getContext ? canvas.getContext("2d") : null;

if (!ctx) {
  console.error("Cannot use canvas here !!");
}
console.log("Context inited !!");


const circle = new DrawObject.Circle(ctx, 100, 100, 50, canvas);
circle.setVelocity(5, 5);
let size = 5;
let growingFactor = 5;
CanvasMainLoop = function() {
  Utils.ClearCanvas(ctx, canvas);
  circle.defineFillStyle("rgb(200, 0, 0)");
  circle.draw();
  if (size > 100) {
    growingFactor = -1;
  } else if (size < 5) {
    growingFactor = 1;
  }/*
  size += growingFactor;
  circle.reDefineSize(size);*/
  setTimeout(CanvasMainLoop, 60, ctx, canvas);
}
CanvasMainLoop();
