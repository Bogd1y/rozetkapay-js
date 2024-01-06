import { Action, PaymentMethod, PaymentMethodType, Status, WalletItem } from "./shared"

export type AddCustomerToWalletPayload = {
  callback_url?: string
  payment_method: PaymentMethod
  result_url: string
}

// also callback type
export type SuccessResponseAddCustomerToWalletPayload = {
  action: Action
  action_required: boolean
  created_at: string
  payment_method: WalletItem
  status: Status
}

export type DeleteCustomerPaymentFromWalletPayload = {
  option_id:string
  type: PaymentMethodType | "card"
}


export type SuccessResponseDeleteCustomerPaymentFromWalletPayload = {
  delete: boolean
  option_id: string
  type: PaymentMethodType
}

export type SuccessResponseGetCustomerInfo = {
  address: string
  city: string
  country: string
  email: string
  external_id: string
  first_name: string
  last_name: string
  patronym: string
  phone: string
  postal_code: string
  rid: string
  wallet: WalletItem[]
}

