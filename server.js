import express from 'express'
import { bugService } from './services/bug.service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))
app.listen(3030, () => console.log('Server ready at port 3030'))

app.get('/api/bug', (req, res) => {
    bugService.query()
    .then(bugs => res.send(bugs))
})

app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        desc: req.query.desc,
        severity: +req.query.severity,
        createdAt: +req.query.createdAt,
    }

    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})

app.get('/api/bug/:bugId', (req, res) => {

    bugService.getById(req.params.bugId)
    .then(bug => res.send(bug))
    .catch(err => {
        // loggerService.error(err)
        res.status(400).send('Cannot get bug')
    })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const bugId = req.params.bugId
    bugService.remove(bugId)
    .then(() => res.send(bugId))
    .catch((err) => {
        // loggerService.error('Cannot remove bug', err)
        res.status(400).send('Cannot remove bug')
    })
})