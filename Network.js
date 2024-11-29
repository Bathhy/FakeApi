const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
const students = require('./FakeData');

app.get('/students', (req, res) => {
    res.json(students);
});


app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});


app.post('/students', (req, res) => {
    const newStudent = req.body;
    newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
    students.push(newStudent);
    res.status(201).json(newStudent);
});


app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...req.body };
        res.json(students[studentIndex]);
    } else {
        res.status(404).send('Student not found');
    }
});


app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Student not found');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});
