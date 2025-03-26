import { TransactionApi } from './transactionApi';

export const transOrderService = () => {
  const transOrderService = new TransactionApi();
  return {
    transOrderTracking: (id: string, hour: number) => {
      return transOrderService.post<any>(`/trip/trans_order/${id}/tracking/validate`, {
        range: hour,
      });
    },
    trackingStart: (id: string) => {
      return transOrderService.post<any>(`/trip/trans_order/${id}/tracking/start`);
    },
    trackingEnd: (id: string) => {
      return transOrderService.post<any>(`/trip/trans_order/${id}/tracking/end`);
    },
  };
};
