import app from '../../app'
import config from '../../config'

app.listen(config.app.port, () => {
    console.log(`Web server listening on: ${config.app.port} in ${config.app.mode} mode`);
});