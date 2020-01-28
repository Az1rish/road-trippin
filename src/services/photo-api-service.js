import TokenService from '../services/token-service'
import config from '../config'

const PhotoApiService = {
    getPhotos() {
        return fetch(`${config.API_ENDPOINT}/photos`, {
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postPhoto(newPhoto) { 
        return fetch(`${config.API_ENDPOINT}/photos`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: newPhoto,
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e)): res.json()
            )
    },
    getPhotosByUser() {
        return fetch(`${config.API_ENDPOINT}/photos/myPhotos`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getPhotosByLocation(location) {
        return fetch(`${config.API_ENDPOINT}/photos/location?location=${location}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getPhoto(photoId) {
        return fetch(`${config.API_ENDPOINT}/photos/${photoId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getPhotoComments(photoId) {
        return fetch(`${config.API_ENDPOINT}/photos/${photoId}/comments`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postComment(photoId, text, rating) {
        return fetch(`${config.API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                photo_id: photoId,
                rating,
                text,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e)): res.json()
            )
    }
}

export default PhotoApiService