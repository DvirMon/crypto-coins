import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal, computed } from '@angular/core';
import { CoinSearchResult } from '../store/coin.model';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CheckedChangedEvent } from '../coins-item/coins-item.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';

@Component({
  selector: 'app-coin-search-item',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, TruncatePipe],
  templateUrl: './coin-search-item.component.html',
  styleUrls: ['./coin-search-item.component.scss']
})
export class CoinSearchItemComponent {

  @Input() coin! : CoinSearchResult;
  @Input() toggleLimit!: boolean;
  @Input() selectedMap!: Signal<Record<string, boolean>>;

  @Output() checkedChanged: EventEmitter<CheckedChangedEvent> = new EventEmitter();
  @Output() limitChanged: EventEmitter<void> = new EventEmitter();


  public checked: Signal<boolean> = computed(() => !!this.selectedMap()[this.coin.symbol]);

  public onToggleChanged(event: MatSlideToggleChange): void {

    const { checked, source } = event

    if (this.toggleLimit || !checked) {
      const checkedChangedEvent = this._handleCheckedEvent(event);
      this._emitCheckedChanged(checkedChangedEvent)

    } else {
      source.toggle();
      this.limitChanged.emit();
    }
  }

  private _emitCheckedChanged(event: CheckedChangedEvent): void {
    this.checkedChanged.emit((event))
  }


  private _handleCheckedEvent(event: MatSlideToggleChange): CheckedChangedEvent {
    return {
      coinId: event.source.name as string,
      checked: event.checked
    };
  }


}
