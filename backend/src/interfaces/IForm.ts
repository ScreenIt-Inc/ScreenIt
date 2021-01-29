export interface IForm {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: string;
  entry_time: Date;
  exit_time: Date;
  questionnaire: Array;
}

export interface IOpenFormUUID {
  _id: string;
  uuid: string;
}
