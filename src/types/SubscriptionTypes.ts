import { Action, Recipient, ResponseCode } from './shared';

export type Subscription = {
  auto_renew: boolean
  callback_url: string
  created_at: string
  currency: string
  description: string
  id: string
  next_notification_date: string
  next_payment_date: string
  plan_id: string
  price: number
  result_url: string
  start_date: string
  state: "init" | "processing" | "pending" | "active" | "paused" | "inactive"
  updated_at: string
}

export type SuccessResponseGetSubscriptionPayments = {
  details: SubscriptionPaymentDetails
  id: string
  subscription_id: string
  user_action: Action
}[]

export type SubscriptionPaymentDetails = {
  amount: number
  created_at: string
  currency: string
  description: string
  next_processing_date: string
  processed_at: string
  retry_count: number
  status: "init" | "pending" | "success" | "failure"
  status_code: ResponseCode
  status_description: string
  updated_at: string
}

export type SuccessResponseGetSubscription = Subscription

export type SuccessResponseGetCustomerSubscription = Subscription[]

export type CreateSubscriptionPlanPayload = {
  name: string
  description?: string
  price: number
  currency: string
  platforms: string[]
  frequency_type: string
  frequency: number
  start_date: string
  end_date?: string
}

export type SuccessResponseCreateSubscriptionPlan = {
  created_at: string
  currency: string
  description: string
  end_date: string
  frequency: number
  frequency_type: string
  id: string
  state: "active" | "inactive"
  name: string
  platforms: string[]
  price: number
  start_date: string
  updated_at: string
}

export type CreateSubscriptionPayload = {
  auto_renew?: boolean
  callback_url: string
  description?: string
  plan_id: string
  price?: number
  customer: Recipient
  result_url: string
  start_date: string
}
export type SuccessResponseCreateSubscription = {
  payment: {
    details: SubscriptionPaymentDetails
    id: string
    subscription_id: string
    user_action: Action
  }
  subscription: Subscription	
}

export type UpdatePlanPayload = {
  description: string
  name: string
} 

export type SuccessMessageResponse = {
  message: string
}

export type UpdateSubscriptionPayload = {
  auto_renew: boolean
}

export type SuccessResponseGetPlans = PlanItem[]

export type PlanItem = {
  reated_at: string
  currency: string
  description: string
  end_date: string
  frequency: number
  frequency_type: string
  id: string
  state: "active" | "inactive"
  name: string
  platforms: string[]
  price: number
  start_date: string
  updated_at: string
}
export type SuccessResponseGetPlan = PlanItem