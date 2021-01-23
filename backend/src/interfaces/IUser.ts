export interface IUser {
  _id: string;
  establishmentId: string;
  name: string;
  role: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  establishmentId: string;
  name: string;
  role: string;
  email: string;
  password: string;
}
