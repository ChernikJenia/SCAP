const url = require("url");
const sql = require('./db');

const DELETE_handler = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_mas = path.split("/");
    switch ("/api/" + path_mas[2]) {
      case "/api/faculties":
        res.writeHead(200, { "Content-Type": "text/plain" });
        sql
          .delete_Faculties(path_mas[3])
          .then((records) => {
            res.end("deleted");
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
        break;
      case "/api/pulpits":
        res.writeHead(200, { "Content-Type": "text/plain" });
        sql
          .delete_Pulpits(path_mas[3])
          .then((records) => {
            res.end("deleted");
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
        break;
      case "/api/subjects":
        res.writeHead(200, { "Content-Type": "text/plain" });
        sql
          .delete_Subjects(path_mas[3])
          .then((records) => {
            res.end("deleted");
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
        break;
      case "/api/auditoriumstypes":
        res.writeHead(200, { "Content-Type": "text/plain" });
        sql
          .delete_Auditoriums_Types(path_mas[3])
          .then((records) => {
            res.end("deleted");
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
        break;
      case "/api/auditoriums":
        res.writeHead(200, { "Content-Type": "text/plain" });
        sql
          .delete_Auditoriums(path_mas[3])
          .then((records) => {
            res.end("deleted");
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
        break;
      default:
        write_error(res, "Not found", 404);
        break;
    }
  };

  module.exports = {
      DELETE_handler
  }
  