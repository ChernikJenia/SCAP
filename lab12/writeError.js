const writeError = (errorId, statusCode, message, resp) => {
    resp.writeHead(statusCode, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({
        'error' : errorId,
        'message' : message
    }));
};

const writeSuccess = (message, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.end(message);
}

module.exports = {
    writeError,
    writeSuccess
};