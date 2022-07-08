import app from './app.js';
import connectToDb from './connect.js';

connectToDb();

app.listen(5555, () => {
  console.log('Server is running on port 5555');
});
