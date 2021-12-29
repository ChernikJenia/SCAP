const sql = require('./db');

const PUT_handler = (req, res) => {
    let data_json = "";
    console.log(req.url);
    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(require("fs").readFileSync("./14-01.html"));
        break;
      case "/api/faculties":
        req.on("data", (chunk) => {
          data_json += chunk;
        });
        req.on("end", () => {
          data_json = JSON.parse(data_json);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .put_Faculties(data_json.FACULTY, data_json.FACULTY_NAME)
            .then((records) => {
              res.end(JSON.stringify(data_json));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/pulpits":
        req.on("data", (chunk) => {
          data_json += chunk;
        });
        req.on("end", () => {
          data_json = JSON.parse(data_json);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .put_Pulpits(
              data_json.PULPIT,
              data_json.PULPIT_NAME,
              data_json.FACULTY
            )
            .then((records) => {
              if (records.rowsAffected[0] > 0) {
                res.end(JSON.stringify(data_json));
              } else {
                write_error(res, "0 row affected", 500);
              }
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/subjects":
        req.on("data", (chunk) => {
          data_json += chunk;
        });
        req.on("end", () => {
          data_json = JSON.parse(data_json);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .put_Subjects(
              data_json.SUBJECT,
              data_json.SUBJECT_NAME,
              data_json.PULPIT
            )
            .then((records) => {
              res.end(JSON.stringify(data_json));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/auditoriumstypes":
        req.on("data", (chunk) => {
          data_json += chunk;
        });
        req.on("end", () => {
          data_json = JSON.parse(data_json);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .put_Auditoriums_Types(
              data_json.AUDITORIUM_TYPE,
              data_json.AUDITORIUM_TYPENAME
            )
            .then((records) => {
              res.end(JSON.stringify(data_json));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/auditoriums":
        req.on("data", (chunk) => {
          data_json += chunk;
        });
        req.on("end", () => {
          data_json = JSON.parse(data_json);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .put_Auditoriums(
              data_json.AUDITORIUM,
              data_json.AUDITORIUM_NAME,
              data_json.AUDITORIUM_CAPACITY,
              data_json.AUDITORIUM_TYPE
            )
            .then((records) => {
              res.end(JSON.stringify(data_json));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      default:
        write_error(res, "Not found", 404);
        break;
    }
  };

  module.exports = {
      PUT_handler
  }