export interface RentalModel {
    id: number,
    carId: number,
    customerId: number,
    userId: number,
    rentDate: Date,
    returnDate: Date | null
}