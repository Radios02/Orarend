//import oradata from '../data/oradata.js'
import { dbAll, dbGet, dbRun } from '../util/database.js'

export const getAllOrarend = async(req, res) => {
    const sql = "SELECT * FROM lessons"
    const oradata = await dbAll(sql)
    res.status(200).json(oradata)
}
export const getOrarendById = async(req, res) => {
    const sql = "SELECT * FROM lessons WHERE id = ?"
    const oradata = await dbGet(sql, [req.params.id])
    const id = req.params.id
    if (id < 0 || id >= oradata.length) {
      return res.status(404).json({messege: 'Orarend not found'})
    }
    res.status(200).json(oradata[id])
}
export const createOrarend = async(req, res) => {
    const sql = "INSERT INTO lessons (day, classesnumber, classessubject) VALUES (?, ?, ?)"
    const oradata = await dbRun(sql, [req.body.day, req.body.classesnumber, req.body.classessubject])
    const{author, title, year} = req.body
    if (!author || !title || !year) {
      return res.status(400).json({messege: 'Missing data'})
    }
    const newOrarend = {author, title, year}
    oradata.push(newOrarend)
    res.status(201).json(newOrarend)
}
export const updateOrarend = async(req, res) => {
    const sql = "UPDATE lessons SET day = ?, classesnumber = ?, classessubject = ? WHERE id = ?"
    const oradata = await dbRun(sql, [req.body.day, req.body.classesnumber, req.body.classessubject, req.params.id])
    const id = req.params.id
    if (id < 0 || id >= oradata.length) {
      return res.status(404).json({messege: 'Orarend not found'})
    }
    const{author, title, year} = req.body
    if (!author || !title || !year) {
      return res.status(400).json({messege: 'Missing data'})
    }
    oradata[id] = req.author, req.title, req.year
    res.status(200).json(oradata[id])
}
export const deleteOrarend = async(req, res) => {
    const sql = "DELETE FROM lessons WHERE id = ?"
    const oradata = await dbRun(sql, [req.params.id])
    const id = req.params.id
    if (id < 0 || id >= oradata.length) {
      return res.status(404).json({messege: 'Orarend not found'})
    }
    oradata.splice(id, 1)
    res.status(200).json({messege: 'Orarend deleted'}) 
}