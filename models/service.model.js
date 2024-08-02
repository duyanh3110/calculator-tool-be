import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Service";
const COLLECTION_NAME = "Service";

const serviceSchema = new Schema(
    {
        serviceName: {
            type: String,
            required: true,
            index: true,
        },
        servicePrice: {
            type: Schema.Types.Decimal128,
            required: true,
        },
        isTimmaCustomer: {
            type: Schema.Types.Boolean,
            required: true,
        },
        extraPrice: {
            type: Schema.Types.Decimal128,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

serviceSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.servicePrice = ret.servicePrice.toString();
        ret.extraPrice = ret.extraPrice.toString();
        return ret;
    },
});

export default model(DOCUMENT_NAME, serviceSchema);
