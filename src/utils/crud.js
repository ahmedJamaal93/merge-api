const asyncHandler = require('../middleware/async');
export const getOne = model => async(req, res) => {
    try {
        const doc = await model
            .findOne({
                _id: req.params.id
            })
            .lean()
            .exec();

        if (!doc) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const getManyPaging = model =>
    asyncHandler(async(req, res, next) => {
        res.status(200).json(res.advancedResults);
    });

export const getMany = model => async(req, res) => {
    try {
        const docs = await model
            .find({})
            //  .lean()
            // .exec()
            .limit(100);
        // .pretty()
        if (!docs) {
            return res.status(400).send({ message: 'No Data Found.' });
        }
        console.log(docs);
        res.status(200).json({
            data: docs
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const getCount = model => async(req, res) => {
    try {
        const docs = await model.find({}).count();

        res.status(200).json({
            data: docs
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const createOne = model => async(req, res) => {
    try {
        const doc = await model.create({
            ...req.body,

        });
        res.status(201).json({
            data: doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const updateOne = model => async(req, res) => {
    try {
        const updatedDoc = await model
            .findOneAndUpdate({
                    //  createdBy: req.user._id,
                    _id: req.params.id
                },
                req.body, {
                    new: true
                }
            )
            .lean()
            .exec();

        if (!updatedDoc) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: updatedDoc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const removeOne = model => async(req, res) => {
    try {
        const removed = await model.findOneAndRemove({
            //createdBy: req.user._id,
            _id: req.params.id
        });

        if (!removed) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        return res.status(200).json({
            data: removed
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const filterByLeader = model => async(req, res) => {
    try {
        const doc = await model
            .find({
                leader_id: req.params.id
            })
            .lean()
            .exec();

        if (!doc) {
            res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
export const createOneIfNotFound = model => async(req, res) => {
    try {
        const item = await model
            .findOne({});

        if (!item) {
            const doc = await model.create({
                ...req.body,

            });
            res.status(200).send(doc);
        } else {
            const updatedDoc = await model
                .findOneAndUpdate({
                        //rs  createdBy: req.user._id,
                        _id: item._id
                    },
                    req.body, {
                        new: true
                    }
                )
                .lean()
                .exec();

            res.status(200).json(
                updatedDoc
            );

        }


    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getAssets: getManyPaging(model),
    getOne: getOne(model),
    createOne: createOne(model),
    createOneIfNotFound: createOneIfNotFound(model),
    filterByLeader: filterByLeader(model),
    getCount: getCount(model)
});