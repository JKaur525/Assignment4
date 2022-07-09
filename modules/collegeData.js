const fs = require("fs");
class Data {
	constructor(students, courses) {
		this.students = students;
		this.courses = courses;
	}
}

var dataCollection = null;

module.exports.initialize = function () {
	return new Promise((resolve, reject) => {
		fs.readFile("./data/students.json", "utf8", (err, studentData) => {
			if (err) {
				reject("unable to read students.json");
				return;
			}

			fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
				if (err) {
					reject("unable to read courses.json");
					return;
				}

				dataCollection = new Data(
					JSON.parse(studentData),
					JSON.parse(courseData)
				);
				resolve();
			});
		});
	});
};

module.exports.getAllStudents = function () {
	return new Promise(function (resolve, reject) {
		if (dataCollection.students.length === 0) {
			reject("no results");
		}

		resolve(dataCollection.students);
	});
};

module.exports.getTAs = function () {
	return new Promise(function (resolve, reject) {
		let result = dataCollection.students.filter((s) => s.TA === true);
		if (result.length === 0) {
			reject("no results");
		}
		resolve(result);
	});
};

module.exports.getCourses = function () {
	return new Promise(function (resolve, reject) {
		if (dataCollection.courses.length === 0) {
			reject("no results");
		}

		resolve(dataCollection.courses);
	});
};

module.exports.getStudentsByCourse = function (course) {
	return new Promise(function (resolve, reject) {
		let result = dataCollection.students.filter((s) => s.course == course);
		if (result.length === 0) {
			reject("no results");
		}
		resolve(result);
	});
};

module.exports.getStudentByNum = function (num) {
	return new Promise(function (resolve, reject) {
		let result = dataCollection.students.find((s) => s.studentNum == num);
		if (!result) {
			reject("no results");
		}
		resolve(result);
	});
};

module.exports.addStudent = function (studentData) {
	return new Promise(function (resolve) {
		studentData.TA = studentData.TA ? true : false;
		studentData.studentNum = dataCollection.students.length + 1;
		dataCollection.students.push(studentData);
		resolve();
	});
};
