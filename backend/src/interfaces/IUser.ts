export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  name: string;
  role: string;
  email: string;
  password: string;
}
