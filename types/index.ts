export interface ProcessEnv {
  PGUSER: string;
  PGDATABASE: string;
  PGPASSWORD: string;
  PGADMIN_EMAIL: string;
  DB_CONTAINER_NAME: string;
  PG_ADMIN_CONTAINER_NAME: string;
  APP_NAME: string;
  NODE_ENV: "development" | "production";
  EXPRESS_CONTAINER_NAME: string;
  EXPRESS_PORT: number;
  PHONE_NUMBER?: string;
  EMAIL?: string;
  ZOOM?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_MESSAGING_SID?: string;
  TWILIO_NUMBER?: string;
  ELEVATOR_PITCH?: string;
  ELEVATOR_PITCH_EXPANDED?: string;
  APPLICATION_DEVELOPMENT?: string;
  CONTENT_CREATION?: string;
  BRAIN_STORMING?: string;
  APP_DESIGN?: string;
  ANIMATION?: string;
  VIDEOGRAPHY?: string;
  SENDGRID_API_KEY?: string;
}
