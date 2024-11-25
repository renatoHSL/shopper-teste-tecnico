// TODO: verificar o motivo de nã ficar server.js mas aceitar Server.js
import { server } from './Server.js';
const port = 8080;
try {
    server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port} - mensagem criada`);
    });
}
catch (error) {
    console.error('Failed to start server:', error);
}
