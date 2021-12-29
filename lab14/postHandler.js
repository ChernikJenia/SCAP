const sql = require('./db');

module.exports = (req, res) => {
    let data = "";

    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(require("fs").readFileSync("./14-01.html"));
        break;
      case "/api/faculties":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .post_Faculties(data.FACULTY, data.FACULTY_NAME)
            .then((records) => {
              res.end(JSON.stringify(data));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/pulpits":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .post_Pulpits(
              data.PULPIT,
              data.PULPIT_NAME,
              data.FACULTY
            )
            .then((records) => {
              res.end(JSON.stringify(data));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/subjects":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .post_Subjects(
              data.SUBJECT,
              data.SUBJECT_NAME,
              data.PULPIT
            )
            .then((records) => {
              res.end(JSON.stringify(data));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/auditoriumstypes":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .post_Auditoriums_Types(
              data.AUDITORIUM_TYPE,
              data.AUDITORIUM_TYPENAME
            )
            .then((records) => {
              res.end(JSON.stringify(data));
            })
            .catch((error) => {
              write_error(res, error, 500);
            });
        });
        break;
      case "/api/auditoriums":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          sql
            .post_Auditoriums(
              data.AUDITORIUM,
              data.AUDITORIUM_NAME,
              data.AUDITORIUM_CAPACITY,
              data.AUDITORIUM_TYPE
            )
            .then((records) => {
              res.end(JSON.stringify(data));
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