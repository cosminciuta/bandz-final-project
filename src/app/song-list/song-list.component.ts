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
        artist: 'Coldplay',
        title: 'A Sky Full Of Stars',
        duration: 253,
        album: 'Ghost Stories',
        cover: '/assets/img/albums/ghost-stories.jpeg',
        path: '/assets/music/Coldplay - A Sky Full Of Stars.mp3',
        images: [
          '/assets/details/coldplay/coldplay1.jpeg',
          '/assets/details/coldplay/coldplay2.jpeg',
          '/assets/details/coldplay/coldplay3.jpeg',
          '/assets/details/coldplay/coldplay4.jpeg',
          '/assets/details/coldplay/coldplay5.jpeg',
          '/assets/details/coldplay/coldplay6.jpeg',
        ],
      },
      {
        id: 2,
        artist: 'David Bowie',
        title: 'Heroes',
        duration: 366,
        album: 'Heroes',
        cover: '/assets/img/albums/heroes.png',
        path: '/assets/music/DavidBowie-03-Heroes.mp3',
        images: [
          '/assets/details/bowie/bowie1.jpeg',
          '/assets/details/bowie/bowie2.jpeg',
          '/assets/details/bowie/bowie3.jpeg',
          '/assets/details/bowie/bowie4.jpeg',
          '/assets/details/bowie/bowie5.jpeg',
          '/assets/details/bowie/bowie6.jpeg',
        ],
      },
      {
        id: 3,
        artist: 'Dandy Warhols',
        title: 'We Used To Be Friends',
        duration: 201,
        album: 'We Used To Be Friends',
        cover: '/assets/img/albums/dandy.jpeg',
        path: '/assets/music/Dandy Warhols - We Used To Be Friends.mp3',
        images: [
          '/assets/details/warhols/warhols1.jpeg',
          '/assets/details/warhols/warhols2.jpeg',
          '/assets/details/warhols/warhols3.jpeg',
          '/assets/details/warhols/warhols4.jpeg',
          '/assets/details/warhols/warhols5.jpeg',
          '/assets/details/warhols/warhols6.jpeg',
        ],
      },
      {
        id: 4,
        artist: 'Disclosure',
        title: 'Help Me Lose My Mind (Mazde Remix)',
        duration: 237,
        album: 'Settle',
        cover: '/assets/img/albums/disclosure.jpeg',
        path: '/assets/music/Disclosure - Help Me Lose My Mind (Mazde Remix).mp3',
        images: [
          '/assets/details/disclosure/disclosure1.jpeg',
          '/assets/details/disclosure/disclosure2.jpeg',
          '/assets/details/disclosure/disclosure3.jpeg',
          '/assets/details/disclosure/disclosure4.jpeg',
          '/assets/details/disclosure/disclosure5.jpeg',
          '/assets/details/disclosure/disclosure6.jpeg',
        ],
      },
      {
        id: 5,
        artist: 'Elektrik People',
        title: 'Make Me a Bird',
        duration: 221,
        album: 'The Lost Get Loud',
        cover: '/assets/img/albums/elektrik.jpeg',
        path: '/assets/music/Elektrik People - Make Me a Bird.mp3',
        images: [
          '/assets/details/elektrik/elektrik1.jpeg',
          '/assets/details/elektrik/elektrik2.jpeg',
          '/assets/details/elektrik/elektrik3.jpeg',
          '/assets/details/elektrik/elektrik4.jpeg',
          '/assets/details/elektrik/elektrik5.jpeg',
          '/assets/details/elektrik/elektrik6.jpeg',
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
