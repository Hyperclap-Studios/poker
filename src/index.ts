import { config } from 'dotenv';
config(); // Load Environment Variables
import {app} from "./instances/server";



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}.`);
});

