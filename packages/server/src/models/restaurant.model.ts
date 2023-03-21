import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Collection } from './collection.model';
import { User } from './user.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Restaurant {
    @prop({ required: true })
    name: string;

    @prop({ unique: true, required: true })
    username: string;

    @prop({ required: true })
    description: string;

    @prop({ default: [], type: () => [String] })
    gallery: string[]

    @prop({ ref: 'User', required: true, type: mongoose.Types.ObjectId })
    owner: mongoose.Types.ObjectId

    @prop({ ref: Collection, default: [], type: [Collection] })
    collections: Ref<Collection>[]
}

// Create the user model from the User class
const restaurantModel = getModelForClass<typeof Restaurant>(Restaurant);
export default restaurantModel;
