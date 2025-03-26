import { VehicleDiagramData } from '@/types/negotiation';

import { CarrierApi } from './carrierApi';

export const negotiationCarrierService = () => {
  const carrierService = new CarrierApi();
  return {
    detailDeliveryAbilityTracking: (id: string) => {
      return carrierService.get<VehicleDiagramData>(`/delivery-ability-item/${id}/operation-tracking`);
    },
    validateSemi(body: { vehicle_diagram_item_id: string; type: string }) {
      return carrierService.post(`/validate-semi_dynamic_info`, body);
    },
    getPrefectures: () => {
      return carrierService.get<any>(`/locations`);
    },
    updateTime: (body: { vehicle_diagram_item_id: string; time_start: string; time_end: string }) => {
      return carrierService.put(`/item/time/${body.vehicle_diagram_item_id}`, {
        departure_time: body.time_start,
        arrival_time: body.time_end,
      });
    },
    updateEmergencyStatus: (body: { vehicle_diagram_item_id: string; emergency_status: string }) => {
      return carrierService.put(`/item/${body.vehicle_diagram_item_id}/emergency`, {
        emergency_status: body.emergency_status,
      });
    },
  };
};
