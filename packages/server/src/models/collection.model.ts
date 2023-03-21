import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

import { Product } from './product.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        enableMergeHooks: true, 
    }
})

export class Collection {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ default: [], type: () => [String] })
    gallery: string[]

    @prop({ ref: Product, default: [], type: [Product] })
    collections: Ref<Product>[]
}

// Create the user model from the User class
const collectionModel = getModelForClass<typeof Collection>(Collection);
export default collectionModel;
