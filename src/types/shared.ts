export type ResponseCode = "authorization_failed" | "customer_auth_not_found" | "request_failed" | "internal_error" | "access_not_allowed" | "invalid_request_body" | "payment_settings_not_found" | "transaction_already_paid" | "action_not_allowed" | "action_already_done" | "transaction_success_primary_not_found" | "payment_method_not_allowed" | "wallet_not_configured" | "payment_method_already_confirmed" | "payment_method_not_found" | "invalid_card_token" | "customer_auth_token_expired_or_invalid" | "customer_profile_not_found" | "customer_id_not_passed" | "transaction_not_found" | "waiting_for_verification" | "transaction_amount_limit" | "invalid_data" | "transaction_declined" | "authorization_error" | "transaction_rejected" | "transaction_successful" | "anti_fraud_check" | "card_not_supported" | "confirmation_timeout" | "invalid_card_data" | "invalid_currency" | "pending" | "waiting_for_complete" | "access_error" | "card_expired" | "receiver_info_error" | "transaction_limit_exceeded" | "transaction_not_supported" | "3ds_not_supported" | "3ds_required" | "failed_to_create_transaction" | "failed_to_finish_transaction" | "insufficient_funds" | "invalid_phone_number" | "card_has_constraints" | "pin_tries_exceeded" | "session_expired" | "timeout" | "transaction_created" | "waiting_for_redirect" | "wrong_amount" | "test_transaction" | "subscription_successful" | "unsubscribed_successfully" | "wrong_pin" | "wrong_authorization_code" | "wrong_cavv" | "wrong_cvv" | "wrong_account_number" | "confirm_required" | "cvv_is_required" | "confirmation_required" | "sender_info_required" | "missed_payout_method_data" | "card_verification_required" | "incorrect_refund_sum_or_currency" | "payment_card_has_invalid_status" | "wrong_card_number" | "user_not_found" | "failed_to_send_sms" | "wrong_sms_password" | "card_not_found" | "payment_system_not_supported" | "country_not_supported" | "no_discount_found" | "failed_to_load_wallet" | "invalid_verification_code" | "additional_information_is_pending" | "transaction_is_not_recurring" | "confirm_amount_cannot_be_more_than_the_transaction_amount" | "card_bin_not_found" | "currency_rate_not_found" | "invalid_recipient_name" | "daily_card_usage_limit_reached" | "invalid_transaction_amount" | "card_type_is_not_supported" | "store_is_blocked" | "store_is_not_active" | "payment_method_not_found" | "transaction_cannot_be_processed" | "invalid_transaction_status" | "public_key_not_found" | "terminal_not_found" | "fee_not_found" | "failed_to_verify_card" | "invalid_transaction_type" | "restricted_ip" | "invalid_token" | "preauth_not_allowed" | "token_does_not_exist" | "reached_the_limit_of_attempts_for_ip" | "card_branch_is_blocked" | "card_branch_daily_limit_reached" | "completion_limit_reached" | "recurring_transactions_not_allowed" | "transaction_is_canceled_by_payer" | "payment_was_refunded" | "card_is_lost_or_stolen" | "plan_not_found" | "plan_not_active" | "subscription_not_found" | "subscription_not_active"

export type Properties = {
  [key: string]: string
}

export type Status = 'init' | 'pending' | 'success' | 'failure'

export type Fee = {
  amount: number
  currency: string
}
export type Action = {
  type: string
  value: string
}

export type WalletItem = {
  card: CardItemDetails
  option_id: string
  /** Card name set by user. If wasn't set the null value will be returned instead. */
  name: string | null
  type: PaymentMethodType
}

export type CardItemDetails = {
  expires_at: string
  mask: string
}

export type DefaultErrorResponse = {
  code: ResponseCode
  message: string
  param: string
  payment_id: string
  type: "invalid_request_error" | "payment_method_error" | "payment_settings_error" | "payment_error" | "api_error" | "customer_error"
} 

export type TransactionDetail = {
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
}

type CCTokenResponsePaymentMethod = {
  bank_short_name: string
  expires_at: string
  mask: string
  payment_system: string
  token: string
}
export type ResultPaymentMethod = {
  cc_token: CCTokenResponsePaymentMethod
  type: 'cc_token' | 'wallet' | 'google_pay' | 'apple_pay'
}

type BrowserFingerprint = {
  browser_accept_header: string
  browser_color_depth: string
  browser_ip_address: string
  browser_java_enabled: string
  browser_language: string
  browser_screen_height: string
  browser_time_zone: string
  browser_time_zone_offset: string
  browser_user_agent: string
}

export type PaymentMethodType = 'cc_token' | 'wallet' | 'google_pay' | 'apple_pay'

export type PaymentMethod = {
  apple_pay?: {
    browser_fingerprint?: BrowserFingerprint
    token: string
    use_3ds_flow?: boolean
  }
  cc_token?: {
    browser_fingerprint?: BrowserFingerprint
    token: string
    use_3ds_flow?: boolean
  }
  google_pay?: {
    browser_fingerprint?: BrowserFingerprint
    token: string
    use_3ds_flow?: boolean
  }
  type: PaymentMethodType
  wallet?: {
    browser_fingerprint?: BrowserFingerprint
    option_id: string
    use_3ds_flow?: boolean
  }
}
export type Recipient = {
  address?: string // <= 50
  city?: string
  country?: string
  email?: string
  external_id?: string
  first_name?: string
  last_name?: string
  patronym?: string
  payment_method: PaymentMethod
  phone?: string
  postal_code?: string
}

export type UserInfo = {
  browser_user_agent: string
  email: string
  external_id: string
  first_name: string
  ip_address: string
  last_name: string
  patronym: string
  phone: string
  country: string | null,
  address: string | null,
  city: string | null,
}

export type ResultUserDetails = {
  account_number: string
  email: string
  external_id: string
  first_name: string
  last_name: string
  patronym: string
  payment_method: ResultPaymentMethod 	
  phone: string
}

export type Callback = {
  action: Action,
  action_required: true,
  details: {
    amount: number | string,
    billing_order_id: string,
    created_at: string,
    currency: string,
    description: string,
    gateway_order_id: string,
    payload: string | null,
    payment_id: string,
    processed_at: string,
    properties: Properties,
    rrn: string | null,
    status: Status,
    status_code: ResponseCode,
    status_description: string,
    transaction_id: string,
    auth_code: string | null,
    fee: Fee,
    terminal_name: string,
    comment: string | null
  },
  external_id: string,
  id: string,
  is_success: boolean,
  receipt_url: string | null,
  payment_method: ResultPaymentMethod
  customer: UserInfo
}