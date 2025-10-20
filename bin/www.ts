import http from 'http';
import {app} from '../app';

const port = process.env.PORT || 3000;
app.set('port',port);

const serve:any = http.createServer(app);

serve.listen(port,() => {
    console.log(`Server running on port ${port}`);
})
