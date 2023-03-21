import {
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Product {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    price: number;

    @prop({ default: [], type: () => [String] })
    gallery: string[]
}

// Create the user model from the User class
const productModel = getModelForClass<typeof Product>(Product);
export default productModel;
