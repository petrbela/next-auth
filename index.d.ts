import expressSession, { Store } from "express-session";
import { RequestHandler, Express } from "express";
import * as next from "next";

export  interface IOptions {
    bodyParser?: boolean;
    csrf?: boolean;
    pathPrefix?: string;
    expressApp?: Express.Application;
    expressSession: expressSession;
    sessionSecret: string;
    sessionStore: Store;
    sessionMaxAge: number;
    sessionRevalidateAge: number;
    sessionResave?: boolean;
    sessionRolling?: boolean;
    sessionSaveUninitialized?: boolean;
    serverUrl?: string;
    trustProxy?: boolean;
    providers: any[];
    port?: number;
    functions: IFunctions;
  }

export  interface IUserProvider {
    name: string;
    id: string;
  }
export  interface ISendSignInEmailOpts {
    email?: string;
    url?: string;
    req?: Express.Request;
  }
export  interface ISignInOpts {
    email?: string;
    password?: string;
  }

  export  interface IFunctions<
    UserType = {},
    IDType = string,
    SessionType extends INextAuthSessionData = INextAuthSessionData
  > {
    find({
             id: IDType,
             email: string,
             emailToken: string,
             provider: IUserProvider
         }
    ): Promise<UserType>;
    update: (user: UserType, profile: any) => Promise<UserType>;
    insert: (user: UserType, profile: any) => Promise<UserType>;
    remove: (id: IDType) => Promise<boolean>;
    serialize: (user: UserType) => Promise<IDType>;
    deserialize: (id: IDType) => Promise<UserType>;
    session?: (
      session: INextAuthSessionData,
      req: Express.Request
    ) => SessionType;
    sendSignInEmail?: (opts: ISendSignInEmailOpts) => Promise<boolean>;
    signIn?: (opts: ISignInOpts) => Promise<UserType>;
  }

export  interface INextAuthResult {
    next?: next.Server;
    express: Express;
    expressApp: Express.Application;
    function: IFunctions;
    providers: any;
    port?: number;
}

export default function NextAuth(
  nextApp?: next.Server,
  options?: IOptions
): Promise<INextAuthResult>;