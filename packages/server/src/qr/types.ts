export type CreateQRBody = {
  code: string;
  value: string;
  [key: string]: unknown;
};

export type CreateQRResponse = {
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
        generateCodeQRRS: {
          codeQR: string;
        };
      };
    };
  };
};

export type GetStatusQRResponse = {
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
            },
          ];
          ipAddress: string;
        };
      };
    };
  };
};

export type RevertQRBody = {
  phoneNumber: string;
  value: string;
  code: string;
  messageId: string;
  type: string;
};

export type RevertQRResponse = {
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
