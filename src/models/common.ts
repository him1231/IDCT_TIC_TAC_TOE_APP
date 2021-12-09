import { Map } from 'immutable';
export interface ITypedMap<T> extends Map<string, any> {
  toJS(): T;
  get<I extends keyof T>(key: I & string): T[I];
}

export interface IVersionInfo {
  iosAppVersion: string;
  iosAppAppStoreLink: string;
  androidAppVersion: string;
  androidAppDownloadLink: string;
}
