import { ApiResponse, MakeRequestPayload, makeRequest } from './requster';
import { DefaultErrorResponse } from './types/shared';
import { AddCustomerToWalletPayload, CancelPaymentPayload, ConfirmPaymentPayload, CreatePaymentPayload, CreateSubscriptionPayload, CreateSubscriptionPlanPayload, RefundPaymentPayload, ResendCallbackPayload, SuccessMessageResponse, SuccessResponseAddCustomerToWalletPayload, SuccessResponseCancelPayment, SuccessResponseConfirmPayment, SuccessResponseCreatePaymentType, SuccessResponseCreateSubscription, SuccessResponseCreateSubscriptionPlan, SuccessResponseDeleteCustomerPaymentFromWalletPayload, SuccessResponseGetCustomerSubscription, SuccessResponseGetInfo, SuccessResponseGetPlan, SuccessResponseGetPlans, SuccessResponseGetSubscription, SuccessResponseGetSubscriptionPayments, SuccessResponseRefundPayment, UpdatePlanPayload, UpdateSubscriptionPayload } from './types';

export class RozetkaPaySDK {
  base_url: string
  loginCreds = Buffer.from(this.login + ':' + this.password).toString('base64')

  constructor(
    private login: string,
    private password: string
  ) {
    this.base_url = 'https://api.rozetkapay.com/'
    // this.base_url = 'https://api-epdev.rozetkapay.com/'
  }

  // ** Payments

  /** Creates payment and performs desired operation. When mode is set to direct - customer field becomes required. */
  async createPayment(payload: CreatePaymentPayload): Promise<ApiResponse<SuccessResponseCreatePaymentType, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        body: JSON.stringify(payload),
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.base_url + 'api/payments/v1/new'
      }
      const res = await makeRequest<SuccessResponseCreatePaymentType, DefaultErrorResponse>(reqPayload)
      return res
    } catch (error) {
      throw error;
    }
  }

  /** Confirm two-step payment. */
  async confirmPayment(payload: ConfirmPaymentPayload): Promise<ApiResponse<SuccessResponseConfirmPayment, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        body: JSON.stringify(payload),
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.base_url + 'api/payments/v1/confirm'
      }
      const res = await makeRequest<SuccessResponseConfirmPayment, DefaultErrorResponse>(reqPayload)
      return res
    } catch (error) {
      throw error;
    }
  }

  /** Cancel two-step payment. */
  async cancelPayment(payload: CancelPaymentPayload): Promise<ApiResponse<SuccessResponseCancelPayment, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        body: JSON.stringify(payload),
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.base_url + 'api/payments/v1/cancel'
      }
      const res = await makeRequest<SuccessResponseCancelPayment, DefaultErrorResponse>(reqPayload)
      return res
    } catch (error) {
      throw error;
    }
  }

  /** Refund one-step payment after withdrawal, or two-step payment after confirmation. */
  async refundPayment(payload: RefundPaymentPayload): Promise<ApiResponse<SuccessResponseRefundPayment, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        body: JSON.stringify(payload),
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: this.base_url + 'api/payments/v1/refund'
      }
      const res = await makeRequest<SuccessResponseRefundPayment, DefaultErrorResponse>(reqPayload)
      return res
    } catch (error) {
      throw error;
    }
  }

  /** Get payment info by id */
  async getPaymentInfo(external_id: string): Promise<ApiResponse<SuccessResponseGetInfo, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/payments/v1/info?external_id=' + external_id
      }
      const res = await makeRequest<SuccessResponseGetInfo, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Prepares the data about the specified payment of transaction and sends it into callback_url which was provided on the payment step. If the operation field is not provided the callback will be sent for the last operation. */
  async resendCallback(payload: ResendCallbackPayload): Promise<Response> {
    try {
      const res = await fetch(this.base_url + 'api/payments/v1/callback/resend', {
        headers: {
          Authorization: `Basic ${this.loginCreds}`,
          ContentType: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      })
      
      return res
    } catch (error) {
      throw error
    }
  }

  // ** Customers

  /** Deletes customer payment method from wallet. Either X-CUSTOMER-AUTH header or external_id param is required.  */
  async getCustomerInfo(external_id: string): Promise<ApiResponse<SuccessResponseGetInfo, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/customers/v1/wallet?external_id=' + external_id
      }
      const res = await makeRequest<SuccessResponseGetInfo, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Returns customer details including payment methods, if saved. Either X-CUSTOMER-AUTH header or external_id param is required. */
  async deleteCustomerPaymentFromWallet(external_id: string, paylaod: CreatePaymentPayload): Promise<ApiResponse<SuccessResponseDeleteCustomerPaymentFromWalletPayload, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paylaod),
        method: 'DELETE',
        url: this.base_url + 'api/customers/v1/wallet?external_id=' + external_id
      }
      const res = await makeRequest<SuccessResponseDeleteCustomerPaymentFromWalletPayload, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Adds new payment method to wallet. Either X-CUSTOMER-AUTH header or external_id param is required. */
  async addCustomerToWallet(external_id: string, paylaod: AddCustomerToWalletPayload): Promise<ApiResponse<SuccessResponseAddCustomerToWalletPayload, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paylaod),
        method: 'POST',
        url: this.base_url + 'api/customers/v1/wallet?external_id=' + external_id
      }
      const res = await makeRequest<SuccessResponseAddCustomerToWalletPayload, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  // ** Subscriptions

  /** Get all plans for the platform */
  async getPlans(platform: string): Promise<ApiResponse<SuccessResponseGetPlans, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/subscriptions/v1/plans?platform=' + platform
      }
      const res = await makeRequest<SuccessResponseGetPlans, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Get one plans for the platform */
  async getPlan(plan_id: string): Promise<ApiResponse<SuccessResponseGetPlan, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/subscriptions/v1/plans/' + plan_id
      }
      const res = await makeRequest<SuccessResponseGetPlan, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Get one plans for the platform */
  async getSubscription(subscription_id: string): Promise<ApiResponse<SuccessResponseGetSubscription, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/subscriptions/v1/subscription/' + subscription_id
      }
      const res = await makeRequest<SuccessResponseGetSubscription, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Get all payments of plan */
  async getSubscriptionPayments(subscription_id: string): Promise<ApiResponse<SuccessResponseGetSubscriptionPayments, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/subscriptions/v1/subscription' + subscription_id + '/payments'
      }
      const res = await makeRequest<SuccessResponseGetSubscriptionPayments, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Get subscriptions for specific customer */
  async getCustomerSubscription(customer_id: string): Promise<ApiResponse<SuccessResponseGetCustomerSubscription, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        url: this.base_url + 'api/subscriptions/v1/customer-subscription?customer_id=' + customer_id
      }
      const res = await makeRequest<SuccessResponseGetCustomerSubscription, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }
  
  /** Create subscription plan */
  async createSubscriptionPlan(paylaod: CreateSubscriptionPlanPayload): Promise<ApiResponse<SuccessResponseCreateSubscriptionPlan, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(paylaod),
        url: this.base_url + 'api/subscriptions/v1/plans'
      }
      const res = await makeRequest<SuccessResponseCreateSubscriptionPlan, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Create subscription */
  async createSubscription(paylaod: CreateSubscriptionPayload): Promise<ApiResponse<SuccessResponseCreateSubscription, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(paylaod),
        url: this.base_url + 'api/subscriptions/v1/subscriptions'
      }
      const res = await makeRequest<SuccessResponseCreateSubscription, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Update specific plan by id */
  async updatePlan(plan_id: string, paylaod: UpdatePlanPayload): Promise<ApiResponse<SuccessMessageResponse, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(paylaod),
        url: this.base_url + 'api/subscriptions/v1/plans/' + plan_id
      }
      const res = await makeRequest<SuccessMessageResponse, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Update specific subscription by id */
  async updateSubscription(subscription_id: string, paylaod: UpdateSubscriptionPayload): Promise<ApiResponse<SuccessMessageResponse, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(paylaod),
        url: this.base_url + 'api/subscriptions/v1/subscription/' + subscription_id
      }
      const res = await makeRequest<SuccessMessageResponse, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }

  /** Deactivate specific plan */
  async deactivatePlan(plan_id: string): Promise<ApiResponse<SuccessMessageResponse, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        url: this.base_url + 'api/subscriptions/v1/plans/' + plan_id
      }
      const res = await makeRequest<SuccessMessageResponse, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }
  
  /** Deactivate specified subscription */
  async deactivateSubscription(subscription_id: string): Promise<ApiResponse<SuccessMessageResponse, DefaultErrorResponse>> {
    try {
      const reqPayload: MakeRequestPayload = {
        headers: {
          'Authorization': `Basic ${this.loginCreds}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        url: this.base_url + 'api/subscriptions/v1/subscription/' + subscription_id
      }
      const res = await makeRequest<SuccessMessageResponse, DefaultErrorResponse>(reqPayload)

      return res
    } catch (error) {
      throw error
    }
  }
}