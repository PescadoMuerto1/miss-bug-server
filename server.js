import express from 'express'
import { bugService } from './services/bug.service.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())


app.get('/', (req, res) => res.send('Hello there'))
app.listen(3031, () => console.log('Server ready at port 3031'))

app.get('/api/bug', (req, res) => {
    // console.log('req.query:', req.query)
    const filterBy = {
        txt: req.query.txt,
        severity: +req.query.severity,
        label: req.query.label,
        sortBy: req.query.sortBy,
        sortDir: +req.query.sortDir,
        pageIdx: req.query.pageIdx
    }
    // console.log('filterBy:', filterBy)
    bugService.query(filterBy)
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error('Cannot get cars', err)
            res.status(400).send('Cannot get cars')
        })
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
    const bugId = req.params.bugId
    let visitedBugs = req.cookies.visitedBugs || []

    if (visitedBugs.length >= 3) return res.status(401).send('Wait for a bit')
    if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)

    res.cookie('visitedBugs', visitedBugs, { maxAge: 7 * 1000 })
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error(err)
            res.status(400).send('Cannot get bug')
        })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const bugId = req.params.bugId
    bugService.remove(bugId)
        .then(() => res.send(bugId))
        .catch((err) => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})