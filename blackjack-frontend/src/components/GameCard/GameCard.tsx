import React, { useContext } from 'react'
import classes from './GameCard.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import axios from 'axios'

export default function GameCard(props: any) {
    const { username } = useContext(loggedInContext)

    const deleteCard = () => {
        axios.delete(
            `http://localhost:5000/gameManager/delete-game?gameName=${props.name}`,
            { withCredentials: true }
        )
        props.onDelete(props.name)
    }

    return (
        <div className={classes.Card} onClick={() => props.click(props.name)}>
            <p>{props.name}</p>
            <div className={classes.RightSide}>
                <p>{props.seats} / 3</p>
                {props.owner === username ?
                    <button onClick={(e) => {
                        e.stopPropagation();
                        deleteCard()
                    }}>X</button> : null
                }
            </div>
        </div>
    )
}
