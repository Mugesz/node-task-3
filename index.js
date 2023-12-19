const express = require("express");

const app = express();

const mentors = [];
const students = [];

app.get("/mentors", (req, res) => {
  res.json(mentors);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/mentor:id", (req, res) => {
  let id = req.params.id;
  const mentor = mentors.find((mentors) => mentors.id === req.params.id);
  if (mentor) {
    res.json(mentor);
  } else {
    res.status(404).json({ message: "mentor not found" });
  }
});

app.get("/student:id", (req, res) => {
  let id = req.params.id;
  const student = students.find((student) => student.id === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "student not found" });
  }
});

app.post("/mentors", (req, res) => {
  req.body.id = mentors.length + 1;
  mentors.push(req.body);
  res.json({ message: "created sucessfully " });
});

app.post("/students", (req, res) => {
  req.body.id = students.length + 1;
  students.push(req.body);
  res.json({ message: "created sucessfully " });
});

app.post("/assign", (req, res) => {
  const { mentorId, studentId } = req.body;
  const mentor = mentors.find((mentor) => mentor.id === mentorId);
  const student = students.find((student) => student.id === studentId);

  if (mentor && student) {
    student.mentorId = mentorId;
    res.json({
      success: true,
      message: `Student ${student.name} assigned to ${mentor.name}`,
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid mentor or student ID" });
  }
});

app.get("/assign", (req, res) => {
  const { mentorId, studentId } = req.body;
  const mentor = mentors.find((mentor) => mentor.id === mentorId);
  const student = students.find((student) => student.id === studentId);

  if (mentor && student && !student.mentorId) {
    student.mentorId = mentorId;
    res.json({
      success: true,
      message: `Student ${student.name} assigned to Mentor ${mentor.name}`,
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid mentor or student ID" });
  }
});

app.get("/studentsForMentor/:mentorId", (req, res) => {
  const mentorId = req.params.mentorId;
  const mentor = mentors.find((mentor) => mentor.id === mentorId);

  if (mentor) {
    const studentsForMentor = students.filter(
      (student) => student.mentorId === mentorId
    );
    res.json(studentsForMentor);
  } else {
    res.status(404).json({ message: "Mentor not found" });
  }
});

app.get("/previousMentor/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const student = students.find((student) => student.id === studentId);

  if (student && student.mentorId) {
    const previousMentor = mentors.find(
      (mentor) => mentor.id === student.mentorId
    );
    res.json(previousMentor);
  } else {
    res.status(404).json({ message: "Student or previous mentor not found" });
  }
});

app.listen(5000);
