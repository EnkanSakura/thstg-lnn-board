// 悬浮窗
class SuspendedBox {
  constructor(targetId, content) {
    this.target = document.getElementById(targetId);
    this.content = content;
    this.suspended-box = null;
    this.mask = null;
    this.active = false;
    this.init();
  }

  init() {
    const container = document.getElementsByClassName('container')[0];
    this.suspended-box = document.createElement('div');
    this.suspended-box.classList.add('suspended-box');
    this.suspended-box.classList.add('inactive');
    fetch(`./html/${this.content}.html`)
      .then(response => response.text())
      .then(data => {
        this.suspended-box.innerHTML = data;
      });

    container.appendChild(this.suspended-box);
    this.mask = document.createElement('div');
    this.mask.classList.add('mask');
    container.appendChild(this.mask);

    this.target.addEventListener('click', this.show.bind(this));
    this.mask.addEventListener('click', this.hide.bind(this));
  }

  show() {
    if (this.active) return;

    this.mask.classList.add('active');
    this.suspended-box.classList.add('active');
    this.active = true;
    this.mask.classList.remove('inactive');
    this.suspended-box.classList.remove('inactive');
  }

  hide() {
    if (!this.active) return;

    this.mask.classList.add('inactive');
    this.suspended-box.classList.add('inactive');
    this.active = false;
    this.mask.classList.remove('active');
    this.suspended-box.classList.remove('active');
  }
}
