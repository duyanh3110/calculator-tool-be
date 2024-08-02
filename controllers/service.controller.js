import serviceModel from "../models/service.model.js";

const getServices = async (req, res, next) => {
    const today = new Date();

    try {
        serviceModel
            .find({
                createdAt: {
                    $gte: today.setUTCHours(0, 0, 0, 0),
                    $lte: today.setUTCHours(23, 59, 59, 999),
                },
            })
            .then(function (services) {
                res.status(200).json(services);
            });
    } catch (error) {
        console.log("Error get services ::: ", error);
    }
};

const postServices = async (req, res, next) => {
    const {
        serviceName,
        servicePrice,
        isTimmaCustomer,
        extraName,
        extraPrice,
    } = req.body;
    try {
        const newService = await serviceModel.create({
            serviceName,
            servicePrice,
            isTimmaCustomer,
            extraName,
            extraPrice,
        });

        if (newService) {
            console.log("Service created successfully ::: ", newService);
            res.status(201).json(newService);
        }
    } catch (error) {
        console.log("Error creating service ::: ", error);
    }
};

const deleteServices = async (req, res, next) => {
    const { id } = req.params;

    try {
        await serviceModel.findByIdAndDelete(id);
        console.log("Service deleted successfully");
        res.status(200).send("Service deleted successfully");
    } catch (error) {
        console.log("Delete failed ::: ", error);
    }
};

const ServiceController = { getServices, postServices, deleteServices };

export default ServiceController;
