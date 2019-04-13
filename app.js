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
  Circle: function Circle(context, x, y, z, canvasElement) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.fillStyle = null;
    this.canvasElement = canvasElement;
    this.createShape = function() {
      context.beginPath();
      context.lineWidth = 1;
      context.arc(this.x, this.y, this.z, 0, 2 * Math.PI);
    }
    this.addBorder = function() {
      context.stroke();
    }
    this.defineFillStyle = function(style) {
      this.fillStyle = style || Utils.COLOR.black;
      ctx.fillStyle = this.fillStyle;
    }
    this.fillShape = function() {
      context.fill();
    }
    this.draw = function() {
      this.isCollisionActive(this.canvasElement);
      this.createShape();
      this.fillShape();
      this.addBorder();
    }
    this.isCollisionActive = function() {
      if (x < 0 || x > this.canvasElement.width) {
        return x - this.canvasElement.width;
      }
      return null;
    }
  }
};
const ITEMS = {};
const canvas = document.getElementById("canvas_1");
const ctx = canvas.getContext ? canvas.getContext("2d") : null;

if (!ctx) {
  console.error("Cannot use canvas here !!");
}
console.log("Context inited !!");


let circle = new DrawObject.Circle(ctx, 100, 100, 90, canvas);

CanvasMainLoop = function() {
  Utils.ClearCanvas(ctx, canvas);
  circle.defineFillStyle = "rgb(200, 0, 0)"
  circle.draw();
  circle.x += 5;

  setTimeout(CanvasMainLoop, 60, ctx, canvas);
}
CanvasMainLoop();
