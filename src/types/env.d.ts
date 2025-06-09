declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        MAIL_PASSWORD: string;
        MAIL_ORIGIN: string;
        MAIL_DESTINY: string;
        SERVICE: string;
    }
}
