import {Component, Input, OnDestroy, Inject, ViewEncapsulation} from '@angular/core';
import {Spinkit} from './spinkits';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: [
        './spinner.component.scss',
        './spinkit-css/sk-line-material.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible = true;
    public Spinkit = Spinkit;

    colors : any = {"/login":'rgba(64, 153, 255, 1)',"/":'rgba(64, 153, 255, 1)' }

    @Input() public backgroundColor = this.colors[this.router.url];
    @Input() public spinner = Spinkit.skLine;
    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isSpinnerVisible = true;
            } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.isSpinnerVisible = false;
            }
        }, () => {
            this.isSpinnerVisible = false;
        });     
    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
}