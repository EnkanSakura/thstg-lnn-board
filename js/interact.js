// 返回键
function goBack() {
  location.assign(location.href.split('/').slice(0, -1).join('/'));
}

// 悬浮窗
class Suspended {
  constructor(targetId, content) {
    this.target = document.getElementById(targetId);
    this.content = content;
    this.suspended = null;
    this.mask = null;
    this.active = false;
    this.init();
  }

  init () {
    const container = document.getElementsByClassName('container')[0];
    this.suspended = document.createElement('div');
    this.suspended.classList.add('suspended');
    this.suspended.classList.add('inactive');
    fetch(`./html/${this.content}.html`)
      .then(response => response.text())
      .then(data => {
        this.suspended.innerHTML = data;
      });

    container.appendChild(this.suspended);
    this.mask = document.createElement('div');
    this.mask.classList.add('mask');
    container.appendChild(this.mask);

    this.target.addEventListener('click', this.show.bind(this));
    this.mask.addEventListener('click', this.hide.bind(this));
  }

  show () {
    if (this.active) return;

    this.mask.classList.add('active');
    this.suspended.classList.add('active');
    this.active = true;
    this.mask.classList.remove('inactive');
    this.suspended.classList.remove('inactive');
  }

  hide () {
    if (!this.active) return;

    this.mask.classList.add('inactive');
    this.suspended.classList.add('inactive');
    this.active = false;
    this.mask.classList.remove('active');
    this.suspended.classList.remove('active');
  }
}