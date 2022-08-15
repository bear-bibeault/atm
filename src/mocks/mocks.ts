import { Account, ValidateSessionResponse } from "../api/api";

export const mockSession: ValidateSessionResponse = {
  nonce: "1234567890",
  member: {
    id: 213,
    name: "Bear Bibeault",
  },
  accounts: [
    {
      id: 1,
      type: "Savings",
      name: "Savings",
      balance: 1000,
      limit: 200,
      daily: 0,
    },

    {
      id: 2,
      type: "Checking",
      name: "Checking #1",
      balance: 1100,
      limit: 250,
      daily: 200,
    },

    {
      id: 3,
      type: "Checking",
      name: "Checking #2",
      balance: 1200,
      limit: 250,
      daily: 200,
    },
  ],
};

export const mockAccount: Account = {
  ...mockSession.accounts[1],
  balance: mockSession.accounts[1].balance - 20,
};
