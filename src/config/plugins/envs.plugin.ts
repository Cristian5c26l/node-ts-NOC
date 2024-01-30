import 'dotenv/config';// Leer las variables de entorno del archivo .env para que se agreguen a process.env (process.env.VARIABLE_1, process.env.VARIABLE_2, etc)

import * as env from 'env-var';// Librería para validar las variables de entorno

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(), 
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  PROD: env.get('PROD').required().asBool(),

  // Mongo DB 
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME:env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASS: env.get('MONGO_PASS').required().asString(),
}
// env.get('PORT') => Obtiene el valor de la variable de entorno PORT (process.env.PORT)
// .required() => Indica que la variable de entorno es requerida
// .asPortNumber() => Indica que el valor de la variable de entorno debe ser un número de puerto. Con asPortNumber queda bastante claro que nos referimos a un numero de puerto lo que debe de estart en la variable de entorno PORT
