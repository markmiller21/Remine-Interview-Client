import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            loading: true
        };
    }

    componentDidMount() {
        API.getLocations().then(res => {
            this.setState({
                properties: res.data,
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">Your filters go here.</div>
                {this.state.loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <RemineTable properties={[]} />
                )}
            </div>
        );
    }
}

export default Test;
