export interface ReservationResponse {
    reservations: Reservation[];
}

export interface Reservation {
    id:               number;
    startDate:        string;
    endDate:          string;
    requerimiento:    string;
    cantidad_persona: number;
    descripcion:      string;
    state:            string;
    userId:           number;
    salonId:          number;
}
 


export interface ReservationResponse2 {
  reservation: Reservation
}