import { AfterViewInit, Directive, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const MIN_FLUENT_HEIGHT = 260;

@Directive({
  selector: '[appDashboardMainCardHeight]',
  exportAs: 'fluentHeight',
  standalone: true
})
export class DashboardMainCardDirective implements AfterViewInit {
  private document: Document = inject(DOCUMENT);

  @Output() fluentHeightChange: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.calculateHeight();
  }

  @HostListener('window:resize', ['$event'])
  calculateHeight(): void {
    const currentHeight: number = this.document.body.offsetHeight;
    const fluentHeight: number = Math.max(MIN_FLUENT_HEIGHT, ((currentHeight - 130) / 2));
    this.fluentHeightChange.emit(`${fluentHeight}px`);
  }
}
