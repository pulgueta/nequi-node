export type AutomaticPaymentBody = {
  phoneNumber: string;
  code: string;
  value: string;
  token: string;
  [x: string]: unknown;
};

export type AutomaticPaymentResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      ResponseDate: string;
      Status: {
        StatusCode: string;
        StatusDesc: string;
      };
      MessageID: string;
      ClientID: string;
      Destination: {
        ServiceName: string;
        ServiceOperation: string;
        ServiceRegion: string;
        ServiceVersion: string;
      };
    };
    ResponseBody: {
      any: {
        automaticPaymentRS: {
          transactionId: string;
          token: string;
        };
      };
    };
  };
};

export type GetStatusPaymentBody = {
  codeQR: string;
};

export type GetStatusPaymentResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      ResponseDate: string;
      Status: {
        StatusCode: string;
        StatusDesc: string;
      };
      MessageID: string;
      ClientID: string;
      Destination: {
        ServiceName: string;
        ServiceOperation: string;
        ServiceRegion: string;
        ServiceVersion: string;
      };
    };
    ResponseBody: {
      any: {
        getStatusPaymentRS: {
          status: string;
          name: string;
          value: string;
          date: string;
          trnId: string;
          originMoney: [
            {
              name: string;
              pocketType: string;
              value: string;
            }
          ];
          ipAddress: string;
        };
      };
    };
  };
};

export type CreateSubscriptionBody = {
  phoneNumber: string;
  code: string;
  name: string;
};

export type CreateSubscriptionResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      ResponseDate: string;
      Status: {
        StatusCode: string;
        StatusDesc: string;
      };
      MessageID: string;
      ClientID: string;
      Destination: {
        ServiceName: string;
        ServiceOperation: string;
        ServiceRegion: string;
        ServiceVersion: string;
      };
    };
    ResponseBody: {
      any: {
        newSubscriptionRS: {
          token: string;
        };
      };
    };
  };
};

export type GetSubscriptionBody = {
  phoneNumber: string;
  code: string;
  token: string;
};

export type GetSubscriptionResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      ResponseDate: string;
      Status: {
        StatusCode: string;
        StatusDesc: string;
      };
      MessageID: string;
      ClientID: string;
      Destination: {
        ServiceName: string;
        ServiceOperation: string;
        ServiceRegion: string;
        ServiceVersion: string;
      };
    };
    ResponseBody: {
      any: {
        getSubscriptionRS: {
          dateCreated: string;
          name: string;
          status: string;
        };
      };
    };
  };
};

export type ReverseTransactionBody = {
  phoneNumber: string;
  value: string;
  code: string;
  messageId: string;
  type: string;
};

export type ReverseTransactionResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      ResponseDate: string;
      Status: {
        StatusCode: string;
        StatusDesc: string;
      };
      MessageID: string;
      ClientID: string;
      Destination: {
        ServiceName: string;
        ServiceOperation: string;
        ServiceRegion: string;
        ServiceVersion: string;
      };
    };
    ResponseBody: {
      any: {
        reversionRS: {};
      };
    };
  };
};
