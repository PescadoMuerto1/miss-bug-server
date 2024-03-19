import fs from 'fs'

import { utilService } from "./utils.service.js"

export const bugService = {
    query,
    save,
    getById,
    remove
}

const bugs = utilService.readJsonFile('data/bug.json')

function query(filterBy) {
    console.log(filterBy);
    let bugToReturn = bugs
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        bugToReturn = bugToReturn.filter(bug => regex.test(bug.title))
    }
    if (filterBy.severity) {
        bugToReturn = bugToReturn.filter(bug => bug.severity >= filterBy.severity)
    }
    if (filterBy.label) {
        bugToReturn = bugToReturn.filter(({ labels }) => labels.includes(filterBy.label))
    }
    // console.log(bugToReturn);
    return Promise.resolve(bugToReturn)
}

function save(bug) {
    if (bug._id) {
        const bugIdx = bugs.findIndex(_bug => _bug._id === bug._id)
        bugs[bugIdx] = bug
    }
    else {
        bug._id = utilService.makeId()
        bug.createdAt = Date.now()
        bugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)
}

function getById(id) {
    const bug = bugs.find(bug => bug._id === id)
    if (!bug) return Promise.reject('bug does not exist!')
    return Promise.resolve(bug)
}

function remove(id) {
    const bugIdx = bugs.findIndex(bug => bug._id === id)
    if (bugIdx < 0) return Promise.reject('bug does not exist')
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function _saveBugsToFile() {

    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        })
    })
}