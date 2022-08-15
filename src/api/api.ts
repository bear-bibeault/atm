import { mockAccount, mockSession } from "../mocks/mocks";

export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_FAILED = 400;

//const API = process.env.REACT_APP_API_BASE;

export type ResponseStatus = {
  status: number;
  statusText: string;
};

export type Member = {
  id: number;
  name: string;
};

export type Account = {
  id: number;
  type: "Checking" | "Savings";
  name: string;
  balance: number;
  limit: number;
  daily: number;
};

export type ValidateSessionParams = {
  cardID: string;
  pin: string;
};

export type ValidateSessionResponse = {
  nonce: string;
  member: Member;
  accounts: Account[];
};

export async function apiValidateSession({
  cardID,
  pin,
}: ValidateSessionParams): Promise<ValidateSessionResponse> {
  if (pin !== "9999") {
    return new Promise<ValidateSessionResponse>((resolve) => {
      setTimeout(() => resolve(mockSession), 1000);
    });
  } else {
    throw new Error();
  }
}

export type WithdrawParams = {
  nonce: string;
  accountID: number;
  amount: number;
};

export type WithdrawResponse = {
  account: Account;
};

export async function apiWithdraw({ nonce, accountID, amount }: WithdrawParams) {
  return new Promise<WithdrawResponse>((resolve) => {
    setTimeout(() => resolve({ account: mockAccount }), 1000);
  });
}

export type DepositParams = {
  nonce: string;
  accountID: number;
  amount: number;
};

export type DepositResponse = {
  account: Account;
};

export async function apiDeposit({ nonce, accountID, amount }: DepositParams) {
  return new Promise<DepositResponse>((resolve) => {
    setTimeout(() => resolve({ account: mockAccount }), 1000);
  });
}
