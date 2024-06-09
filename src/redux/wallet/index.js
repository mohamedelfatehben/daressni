const SET_WALLET = "SET_WALLET";
const DELETE_WALLET = "DELETE_WALLET";
const TRANSACTION = "TRANSACTION";

const initialState = {
  id: "",
  balance: 0,
};

export const setWalletInfo = (payload) => {
  const { id, balance } = payload;
  return {
    type: SET_WALLET,
    payload: {
      id,
      balance,
    },
  };
};

export const deleteWallet = (payload) => ({
  type: DELETE_WALLET,
  payload,
});

export const transaction = (payload) => ({
  type: TRANSACTION,
  payload,
});

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_WALLET:
      return action.payload;
    case SET_WALLET:
      return {
        ...state,
        id: action.payload.id,
        balance: action.payload.balance,
      };
    case TRANSACTION:
      return {
        ...state,
        balance: action.payload.balance,
      };
    default:
      return state;
  }
};

export default walletReducer;
