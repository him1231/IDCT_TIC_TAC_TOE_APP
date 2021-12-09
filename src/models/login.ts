export interface ILoginResult {
    token: string;
    loginName: string;
  }
  
  export type ILoginInterface = {
    sessionKey: string;
    name: string;
    level: string;
    requireUpdate: string;
    updatePath: string;
  };
  
  export type ILoginApiModel = {
    username: string;
    password: string;
    version: string;
    udid: string;
  };