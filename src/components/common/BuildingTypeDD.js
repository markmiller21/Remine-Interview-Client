import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { splitCamelString } from '../../helpers';

class BuildingTypeDD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    render() {
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>Property Types</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Property Types</DropdownItem>
                        {this.props.types.map(type => (
                            <DropdownItem
                                onClick={() => this.props.selectType(type)}
                                key={type.id}
                            >
                                {splitCamelString(type.name)}
                            </DropdownItem> // regex is to
                        ))}
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.props.selectType()}>
                            Clear Selection
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

BuildingTypeDD.defaultProps = {
    types: []
};

BuildingTypeDD.propTypes = {
    types: PropTypes.array,
    selectType: PropTypes.func
};

export default BuildingTypeDD;
