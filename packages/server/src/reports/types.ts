export type GetReportsBody = {
  code: string;
  startDate: string;
  endDate: string;
  format: string;
};

export type GetReportsResponse = {
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
    };
    ResponseBody: {
      any: {
        getReportsRS: {
          commerce: string;
          nit: string;
          accountNumber: string[];
          from: string;
          to: string;
          total: string;
          count: string;
          transactions: [
            {
              buyerLastName: string;
              transactionDate: string;
              commerceName: string;
              buyerName: string;
              productChannel: string;
              transactionReference: string;
              messageId: string;
              transactionValue: string;
            }
          ];
        };
      };
    };
  };
};
