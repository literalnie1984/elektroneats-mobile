interface FetchedClient {
  id: string;
  balance: number;
  created: number;
  deleted: boolean;
  delinquent: boolean;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: any;
    default_payment_method: any;
    footer: any;
    rendering_options: any;
  };
  livemode: boolean;
  metadata: object;
  name: string;
  preferred_locales: Array<any>;
  sources: {
    data: Array<any>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
  subscriptions: {
    data: Array<any>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
  tax_exempt: string;
  tax_ids: {
    data: Array<any>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
}

interface WalletDetails {
  name: string;
  phone: string;
  address: {
    city: string;
    country: string;
    postal_code: string;
    state: string;
  };
}

export { FetchedClient, WalletDetails };
