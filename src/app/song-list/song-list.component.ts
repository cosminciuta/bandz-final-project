import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  public songs: Song[] = [];
  public currentSongAudio: HTMLAudioElement | undefined = undefined;
  public currentSongId: number = 0;
  public currentTime: number = 0;
  public isSongPlayed: boolean = false;

  constructor() {}

  ngOnInit(): void {
    type MyArrayType = Array<Song>;
    const songsData: MyArrayType = [
      {
        id: 1,
        artist: 'Leonell Cassio',
        title: 'Chapter Two ft Carrie',
        duration: 240,
        album: 'Ghost Stories',
        cover: '/assets/img/albums/ghost-stories.jpeg',
        path: '/assets/music/leonell-cassio-chapter-two-ft-carrie-114909.mp3',
        images: [
          '/assets/details/images1/image1.jpeg',
          '/assets/details/images1/image2.jpeg',
          '/assets/details/images1/image3.jpeg',
          '/assets/details/images1/image4.jpeg',
          '/assets/details/images1/image5.jpeg',
          '/assets/details/images1/image6.jpeg',
        ],
      },
      {
        id: 2,
        artist: 'Lofi',
        title: 'Study',
        duration: 147,
        album: 'Heroes',
        cover: '/assets/img/albums/heroes.png',
        path: '/assets/music/lofi-study-112191.mp3',
        images: [
          '/assets/details/images2/image1.jpeg',
          '/assets/details/images2/image2.jpeg',
          '/assets/details/images2/image3.jpeg',
          '/assets/details/images2/image4.jpeg',
          '/assets/details/images2/image5.jpeg',
          '/assets/details/images2/image6.jpeg',
        ],
      },
      {
        id: 3,
        artist: 'Stomping Rock',
        title: 'Four Shots',
        duration: 119,
        album: 'We Used To Be Friends',
        cover: '/assets/img/albums/dandy.jpeg',
        path: '/assets/music/stomping-rock-four-shots-111444.mp3',
        images: [
          '/assets/details/images3/image1.jpeg',
          '/assets/details/images3/image2.jpeg',
          '/assets/details/images3/image3.jpeg',
          '/assets/details/images3/image4.jpeg',
          '/assets/details/images3/image5.jpeg',
          '/assets/details/images3/image6.jpeg',
        ],
      },
      {
        id: 4,
        artist: 'Inspiring Emotional',
        title: 'Uplifting Piano',
        duration: 159,
        album: 'Settle',
        cover: '/assets/img/albums/disclosure.jpeg',
        path: '/assets/music/inspiring-emotional-uplifting-piano-112623.mp3',
        images: [
          '/assets/details/images4/image1.jpeg',
          '/assets/details/images4/image2.jpeg',
          '/assets/details/images4/image3.jpeg',
          '/assets/details/images4/image4.jpeg',
          '/assets/details/images4/image5.jpeg',
          '/assets/details/images4/image6.jpeg',
        ],
      },
      {
        id: 5,
        artist: 'Winning Elevation',
        title: 'Elevation',
        duration: 122,
        album: 'The Lost',
        cover: '/assets/img/albums/elektrik.jpeg',
        path: '/assets/music/winning-elevation-111355.mp3',
        images: [
          '/assets/details/images5/image1.jpeg',
          '/assets/details/images5/image2.jpeg',
          '/assets/details/images5/image3.jpeg',
          '/assets/details/images5/image4.jpeg',
          '/assets/details/images5/image5.jpeg',
          '/assets/details/images5/image6.jpeg',
        ],
      },
    ];

    if (songsData) {
      this.songs = songsData;
      localStorage.setItem('songs', JSON.stringify(songsData));
    }
  }

  playSong(song: Song) {
    if (song.id === this.currentSongId) {
      this.currentSongAudio?.play();
    } else {
      if (this.currentSongAudio) {
        this.currentSongAudio.pause();
        this.currentSongAudio.currentTime = 0;
        this.currentSongAudio = undefined;
      }

      this.currentSongAudio = new Audio(song.path);
      this.currentSongId = song.id;
      this.currentSongAudio.play();
      this.currentSongAudio.addEventListener('timeupdate', (currentTime) => {
        const stepInSeconds = (this?.currentSongAudio?.duration ?? 0) / 100;
        const percentage =
          (this.currentSongAudio?.currentTime ?? 0) / stepInSeconds;
        this.currentTime = Math.ceil(percentage);
      });
    }

    this.isSongPlayed = true;
  }

  pauseSong(song: Song) {
    if (this.currentSongAudio) {
      this.currentSongAudio.pause();
      this.isSongPlayed = false;
    }
  }

  stopSong(song: Song) {
    if (this.currentSongAudio && song.id === this.currentSongId) {
      this.currentSongAudio.pause();
      this.currentSongAudio.currentTime = 0;
      this.currentSongAudio = undefined;
      this.currentSongId = 0;
      this.isSongPlayed = false;
    }
  }

  setSongInStorage(song: Song) {
    localStorage.setItem('selectedSong', JSON.stringify(song));
  }

  secondsToMinAndSeconds(number: number) {
    let min = 0;
    let sec = 0;

    if (number <= 60) {
      sec = Math.floor(number);
    } else {
      min = Math.floor(number / 60);
      sec = Math.floor(number - 60 * min);
    }

    return { min: min, sec: sec };
  }

  getCurrentSongAudioTime() {
    if (this.currentSongAudio) {
      return this.currentSongAudio.currentTime;
    }

    return 0;
  }

  getCurrentSongElapsedTime(song: Song) {
    if (this.currentSongAudio) {
      return song.duration - this.currentSongAudio.currentTime;
    }

    return 0;
  }
}

export interface Song {
  id: number;
  artist: string;
  title: string;
  duration: number;
  album: string;
  cover: string;
  path: string;
  images: string[];
}
