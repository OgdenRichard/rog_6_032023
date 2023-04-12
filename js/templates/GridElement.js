export default class GridElement {
  constructor(media) {
    this.media = media;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.buildFigcaption();
    this.localLikesCounter();
    this.buildFigure();
  }

  render = () => this.figure;

  buildFigure() {
    if (this.media.type === 'picture') {
      this.figure.appendChild(this.buildImg());
    } else if (this.media.type === 'video') {
      this.figure.appendChild(this.buildVideo());
    }
    this.figure.appendChild(this.figcaption);
  }

  buildFigcaption() {
    const title = document.createElement('p');
    const likes = document.createElement('p');
    title.textContent = this.media.title;
    title.className = 'media-title';
    likes.textContent = this.media.likes;
    likes.className = 'media-likes';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
    this.figcaption.appendChild(likes);
  }

  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.media.media);
    return img;
  }

  buildVideo() {
    const video = document.createElement('video');
    video.setAttribute('src', this.media.media);
    return video;
  }

  localLikesCounter = () => {
    let userliked = false;
    let { likes } = this.media;
    this.figcaption.addEventListener('click', () => {
      if (!userliked) {
        likes += 1;
        userliked = true;
        this.figcaption.lastChild.className = 'user-liked';
      } else {
        likes -= 1;
        userliked = false;
        this.figcaption.lastChild.className = 'media-likes';
      }
      this.figcaption.lastChild.textContent = likes;
    });
  };
}