import { USER_Role } from './user.contant';

export interface Tuser extends Document {
  name: string;
  password: string;
  confirmpassword: string;
  email?: {
    type: string;
  };
  number?: string;
  profile_image: string;
  refreshToken: string;
  role: keyof typeof USER_Role;
  createAt: Date;
}
export interface TrefreshToken {
  id: string;
  email: string;
  role: keyof typeof USER_Role;
}
