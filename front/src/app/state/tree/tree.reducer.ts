import { createFeature, createReducer } from '@ngrx/store';

export interface TreeState {
  loading: boolean;
}

export const initialState: TreeState = {
  loading: false,
};

export const treeFeatureKey = 'treeState';

export const treeFeature = createFeature({
  name: treeFeatureKey,
  reducer: createReducer(
    initialState,
  ),
});

export const { selectLoading} = treeFeature;
