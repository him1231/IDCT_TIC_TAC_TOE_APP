// import {loginAction, loginApiFail, LOGIN} from '@actions/account';
// import {hideLoading, showLoading} from '@actions/general';
// import {put, takeLatest} from 'redux-saga/effects';
// import {ActionType} from 'typesafe-actions';

// function* handleLogin(action: ActionType<typeof loginAction>): any {
//   try {
//     yield put(showLoading());
//     yield put(hideLoading());
//   } catch (err: any) {
//     yield put(loginApiFail(err));
//   } finally {
//     yield put(hideLoading());
//   }
// }

// export function* watchHandleAccount() {
//   yield takeLatest(LOGIN, handleLogin);
// }
