interface Rides {
  id?: number
  customer_id: number
  driver_id: number
  origin: string
  destination: string
  distance: number
  duration: string
  value: number
  date_time?: Date
}

export default Rides
