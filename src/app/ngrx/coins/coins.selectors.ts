import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCoins from './coins.state'
import { Coin } from 'src/app/models/coin.model';




export const selectCoinsState = createFeatureSelector<fromCoins.CoinsState>(fromCoins.coinsFeatureKey);

export const { selectAll, selectEntities } = fromCoins.coinsAdapter.getSelectors();

export const selectCoinsLoaded = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): boolean => state.loaded
);
export const selectCoinsId = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): string => state.selectedId as string
);

export const selectAllCoins = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): Coin[] => selectAll(state)
);

export const selectCurrencyMap = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState) => state.currencyMap
);
export const selectIsCurrency = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): boolean => !!state.currencyMap[state.selectedId as string]
);

