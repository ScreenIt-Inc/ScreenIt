export interface IEstablishment {
    _id: string;
    establishmentName: string,
    establishmentId: string,
    maxCapacity: Int32Array,
    notificationMessage: string
  }
  
  export interface IEstablishmentInputDTO {
    establishmentName: string,
    maxCapacity: Int32Array,
    notificationMessage: string
  }
  