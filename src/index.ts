import { config } from 'dotenv';
config(); // Load Environment Variables
import {server} from "./instances/server";

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}.`);
});

