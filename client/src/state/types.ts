// src/state/types.ts

export interface User {
    userId: number;
    userFirstName: string;
    userLastName: string;
    userProfileId: number;
    statusId: number;
    accountId: number;
    profile?: {
      userProfileId: number;
      userProfileName: string;
      userProfileDescription: string;
    };
    status?: {
      statusId: number;
      statusName: string;
      statusDescription: string;
    };
    account?: {
      accountId: number;
      accountName: string;
      statusId: number;
      typeId: number;
      status?: {
        statusId: number;
        statusName: string;
        statusDescription: string;
      };
      type?: {
        typeId: number;
        typeName: string;
        typeDescription: string;
      };
    };
    userEmail?: string;
  }
  
  export interface UserResponse {
    user: User; // correspond exactement à ce que ton API renvoie
  }
  