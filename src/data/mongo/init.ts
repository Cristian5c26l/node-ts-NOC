import mongoose from "mongoose";


interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {
  
  static async connect( options: ConnectionOptions ) {
    
    const {mongoUrl, dbName} = options;
   
    // Intentar conectarse a la base de datos, que puede estar arriba o no
    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      // console.log('Mongo connected!');
      return true;
    } catch (error) {
      // console.log('Mongo connection error');
      throw error;// Un throw detiene inmediatamente la ejecucion de mi aplicacion.
    }

  }

}
