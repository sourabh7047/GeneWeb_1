import React, { Component } from 'react';
import {AuthUserContext} from '../Session';
import BasePage from '.';

class BasePageWrapper extends Component {
    render() {
        return (
            <div>
                <AuthUserContext.Consumer>
                    {AuthUser=>(
                        <BasePage AuthUser={AuthUser}/>
                    )}
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

export default BasePageWrapper;
