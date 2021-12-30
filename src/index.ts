import { config } from 'dotenv';
import {app} from "./instances/server";

// Load Environment Variables
config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}.`);
});