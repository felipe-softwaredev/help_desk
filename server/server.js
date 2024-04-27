import app from './app.js';
import { sequelize } from './config/config.js';
import Admin from './models/Admin.js';
import Ticket from './models/Ticket.js';
import Response from './models/Response.js';
dotenv.config();

// await sequelize.sync({ force: true });

app.listen(process.env.PORT || 3001, () => {
  console.log('Up an running!');
});
