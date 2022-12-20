import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import { RutaProject } from "../../../Main/Config/Variables"

export default class NavbarMessage extends Component {
    render() {
        return (
            <>
                <a className="nav-link" data-toggle="dropdown" href="#">
                    <i className="far fa-comments" />
                    <span className="badge badge-danger navbar-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <Messages />
                </div>
            </>
        )
    }
}

export function Messages() {

    const DB = [
        {
            id: 1,
            name: "Alex Escalante",
            img: "dist/img/user1-128x128.jpg",
            message: "Hola Mundo",
            time: "1 Hour Ago"
        },
        {
            id: 2,
            name: "Fredy Song",
            img: "dist/img/user8-128x128.jpg",
            message: "Hello World",
            time: "3 Hour Ago"
        },
        {
            id: 3,
            name: "Jose Maron",
            img: "dist/img/user3-128x128.jpg",
            message: "Konnichiwa",
            time: ""
        }
    ]

    return (
        <>
            {
                React.Children.toArray(
                    DB.map((item) => (
                        <>
                            <MessageItem id={item.id} name={item.name} img={item.img} message={item.message} time={item.time} />
                            <div className="dropdown-divider" />
                        </>
                    ))
                )
            }
            <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </>
    );
}

export function MessageItem({ id, name, img, message, time }) {
    return (<>
        <a href="#" className="dropdown-item" id={id}>

            <div className="media">
                <img src={RutaProject + img} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                <div className="media-body">
                    <h3 className="dropdown-item-title">
                        {name}
                        <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                    </h3>
                    <p className="text-sm">{message}</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> {time}</p>
                </div>
            </div>

        </a>
    </>)
}

MessageItem.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
}