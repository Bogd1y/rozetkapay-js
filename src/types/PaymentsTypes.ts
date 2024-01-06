import { ResponseCode, Properties, Status, Fee, Action, ResultPaymentMethod, PaymentMethod, Recipient, TransactionDetail, ResultUserDetails, DefaultErrorResponse } from "./shared"

type Customer = {
  color_mode?: 'light' | 'dark'
  locale?: 'UK' | 'EN' | 'ES' | 'PL' | 'FR' | 'SK' | 'DE'
  account_number?: string
  ip_address?: string // ipv4
  address?: string // <= 50 chars
  city?: string
  country?: string
  email?: string // email
  external_id?: string
  first_name?: string
  last_name?: string
  patronym?: string
  payment_method: PaymentMethod
  phone?: string
  postal_code?: string
} 

type Product = {
  category?: string
  currency?: string
  description?: string
  id?: string
  image?: string
  name?: string
  net_amount?: number
  quantity?: string
  url?: string
  vat_amount?: number
}

type Details = {
  amount: number
  billing_order_id: string
  created_at: string
  currency: string
  description: string
  gateway_order_id: string
  payload: string
  payment_id: string
  processed_at: string
  properties: Properties
  rrn: string
  status: Status
  status_code: ResponseCode
  status_description: string
  transaction_id: string
  auth_code: string
  fee: Fee
  terminal_name: string
}


type UserInfo = {
  browser_user_agent: string
  email: string
  external_id: string
  first_name: string
  ip_address: string
  last_name: string
  patronym: string
  phone: string
}

export type CreatePaymentPayload = {
  amount: number
  callback_url?: string
  result_url?: string
  /** When falsee payment becomes 2 step */
  confirm?: boolean
  currency: string
  customer?: Customer
  description?: string
  external_id: string
  payload?: string
  products?: Product[]
  properties?: Properties
  recipient?: Recipient
  /** @property {mode} - When mode is set to direct - customer field becomes required. */
  mode: 'hosted' | 'direct' 
} & ( { mode: 'direct'; customer: Customer } | { mode: 'hosted'; customer?: Customer } );

export type SuccessResponseCreatePaymentType = {
  action: Action
  action_required: boolean
  details?: Details
  external_id: string
  id: string
  is_succes: boolean
  receipt_url?: string
  payment_method: ResultPaymentMethod
  customer: UserInfo
}


/** Represents a transaction object. */
export type SuccessResponseGetInfo = {
  /** Represents a user action associated with the transaction*/
  action?: Action;

  /** boolean flag indicating if customer action is required*/
  action_required: boolean;

  /** The transaction amount*/
  amount: number;

  /** The amount of canceled funds*/
  amount_canceled: number;

  /** The amount of confirmed funds in the 2-step acquiring flow*/
  amount_confirmed: number;

  /** The amount of refunded funds*/
  amount_refunded: number;

  /** boolean flag indicating if the payment was canceled*/
  canceled: boolean;

  /** List of cancellation transactions (cancellation_details)*/
  cancellation_details?: TransactionDetail[];

  /** List of confirmation transactions in the 2-step acquiring flow (confirmation_details)*/
  confirmation_details?: TransactionDetail[];

  /** boolean flag indicating if the payment was confirmed (2-step acquiring flow)*/
  confirmed: boolean;

  /** The date when the transaction was created*/
  created_at: string; // Date-time string

  /** The transaction currency*/
  currency: string;

  /** Merchant's transaction ID*/
  external_id: string;

  /** Internal transaction ID*/
  id: string;

  /** List of primary transactions (purchase_details)*/
  purchase_details?: TransactionDetail[];

  /** boolean flag indicating if the payment was successful*/
  purchased: boolean;

  /** Link to the receipt for the user*/
  receipt_url: string;

  /** List of refund transactions (refund_details)*/
  refund_details?: TransactionDetail[];

  /** boolean flag indicating if the payment was refunded*/
  refunded: boolean;

  /** User details for the result (customer)*/
  customer?: ResultUserDetails;
};


export type CancelPaymentPayload = {
  external_id:string
  amount?: number
  callback_url?: string
  currency?: string
  payload?: string
}

export type SuccessResponseCancelPayment = {
  action: Action
  action_required: boolean
  details: TransactionDetail
  external_id: string
  id: string
  is_success: boolean
  receipt_url: string
  payment_method: ResultPaymentMethod
  customer: UserInfo
}

export type ConfirmPaymentPayload = {
  external_id: string
  amount?: number
  callback_url?: string
  currency?: string
  payload?: string
  recipient?: Recipient
}

export type SuccessResponseConfirmPayment = {
  action: Action
  action_required: boolean
  details: TransactionDetail
  external_id: string
  id: string
  is_success: boolean
  receipt_url: string
  payment_method: ResultPaymentMethod
  customer: UserInfo
}

export type RefundPaymentPayload = {
  external_id: string
  require?: string
  amount?: number
  callback_url?: string
  currency?: string
  payload?: string
}

export type SuccessResponseRefundPayment = {
  action: Action
  action_required: boolean
  details: TransactionDetail
  external_id: string
  id: string
  is_success: boolean
  receipt_url: string
  payment_method: ResultPaymentMethod
  customer: UserInfo
}

export type ResendCallbackPayload = {
  external_id: string
  operation?: "payment" | "confirm" | "refund" | "cancel"
}

export type ErrorResponseResendCallback = {
  payment: string
} & DefaultErrorResponse