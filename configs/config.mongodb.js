import "dotenv/config";

const config = {
    app: {
        port: process.env.PROD_APP_PORT || 3000,
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        url: process.env.DB_URL,
        appName: process.env.DB_APP,
    },
};

export default config;
