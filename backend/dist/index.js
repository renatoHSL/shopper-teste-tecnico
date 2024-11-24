import { app } from './Server.js';
const port = 8080;
try {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port} - mensagem criada`);
    });
}
catch (error) {
    console.error('Failed to start server:', error);
}
