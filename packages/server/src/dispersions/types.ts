export type CreateDispersionBody = {
  code: string;
  trackingID: string;
  phoneNumber: string;
  value: string;
  [x: string]: unknown;
};

export type CreateDispersionResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      RequestDate: string;
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
      any: {};
    };
  };
};

export type ReverseDispersionBody = {
  code: string;
  trackingID: string;
  phoneNumber: string;
  value: string;
  [x: string]: unknown;
};

export type ReverseDispersionResponse = {
  ResponseMessage: {
    ResponseHeader: {
      Channel: string;
      RequestDate: string;
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
      any: {};
    };
  };
};
