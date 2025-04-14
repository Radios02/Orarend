import sqlite from "sqlite3"

const db = new sqlite.Database("./data/database.sqlite")

function dbAll(sql, params = []){
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err){reject(err)}
            else {resolve(rows)}
        })
    })
}

function dbGet(sql, params = []){
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err){reject(err)}
            else {resolve(row)}
        })
    })
}

function dbRun(sql, params = []){
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err){reject(err)}
            else {resolve(this)}
        })
    })
}

async function initializeDb(){
    await dbRun("drop table if exists lessons")
    await dbRun("Create table if not exists lessons (id integer primary key autoincrement, day string, classesnumber integer, classessubject string)")
    const lessons = [
        {
            day: "Monday",
            classes: [
              { number: 1, subject: "Math" },
              { number: 2, subject: "English" },
              { number: 3, subject: "Physics" },
            ],
          },
          {
            day: "Tuesday",
            classes: [
              { number: 1, subject: "History" },
              { number: 2, subject: "Biology" },
              { number: 3, subject: "Chemistry" },
            ],
          },
          {
            day: "Wednesday",
            classes: [
              { number: 1, subject: "Geography" },
              { number: 2, subject: "Math" },
              { number: 3, subject: "English" },
            ],
          },
          {
            day: "Thursday",
            classes: [
              { number: 1, subject: "Physics" },
              { number: 2, subject: "History" },
              { number: 3, subject: "Biology" },
            ],
          },
          {
            day: "Friday",
            classes: [
              { number: 1, subject: "Chemistry" },
              { number: 2, subject: "Geography" },
              { number: 3, subject: "Math" },
            ],
          },
    ]
    for (const lesson of lessons){
        for (const classItem of lesson.classes){
            await dbRun(`insert into lessons (day, classesnumber, classessubject) 
                values (?, ?, ?)`, 
                [lesson.day, classItem.number, classItem.subject])
        }
    }

}

export { dbAll, dbGet, dbRun, initializeDb }