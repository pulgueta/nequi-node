export type CreatePaymentPushBody = {
  phoneNumber: string;
  code: string;
  value: string;
  reference1: string;
  reference2: string;
  reference3: string;
};

export type CreatePaymentPushResponse = {
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
        unregisteredPaymentRS: {
          transactionId: string;
        };
      };
    };
  };
};

export type CancelUnregisteredPaymentBody = {
  code: string;
  phoneNumber: string;
  transactionId: string;
};

export type CancelUnregisteredPaymentResponse = {
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
        cancelRequestMoneyRS: {};
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

export type RevertTransactionBody = {
  phoneNumber: string;
  value: string;
  code: string;
  messageId: string;
  type: string;
};

export type RevertTransactionResponse = {
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
