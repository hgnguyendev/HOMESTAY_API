import bunyan from 'bunyan';
import dotenv from 'dotenv';

dotenv.config();

const log = {
    development: () => bunyan.createLogger({ name: 'manage-homestay-api-development', level: 'debug' }),
    test: () => bunyan.createLogger({ name: 'manage-homestay-api-test', level: 'fatal' }),
}

const sysConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,

    mongodb_uri: process.env.MONGODB_URI,

    bodyParserUrlencodedLimit: process.env.BODY_PARSER_URLENCODED_LIMIT,
    bodyParserJsonLimit: process.env.BODY_PARSER_JSON_LIMIT,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    tmn_code: process.env.TMN_CODE,
    vnp_hashsecret: process.env.VNP_HASHSECRET,
    vnp_url: process.env.VNP_URL,
    vnp_url_return: process.env.VNP_URL_RETURN,

    log: (env?: keyof typeof log) => {
        if (env && log[env]) return log[env]();
        return log.development();
    }
}

export default sysConfig;