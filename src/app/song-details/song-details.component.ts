import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../song-list/song-list.component';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css'],
})
export class SongDetailsComponent implements OnInit {
  public song: Song | undefined;
  public songId: number = 0;
  public songs: Song[] | undefined = undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.songId = parseInt(this.activatedRoute.snapshot.params['songId']);

    const songsString = localStorage.getItem('songs');
    const songs = JSON.parse(songsString ?? '');
    const currentSong = songs?.find((elem: Song) => elem.id === this.songId);
    this.songs = songs;
    this.song = currentSong;
  }

  ngAfterViewChecked(): void {
    const currentSong = this.songs?.find(
      (elem: Song) => elem.id === this.songId
    );
    setTimeout(() => {
      this.song = currentSong;
    });
  }

  goToPreviousTrack(song: Song): number {
    const previousTrackNumber = song.id - 1;
    this.songId =
      previousTrackNumber === 0 ? this.songs?.length ?? 0 : previousTrackNumber;
    return this.songId;
  }

  goToNextTrack(song: Song): number {
    const nextTrackNumber = song.id + 1;
    this.songId =
      nextTrackNumber === this.songs?.length ?? -1 + 1 ? 1 : nextTrackNumber;
    return this.songId;
  }
}
