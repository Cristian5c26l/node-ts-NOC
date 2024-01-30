
// const name: string = 'Cristian';// Aqui, se marca el error Cannot redeclare block-scoped variable 'name'.ts(2451) porque name no se debe usar en un scope global, es decir, lo que era la propiedad name que venia en el objeto global ya no está en dicho objeto. Ya no se debe de usar name. Para quitar el error, simplemente colocar export
//export const name: string = 'Cristian';//

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo" 
import { Server } from "./presentation/server";
// import 'dotenv/config';// Para que se pueda leer el archivo .env

// console.log('Hola mundo! Me llamo ' + name);//


// Funcion anonima autoinvocada o autoejecutable que puede ser asincrona si deseo

(async() => {
  main();
})();

async function main() {
  

  // Conexion a base de datos llamada NOC (envs.MONGO_DB_NAME) servida en el puerto 27017 de mi PC (localhost). Existirá conexion aunque no exista
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  }); 

  
  // Insercion de un log con prisma
  // const prisma = new PrismaClient();
  //
  // const firstNewLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Test Message... First Log created by Prisma',
  //     level: 'HIGH',
  //     origin: 'App.ts',
  //
  //   }
  // });
  // 
  // console.log({ firstNewLog });
  // 
  //
  // // Insercion de otro log
  // const secondNewLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Test Message... Second Log created by Prisma',
  //     level: 'HIGH',
  //     origin: 'App.ts',
  //
  //   }
  // });
  //
  // console.log({ secondNewLog });
  //
  // // Insercion de otro log
  // 
  // const thirdNewLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Test Message... Third Log created by Prisma',
  //     level: 'MEDIUM',
  //     origin: 'App.ts',
  //
  //   }
  // });
  //
  // console.log({ thirdNewLog });
  //
  // // Obtener los logs por nivel de severidad Medium 
  // 
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'MEDIUM'
  //   }
  // });// esto es equivalente a select * from LogModel where level='Medium';
  //
  // console.log({logs});
  

  // En mongo, coleccion es como una tabla, y documento es como un registro que va a dicha tabla 
  
  // Creación de documento con forma LogModel para que se grabe en coleccion "Logs" 
  // const newLog = await LogModel.create({
  //   message: 'Test Message desde Mongo',
  //   origin: 'App.ts',
  //   level: 'low',
  // });
  // 
  // // Para grabar esa insercion de dicho documento en colección Logs, es necesario ejecutar el metodo save.
  // await newLog.save();
  //
  // console.log(newLog);
  
  // Obtener todos los registros de la coleccion logs ubicada en la base de datos NOC
  // const logs = await LogModel.find();
  // console.log(logs);
  // 
  //
  Server.start();
  //console.log( process.env.PORT );// Imprime el valor de la variable de entorno PORT (localizada en el archivo .env, cargada en el objeto process.env)
  // console.log( envs.PORT );// Imprime el valor de la variable de entorno PORT (localizada en el archivo .env, cargada en el objeto process.env POR import 'dotenv/config' y validada por env-var)
  // console.log( envs.MAILER_EMAIL );
  // console.log( envs.MAILER_SECRET_KEY );
  // console.log( envs.PROD );
}
