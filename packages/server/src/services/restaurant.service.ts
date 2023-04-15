import restaurantModel, { Restaurant } from '../models/restaurant.model';

// CreateUser service
export const createRestaurant = async (input: Partial<Restaurant>) => {
    const restaurant = await fetch(`${process.env.POS}/api/v1/restaurants`, {
        method: 'POST',
        body: JSON.stringify(input),
    })
    if (!restaurant.ok) {
        throw new Error('Restaurant could not be created');
    }
    return await restaurant.json();
};

export const getRestaurant = async (id: string) => {
    return await restaurantModel.findById(id).populate('owner');
}