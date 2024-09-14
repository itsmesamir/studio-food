import App from 'app';
import config from 'config';
import route from 'route';

const port = config.app.port;

const server = new App(route);

server.listen(port);
