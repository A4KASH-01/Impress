let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    paper.style.touchAction = 'none'; // Important for touch dragging

    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      const touch = e.touches[0];
      this.startX = touch.clientX - this.offsetX;
      this.startY = touch.clientY - this.offsetY;
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;
      this.offsetX = this.currentX;
      this.offsetY = this.currentY;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
