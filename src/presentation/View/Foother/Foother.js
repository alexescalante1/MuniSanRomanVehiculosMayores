import React, { Component } from "react";

export class Foother extends Component {
    render() {
        return (
            <>
                <footer className="main-footer">
                    <strong>Copyright © 2022-2024<a href={this.props.url}> {this.props.name} </a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0.0
                    </div>
                </footer>
            </>
        )
    }
}