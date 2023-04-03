export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserRegisterBody extends UserLoginBody {
  username: string;
}

export interface FetchedUserData {
  username: string;
  admin: boolean;
}

export interface ChangePasswordBody {
  newPassword: string;
  oldPassword: string;
}

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorRes {
  error: string;
}
