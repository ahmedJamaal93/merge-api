const express = require('express');

import agentRouter from '../resources/agents/agents.router';
import levelRouter from '../resources/level/level.router';
import categoryRouter from '../resources/categories/categories.router';
import signlanguageRouter from '../resources/signLanguage/signLanguage.router';
import RolesRouter from '../resources/roles/roles.router';

import EmployeeRouter from '../resources/employees/employees.router';
import userRouter from '../resources/user/user.router';
import BusinessRouter from '../resources/business/business.router';
import testRouter from '../resources/testRotes/test.router';
import paymentFawryRouter from '../resources/payment/fawry/fawry.router';
import paymentPayTabsRouter from '../resources/payment/payTabs/payTabs.router';

import webRtcRouter from '../resources/merge/webRtc/webRtc.router';
import reviewRouter from '../resources/merge/reviews/reviews.router';
import requestServiceRouter from '../resources/merge/request-services/request-services.router';

import blockRouter from '../resources/merge/block/block.router';
import callHistoryRouter from '../resources/merge/callHistory/callHistory.router';
import muteNotificationRouter from '../resources/merge/muteNotification/muteNotification.router';
import reviewServiceRouter from '../resources/merge/reviews/reviews.router';
import siteSettingRouter from '../resources/merge/siteSetting/siteSetting.router';
import speakingLanguageRouter from '../resources/merge/speakingLanguage/speakingLanguage.router';
import userDeviceRouter from '../resources/merge/userDevices/userDevices.router';

const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());

    app.use('/agent', agentRouter);
    app.use('/users', userRouter);


    app.use('/category', categoryRouter);
    app.use('/signlanguage', signlanguageRouter);
    app.use('/level', levelRouter);
    app.use('/employee', EmployeeRouter);
    app.use('/business', BusinessRouter);
    app.use('/roles', RolesRouter);


    app.use('/test', testRouter);

    app.use('/paymentFawry', paymentFawryRouter);
    app.use('/paymentpayTabs', paymentPayTabsRouter);


    app.use('/merge/webRtc', webRtcRouter);
    app.use('/merge/reviews', reviewRouter);
    app.use('/merge/block', blockRouter);
    app.use('/merge/callHistory', callHistoryRouter);
    app.use('/merge/muteNotification', muteNotificationRouter);
    app.use('/merge/requestService', requestServiceRouter);
    app.use('/merge/reviewService', reviewServiceRouter);
    app.use('/merge/siteSetting', siteSettingRouter);
    app.use('/merge/speakingLanguage', speakingLanguageRouter);
    app.use('/merge/userDevices', userDeviceRouter);

    app.use(error);
};