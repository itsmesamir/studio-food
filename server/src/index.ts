import config from 'config';
import route from 'route';
import App from 'app';

const port = config.app.port;

const server = new App(route);

server.listen(port);
