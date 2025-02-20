import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface IDocuments extends Document {
  _id: string;
  doc_name: string;
  doc_file_name: string;
  status: boolean;
}

const documents = new Schema<IDocuments>(
    {
      doc_name: {type: String},
      doc_file_name: {type: String},
      status: {type: Boolean},
    },
    {
      timestamps: true,
    },
);

const DocumentsSchema = mongoose.model<IDocuments>(
    'documents',
    documents,
);
export {DocumentsSchema};
