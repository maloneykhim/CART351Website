const bubbleWand = document.querySelector('#clickBubble');
const canvas = document.querySelector('#canvas');

bubbleWand.addEventListener("click", () => {
  new Circle(bubbleWand, canvas);
});


function Circle(bubbleWand, canvas) {
  this.bubbleWand = bubbleWand;
  this.canvas = canvas;
  this.colors = ['#FAD2E1', '#FDE2E4', '#FFF1E6', '#E2ECE9', '#BEE1E6', '#DFE7FD', '#B1C5FC'];
  this.colorIndex = Math.floor(Math.random() * this.colors.length); // Initialize with a random color
  this.circle = document.createElement('div');
  this.floatDiagonal = Math.random() < 0.5;

  this.setupCircle = function() {
      // Add a CSS class to style the circle
      this.circle.classList.add('circle');

      // Get the current color from the colors array
      const currentColor = this.colors[this.colorIndex];

      // Set the circle's background color and opacity
      this.circle.style.backgroundColor = currentColor;
      this.circle.style.opacity = '0.7'; // Adjust the opacity as needed

      // Add a border to the circle
      this.circle.style.border = '2px solid #fff'; // White border with 2px width

      // Calculate random positions near the clickBubble element
      const bubbleRect = this.bubbleWand.getBoundingClientRect();
      const randomX = bubbleRect.left + Math.random() * (bubbleRect.width - 50);
      const randomY = bubbleRect.top + Math.random() * (bubbleRect.height - 50);

      // Set the initial position of the circle
      this.circle.style.left = `${randomX}px`;
      this.circle.style.top = `${randomY}px`;

      // Calculate a random size for the circle (within a reasonable range)
      const minSize = 50;
      const maxSize = minSize * 3;
      const randomSize = Math.random() * (maxSize - minSize) + minSize;
      this.circle.style.width = `${randomSize}px`;
      this.circle.style.height = `${randomSize}px`;

      // Append the circle to the canvas
      this.canvas.appendChild(this.circle);

      // Add a "mouseover" event listener to remove the circle when hovered
      this.circle.addEventListener("mouseover", () => {
          this.circle.remove();
      });

      // Start the animation for the circle
      this.animateCircle();
  };

  this.animateCircle = function() {
      const animationDuration = 3000; // Duration in milliseconds (adjust as needed)
      const initialPositionY = parseFloat(this.circle.style.top);
      const finalPositionY = -parseFloat(this.circle.style.height); // Circle will move out of the canvas
      const initialPositionX = parseFloat(this.circle.style.left);
      const finalPositionX = this.floatDiagonal
          ? initialPositionX + (Math.random() - 0.5) * 200
          : initialPositionX;

      const startTime = Date.now();

      const updateCirclePosition = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = elapsedTime / animationDuration;
          if (progress >= 1) {
              // Animation completed, remove the circle
              this.circle.remove();
          } else {
              // Update the circle's position
              const newPositionY = initialPositionY - progress * (initialPositionY - finalPositionY);
              const newPositionX = initialPositionX + progress * (finalPositionX - initialPositionX);
              this.circle.style.top = `${newPositionY}px`;
              this.circle.style.left = `${newPositionX}px`;

              // Continue the animation
              requestAnimationFrame(updateCirclePosition);
          }
      };

      // Start the animation loop
      requestAnimationFrame(updateCirclePosition);
  };

  // Initialize the circle and setup color change interval
  this.setupCircle();

  // Periodically change the circle color with a smooth transition
  setInterval(() => {
      this.changeCircleColor();
  }, Math.random() * 1000 + 1000); // Random interval between 1 and 2 seconds

  this.changeCircleColor = function() {
      const nextColorIndex = (this.colorIndex + 1) % this.colors.length;
      const currentColor = this.colors[this.colorIndex];
      const nextColor = this.colors[nextColorIndex];

      // Smoothly transition to the next color with an ease-in effect
      this.circle.style.transition = 'background-color 1s ease-in';
      this.circle.style.backgroundColor = nextColor;

      // Reset the transition after 1 second
      setTimeout(() => {
          this.circle.style.transition = 'none';
          this.colorIndex = nextColorIndex;
      }, 1000);
  };
}


