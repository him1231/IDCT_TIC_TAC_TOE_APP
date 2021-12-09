import {Action, AnyAction, Reducer} from 'redux';

interface State {
  loadingCount?: number;
}

interface DispatchAction extends Action, State {}

const initState = {
  loadingCount: 0,
};

export const showLoading = (): DispatchAction => {
  return {
    type: 'SHOW_LOADING',
  };
};

export const hideLoading = (): DispatchAction => {
  return {
    type: 'HIDE_LOADING',
  };
};

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return {...state, loadingCount: state.loadingCount + 1};
    case 'HIDE_LOADING':
      return {
        ...state,
        loadingCount: state.loadingCount > 0 ? state.loadingCount - 1 : 0,
      };
    default:
      return state;
  }
};
