import React, { Component } from 'react'
import PhotoContext from '../../contexts/PhotoContext'
import PhotoApiService from '../../services/photo-api-service'
import { Button, Textarea } from '../Utils/Utils'
import './CommentForm.css'

export default class CommentForm extends Component {
    static contextType = PhotoContext

    handleSubmit = ev => {
        ev.preventDefault()
        const { photo } = this.context
        const { text, rating } = ev.target

        PhotoApiService.postComment(photo.id, text.value, Number(rating.value))
            .then(this.context.addComment)
            .then(() => {
                text.value = ''
            })
            .catch(this.context.setError)
    }

    render() {
        return (
            <form
                className='CommentForm'
                onSubmit={this.handleSubmit}
            >
                <div className='text'>
                    <Textarea
                        required
                        aria-label='Type a comment...'
                        name='text'
                        id='text'
                        cols='30'
                        rows='3'
                        placeholder='Type a comment...'>
                    </Textarea>
                </div>

                <div className='select'>
                    <label htmlFor='rating'>Rate this photo!</label>
                    <select
                        required
                        aria-label='Rate this photo!'
                        name='rating'
                        id='rating'
                    >
                        <option value='1'>1 Star</option>
                        <option value='2'>2 Stars</option>
                        <option value='3'>3 Stars</option>
                        <option value='4'>4 Stars</option>
                        <option value='5'>5 Stars</option>
                    </select>
                </div>

                <Button type='submit'>
                    Post comment
                </Button>
            </form>
        )
    }
}