import {
    getModelForClass,
    modelOptions,
    mongoose,
    prop,
} from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Blog {
    @prop()
    title: string;

    @prop({ ref: 'User', required: true, type: mongoose.Types.ObjectId })
    author: mongoose.Types.ObjectId

    @prop({ required: true })
    photo: string;

    @prop({ required: true })
    content: string;
}

const blogModel = getModelForClass<typeof Blog>(Blog);
export default blogModel;
