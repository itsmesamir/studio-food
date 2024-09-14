export enum ToastMessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}

const en = {
  toast: {
    SOMETHING_WENT_WRONG: 'Something went wrong',
  },

  GENERAL: {
    DATE: 'Date',
    STATUS: 'Status',
  },

  MEMBER: 'Member',
  CAFE: 'Cafe',
  MENU: 'Menu',

  ORDER: {
    CURRENCY: 'RS.',
    PAYMENT_SUMMARY: 'Payment Summary',
    PRICE: 'Price',
    TOTAL_PRICE: 'Total Price',
    QUANTITY: 'Quantity',
  },

  BUTTON: {
    ADD_TO_CART: 'Add to cart',
    CONFIRM_DELETE: 'Yes, Delete',
    APPLY: 'Apply',
    CANCEL: 'Cancel',
    RESET: 'Reset',
  },

  MODEL: {
    DELETE: 'Are you sure you want to delete :title?',
  },

  TABLE: {
    VIEWING: 'Viewing :start of :total :title',
  },
};

export default en;
