/* eslint-disable @typescript-eslint/naming-convention */

import { Role } from './role';

export class LoginResponse {
  public token!: string;
  public role!: Role;
}
