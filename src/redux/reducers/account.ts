// import { ITypedMap } from "@models/common";
// import { fromJS } from "immutable";
// import { ActionType } from 'typesafe-actions';
// import * as AccountActions from "../actions/account";

// interface IAccountState {
//   username: string;
//   password: string;
//   isLoggedIn: boolean
// }

// export type IAccountActions = ActionType<
//   typeof AccountActions
// >;

// const initialState: ITypedMap<IAccountState> = fromJS({
//   username: '',
//   password: '',
//   isLoggedIn: false
// })

// export default (state: ITypedMap<IAccountState> = initialState,
//   action: IAccountActions,) => {
//   switch (action.type) {
//     case AccountActions.LOGIN:
//       return state
//         .set('username', action.payload.username)
//         .set('password', action.payload.password);
//     case AccountActions.LOGIN_SUCCESS:
//       return state
//         .set('isLoggedIn', true);
//     default:
//       return state
//   }
// }
