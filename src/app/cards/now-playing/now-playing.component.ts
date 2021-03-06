import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AudioSong } from '../../../models/PlayerStatus';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SongFeedbackComponent } from '../../dialogs/song-feedback';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
const Vibrant = require('node-vibrant');
const diacritics = require('diacritics');

@Component({
    selector: 'app-now-playing',
    templateUrl: './now-playing.component.html',
    styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit, OnChanges {

    @Input() song: AudioSong;
    @Output() onLike = new EventEmitter<AudioSong>();
    @Output() onDislike = new EventEmitter<AudioSong>();

    albumArtKey: string;
    selectedOption: string;
    background: string;
    foreground: string;

    constructor(public dialog: MatDialog) {


    }

    openDialog() {
        const dialogRef = this.dialog.open(SongFeedbackComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.song && this.song.cover) {
            this.albumArtKey = diacritics.remove(`${this.song.artist}${this.song.album}`)
                .replace(/[^\w]/gi, '')
                .toLowerCase();
            Vibrant.from(`https://media-rockchain.azureedge.net/${this.albumArtKey}`).getPalette()
                .then((palette) => {
                    if (palette.Vibrant) {
                        this.background = palette.Vibrant.getHex();
                    }
                });
        }
    }

    feedback(positive: boolean) {
        const dialogRef = this.dialog.open(SongFeedbackComponent, {
            data: {
                verb: positive ? 'cheers' : 'boo',
                song: this.song
            }
        });

        dialogRef
            .afterClosed()
            .filter(result => result === 'true')
            .map(() => positive ? this.onLike : this.onDislike)
            .subscribe(emitter => emitter.emit(this.song));
    }
}
