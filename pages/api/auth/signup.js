import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler.post(createUser);

async function createUser(req, res) {
  try {
    await dbConnect();
    const { email } = req.body;
    const query = User.where({ email: email });
    const user = await query.findOne();
    if (user) {
      res.status(400).json({
        message: 'You already have an account with this email.',
      });
    } else {
      await User.create(req.body);
      res.status(200).json({ message: 'You are successfully signed up.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
