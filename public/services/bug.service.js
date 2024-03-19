
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

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
    return { txt: '', severity: 0, label: '', sortBy: '', sortDir: -1 }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        severity: searchParams.get('severity') || defaultFilter.severity,
        label: searchParams.get('label') || defaultFilter.label,
        sortBy: searchParams.get('sortBy') || defaultFilter.sortBy,
        sortDir: searchParams.get('sortDir') || defaultFilter.sortDir,
    }
}