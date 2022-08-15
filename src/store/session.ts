import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "./store";
import type { Account, Member, ResponseStatus } from "../api";
import { apiValidateSession, STATUS_FAILED } from "../api";
import {
  apiDeposit,
  apiWithdraw,
  DepositParams,
  DepositResponse,
  ValidateSessionParams,
  ValidateSessionResponse,
  WithdrawParams,
  WithdrawResponse,
} from "../api/api";

export type SessionState = {
  nonce?: string;
  member?: Member;
  accounts: EntityState<Account>;
};

const prefix = "session";

export const accountsAdapter = createEntityAdapter<Account>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState: SessionState = {
  accounts: accountsAdapter.getInitialState(),
};

export const establishSession = createAsyncThunk<
  ValidateSessionResponse,
  ValidateSessionParams,
  { rejectValue: ResponseStatus }
>(`${prefix}/validateSession`, async ({ cardID, pin }: ValidateSessionParams, thunkAPI) => {
  try {
    return await apiValidateSession({ cardID, pin });    
  } catch (e: any) {    
    return thunkAPI.rejectWithValue({
      status: STATUS_FAILED,
      statusText: e.toString(),
    });
  }
});

export const withdraw = createAsyncThunk<WithdrawResponse, WithdrawParams, { rejectValue: ResponseStatus }>(
  `${prefix}/withdraw`,
  async ({ nonce, accountID, amount }: WithdrawParams, thunkAPI) => {
    try {
      return await apiWithdraw({ nonce, accountID, amount });      
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        status: STATUS_FAILED,
        statusText: e.toString(),
      });
    }
  }
);

export const deposit = createAsyncThunk<DepositResponse, DepositParams, { rejectValue: ResponseStatus }>(
  `${prefix}/deposit`,
  async ({ nonce, accountID, amount }: DepositParams, thunkAPI) => {
    try {
      return await apiDeposit({ nonce, accountID, amount });      
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        status: STATUS_FAILED,
        statusText: e.toString(),
      });
    }
  }
);

export const sessionSlice = createSlice({
  name: prefix,
  initialState,

  reducers: {
    clearSession: (state, action: PayloadAction<void>) => {
      state.member = undefined;
      state.nonce = undefined;
      accountsAdapter.removeAll(state.accounts);
    },
    
    setMember: (state, action: PayloadAction<Member>) => {
      state.member = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(establishSession.rejected, (state, action) => {})

      .addCase(establishSession.fulfilled, (state, action) => {
        state.member = action.payload.member;
        accountsAdapter.addMany(state.accounts, action.payload.accounts);
      })

      .addCase(withdraw.rejected, (state, action) => {})

      .addCase(withdraw.fulfilled, (state, action) => {
        accountsAdapter.upsertOne(state.accounts, action.payload.account);
      })

      .addCase(deposit.rejected, (state, action) => {})

      .addCase(deposit.fulfilled, (state, action) => {
        accountsAdapter.upsertOne(state.accounts, action.payload.account);
      });
  },
});

export const selectSession = (state: RootState): SessionState => state.session;

export const accountsSelectors = accountsAdapter.getSelectors<RootState>((state) => state.session.accounts);
