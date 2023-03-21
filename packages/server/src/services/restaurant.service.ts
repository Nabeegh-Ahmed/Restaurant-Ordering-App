import restaurantModel, { Restaurant } from '../models/restaurant.model';

// CreateUser service
export const createRestaurant = async (input: Partial<Restaurant>) => {
    const restaurant = await restaurantModel.create(input);
    return restaurant.toJSON();
};

export const getRestaurant = async (id: string) => {
    return await restaurantModel.findById(id).populate('owner');
}