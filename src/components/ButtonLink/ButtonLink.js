import React from 'react'
import './ButtonLink.css'
import { Link } from 'react-router-dom'

export default function ButtonLink(props) {
    return (
        <Link
            to={props.to}>
                {props.name}
            </Link>
    )
}