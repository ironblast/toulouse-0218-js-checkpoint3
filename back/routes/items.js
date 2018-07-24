const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
  db.query('SELECT * FROM items', (err, items) => {
    if (err) {
      return res.status(500).json({error: 'La base de donnée a fondue'})
    }
    res.json(items)
  })  
})

router.post('/', (req, res) => {
  const { name, picture } = req.body
  const query = 'INSERT INTO items (name, picture) VALUE (?, ?)'
  db.query(query, [name, picture], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({error: `Tu l'as dans l'os mon ami`})
    }
    db.query('SELECT * FROM items WHERE id = ?', [result.insertId], (err, items) => {
      if (err) {
        console.error(err)
        return res.status(500).json({error: `Tu l'as dans l'os mon ami`})
      }
      res.json(items[0])
    })    
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const query = 'DELETE FROM items WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if(err) {
      console.error(err)
      return res.status(500).json({error: `Ca fait mal hein?`})
    }
    res.json(result)
  })
})

module.exports = router
