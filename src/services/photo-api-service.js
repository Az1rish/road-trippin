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
    postPhoto(/*userId, */image, title, location, content) {
        console.log(image, title, location, content)
        return fetch(`${config.API_ENDPOINT}/upload/image`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                // user_id: userId,
                image,
                title,
                location,
                content
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e)): res.json()
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