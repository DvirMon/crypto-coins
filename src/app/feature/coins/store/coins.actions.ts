import { ComponentType } from '@angular/cdk/portal';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Coin, CoinSearchResult, Currency } from './coin.model';

export const CoinAPIActions = createActionGroup({
  source: 'Coin/API',
  events: {
    'Load Coins': emptyProps(),
    'Load Coin Success': props<{ coins: Coin[] }>(),
    'Load Coin Failure': props<{ err: unknown }>(),
    'Update Coin Currency': props<{ id: string }>(),
    'Update Coin Currency Success': props<{ id: string, currency: Currency }>(),
    'Update Coin Currency Failure': props<{ err: unknown }>(),
    'Add Selected Coin': props<{ coinId: string, checked: boolean }>(),
    'Delete Selected Coin': props<{ id: string }>(),
    'Update Selected Coins Map': props<{ coinsMap: Record<string, boolean> }>(),
    "Load Search Coin": props<{ searchTerm: string }>(),
    "Load Search Coin Success": props<{ results: CoinSearchResult[] }>(),
    'Clear Search Coins': emptyProps(),
  }
});

export const CoinDialogActions = createActionGroup({
  source: 'Coin Dialog',
  events: {
    'Dialog Opened': props<{ component: () => ComponentType<unknown>, data: unknown }>(),
    'Dialog Closed': props<{ data: unknown }>(),
    'Dialog Saved': props<{ data: unknown }>(),
  }
});

