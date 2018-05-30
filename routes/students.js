var express = require('express');
var router = express.Router();
var students = require("../db");

function makeId () {
    return students[students.length - 1].id + 1
}


router.get('/', function(req, res, next) {
  res.send(students);
});

router.get('/:id', function(req, res, next) {
    var id = Number(req.params.id);
    var result = students.filter((student) => {
      return student.id === id;
    });
    res.send(result);
});

router.delete('/:id', function(req, res, next) {
    var id = Number(req.params.id);
    var index = students.indexOf(students.filter((student) => {
      student.id === id;
    }));
    students.splice(index, 1);
    res.send();
});

router.post('/', function (req, res, next) {
    students.push({ ...req.body, id: makeId() });
    res.send(students);
});

router.put('/:id', function (req, res, next) {
    var editStudent;
    var id = Number(req.params.id);
    students = students.map((stud) => {
        if(stud.id === id) {
            stud = { ...req.body, id: stud.id };
            editStudent = stud;
        }
        return stud;
    });
    res.send(editStudent)
});

module.exports = router;


