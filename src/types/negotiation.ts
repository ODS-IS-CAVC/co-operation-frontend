/* eslint-disable no-unused-vars */
export enum StatusVehicleDiagram {
  NORMAL = 0,
  ERROR = 1,
  FINISH = 2,
}

export interface VehicleDiagramItemTracking {
  operation_date: string; // YYYYMMDD format
  operation_time: string; // HHMMSS format
  status: StatusVehicleDiagram;
  label: string;
  message: string;
}

export interface CutOffPrice {
  [key: string]: number | undefined;
}

export interface VehicleTripItemTrailer {
  id: number;
  vehicle_diagram_allocation_id: number;
  freight_rate_type: number;
  day: string;
  trip_name: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  status: number;
  cut_off_price: CutOffPrice;
  mobility_hub_id: number | null;
  valid_from: string;
  valid_until: string;
  matching_count: number;
  matching_status: string;
  order_status: string;
  total_count: string;
}

export interface VehicleInfo {
  images: string[];
  id: number;
  registration_area_code: string;
  registration_group_number: string;
  registration_character: string;
  registration_number_1: string;
  registration_number?: string;
  registration_number_2: string;
  vehicle_code: string;
  vehicle_name: string;
  vehicle_type: number;
  vehicle_size: number;
  temperature_range: number[];
  max_payload: number;
  total_length: number;
  total_width: number;
  total_height: number;
  ground_clearance: number;
  door_height: number;
  body_specification: string;
  body_shape: string;
  body_construction: string;
  status: number;
  delete_flag: number;
}

export interface VehicleDiagramAllocation {
  vehicle_info: VehicleInfo;
  vehicle_type: number;
  display_order: number;
  assign_type: number;
  id: number;
}

export interface VehicleDiagramData {
  id: number;
  operator_id: string;
  vehicle_diagram_id: number | null;
  day: string;
  trip_name: string;
  departure_time: string;
  arrival_time: string;
  price: number | null;
  departure_from: number;
  arrival_to: number;
  sip_track_id: string
  vehicle_diagram_item_tracking: VehicleDiagramItemTracking[];
  vehicle_diagram_item_trailer: VehicleTripItemTrailer[];
  vehicle_diagram_allocations: VehicleDiagramAllocation[];
}
