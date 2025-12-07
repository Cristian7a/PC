///// If you need this file, you can uncomment it. Don't forget to add the respective tsconfig.json file configuration:
// {
//     "compilerOptions": {
//         "typeRoots": [ "./node_modules/@types", "./src/types" ]
//     }

import express from 'express';
import { AppUserFromJWT } from '../../models/user-model';

declare module 'express' {
  interface RequestAuth extends express.Request {
    templateNodeUser: AppUserFromJWT;
  }
}
