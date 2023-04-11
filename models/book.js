import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  author: String,
  description: String,
  image: String,
  link: String,
  id: String,
});

export default mongoose.models.Book || mongoose.model('Book', bookSchema);
