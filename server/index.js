const server = require('./app');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})