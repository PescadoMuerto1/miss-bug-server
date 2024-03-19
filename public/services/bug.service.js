
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getFilterFromParams
}


function query(filterBy = getDefaultFilter()) {
    return axios.get(BASE_URL, {params: filterBy}).then(res => res.data)
}
function getById(bugId) {
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove').then(res => res.data)
}

function save(bug) {
    let queryParams = `?title=${bug.title}&severity=${bug.severity}&desc=${bug.desc}&createdAt=${bug.createdAt}`
    
    if (bug._id) {
        queryParams += `&_id=${bug._id}`
    }
    return axios.get(BASE_URL + 'save' + queryParams).then(res => res.data)
}

function getDefaultFilter() {
    return { txt: '', severity: 0, label: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        severity: searchParams.get('severity') || defaultFilter.severity,
        label: searchParams.get('label') || defaultFilter.label,
    }
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: "Infinite Loop Detected",
                severity: 4,
                _id: "1NF1N1T3"
            },
            {
                title: "Keyboard Not Found",
                severity: 3,
                _id: "K3YB0RD"
            },
            {
                title: "404 Coffee Not Found",
                severity: 2,
                _id: "C0FF33"
            },
            {
                title: "Unexpected Response",
                severity: 1,
                _id: "G0053"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }



}
