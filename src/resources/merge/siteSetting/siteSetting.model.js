import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
    general: {
        site_title: {
            type: String,
        },
        banner_text: {
            type: String,
        },
        footer_text: {
            type: String,
        },
        android_store: {
            type: String,
        },
        ios_store: {
            type: String,
        },
        facebook_link: {
            type: String,
        },
        twitter_link: {
            type: String,
        },
        google_link: {
            type: String,
        },
        banner_image: {
            type: String,
        },
        logo: {
            type: String,
        },


        about_text: {
            type: String,
        }
    },

    privacy: {

    },
    mobile_app: {
        android_version: {
            type: String,
        },
        android_update: {
            type: Number,
            default: 0
                /* for force update "1" */
        },
        ios_version: {
            type: String,
        },
        ios_update: {
            type: Number,
            default: 0
                /* for force update "1" */
        },
        app_id: {
            type: String,
        },
        app_key: {
            type: String,

        },
    },
    notifaction: {
        mail_driver: {
            type: String
        },
        mail_host: {
            type: String,
        },
        mail_port: {
            type: String,
        },
        mail_username: {
            type: String,
        },
        mail_password: {
            type: String,
        },
        mail_encryption: {
            type: String,
        },
        fcm_key: {
            type: String,
        },

        send_details: {
            from_name: { type: String },
            from_email: { type: String },
        },
        facebook: {
            app_id: { type: String },
            secret_key: { type: String },
            callback: { type: String },
            isActive: { type: Boolean }
        },
        twitter: {
            app_id: { type: String },
            secret_key: { type: String },
            callback: { type: String },
            isActive: { type: Boolean }
        },
        google: {
            app_id: { type: String },
            secret_key: { type: String },
            callback: { type: String },
            isActive: { type: Boolean }
        },

    },
    seo: {
        meta_title: {
            type: String,
        },
        meta_description: {
            type: String,
        },
        meta_url: {
            type: String,
        },
        meta_image: {
            type: String,
        }
    },
    terms: {

    },
    Services: {
        name: {
            type: String,
        },
        link: {
            type: String,
        },
        obj: {
            key: { type: String },
            token: { type: String },
            session: { type: String },
        }
    },

}, { collection: 'sitesettings' }, { timestamps: true });

export const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);