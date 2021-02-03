const express = require('express');

import agentRouter from '../resources/agents/agents.router';
import levelRouter from '../resources/level/level.router';
import categoryRouter from '../resources/categories/categories.router';
import signlanguageRouter from '../resources/signLanguage/signLanguage.router';

import EmployeeRouter from '../resources/employees/employees.router';
import BusinessRouter from '../resources/business/business.router';

import webRtcRouter from '../resources/merge/webRtc/webRtc.router';
import reviewRouter from '../resources/merge/reviews/reviews.router';
import { protect, signin } from '../utils/auth';

const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api', protect);
    app.use('/agent', agentRouter);


    app.use('/category', categoryRouter);
    app.use('/signlanguage', signlanguageRouter);
    app.use('/level', levelRouter);
    app.use('/employee', EmployeeRouter);
    app.use('/business', BusinessRouter);

    app.use('/webRtc', webRtcRouter);
    app.use('/reviews', reviewRouter);

    app.use(error);
};