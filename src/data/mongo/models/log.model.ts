import mongoose from "mongoose";
/*
 level: LogSeverityLevel;
  message: string;
  timestamp?: Date;// timestamp es opcional. Si se recibe, se establece en la instancia de LogEntity, si no se recibe, se establece en la fecha actual
  origin: string;
 * */


const logSchema = new mongoose.Schema({
  message: {
    type: String, 
    required: true
  },
  origin: {
    type: String
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  timestamp: {
    type: Date,
    default: new Date()// valor que toma "timestamp" en caso de no ser proporcionado.
  },
});

export const LogModel = mongoose.model('Log', logSchema);// Nombre de la conleccion: Log(s) (Logs)
