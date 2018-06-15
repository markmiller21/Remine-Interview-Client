import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RemineTable.css';
import { splitCamelString } from '../../../helpers';

class RemineTable extends Component {
    render() {
        return (
            <div className="tableContainer">
                <p>
                    Table length:
                    <strong>{this.props.properties.length}</strong>
                </p>
                <table className="remineTable">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Building Type</th>
                            <th>Beds</th>
                            <th>Baths</th>
                        </tr>
                    </thead>
                    <tbody className="remineTableBody">
                        {this.props.properties.map((property, index) => (
                            <tr
                                key={property.id}
                                className={
                                    index % 2 === 0
                                        ? 'evenTableRow'
                                        : 'oddTableRow'
                                }
                            >
                                <td>{property.address}</td>
                                <td>
                                    {splitCamelString(
                                        property.buildingType.name
                                    )}
                                </td>
                                <td>{property.beds}</td>
                                <td>{property.baths}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

RemineTable.defaultProps = {
    properties: []
};

RemineTable.propTypes = {
    properties: PropTypes.array
};

export default RemineTable;
