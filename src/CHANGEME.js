import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import BuildingTypeDD from './components/common/BuildingTypeDD';
import API from './API';

/**
 * Update `CHANGEME.js` and any other files you need to in order to allow a user to filter the `RemineTable` contents based on whether the location has:
 *   a number of beds in a user specified range
 *   a number of baths in a user specified range
 *   the same building type as the one specified by the user (the user can select from a list of building types that come from the API)
 *   If a user has not specified a bound in a range or a type for the building type, default to show all. If no filters are active or being applied, all locations should be shown in the `RemineTable`.
 */

//  Note: I did not change the name of this component in case you all have automated tests for a "Test" Component
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalProperties: [],
            properties: [],
            beds: 0,
            baths: 0,
            activeBedFilter: false,
            activeBathFilter: false,
            loading: true,
            buildingType: '',
            possibleBuildingTypes: []
        };
    }

    componentDidMount() {
        // Fetch all the location data we need to populate RemineTable component
        API.getLocations().then(res => {
            this.setState({
                originalProperties: res.data, // Save original data in state for future filtering
                properties: res.data, // Save original data in state for future filtering
                loading: false // render table
            });
        });
        // Fetch the building types for our Dropdown Component
        API.getBuildingTypes().then(res => {
            this.setState({
                possibleBuildingTypes: res.data
            });
        });
        // NOTE: These fetches should happen in some sort of middleware (ie redux or apollo) but I didn't want to over complicate this simple app
    }

    /**
     * Filters our list of properties and sets the "properties" state to an array of the properties that meet our criteria
     */
    filterList() {
        let filteredProperties = this.state.originalProperties.filter(
            property => {
                // if Bed filter is active, check to see if property has the correct # of Beds rooms
                if (
                    this.state.activeBedFilter &&
                    this.state.beds !== property.beds
                ) {
                    return false;
                }
                // if Bath filter is active, check to see if property has the correct # of baths rooms
                if (
                    this.state.activeBathFilter &&
                    this.state.baths !== property.baths
                ) {
                    return false;
                }
                // Check buildingType to see if there is an active filter and if the currently selected type is the same as the property
                if (
                    this.state.buildingType !== '' &&
                    this.state.buildingType !== property.buildingType.name
                ) {
                    return false;
                }
                return property;
            }
        );
        this.setState({ properties: filteredProperties });
    }

    /**
     * This function is the callback from the Property Type Dropdown.  It sets the state of the type of building type and calls our filter function
     *
     * @param {Object} type PropertyType Object consisting of building type "name" and "id"
     */
    selectType = type => {
        let buildingType = type === undefined ? '' : type.name; // if type is undefined (ie cleared selection) set building type to ""
        // Use setState's callback function to call filterList asynchronously after the state has been updated
        this.setState(
            {
                buildingType
            },
            () => {
                this.filterList();
            }
        );
    };

    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">
                    <BuildingTypeDD
                        types={this.state.possibleBuildingTypes}
                        selectType={this.selectType}
                    />
                </div>
                {this.state.loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <RemineTable properties={this.state.properties} />
                )}
            </div>
        );
    }
}

export default Test;
