import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import BuildingTypeDD from './components/common/BuildingTypeDD';
import API from './API';
import { splitCamelString } from './helpers';

//  Note: I did not change the name of this component in case you all have automated tests for a "Test" Component
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalProperties: [],
            properties: [],
            maxBeds: 100,
            minBeds: 0,
            maxBaths: 6,
            minBaths: 0,
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
        // NOTE: These fetches would ideally happen in some sort of middleware (ie redux or apollo) but I didn't want to over complicate this simple app
    }

    /**
     * Filters our list of properties and sets the "properties" state to an array of the properties that meet our criteria
     */
    filterList() {
        let filteredProperties = this.state.originalProperties.filter(
            property => {
                // if Bed filter is active, check to see if property has the correct # of Beds rooms
                if (
                    this.state.minBeds > property.beds ||
                    this.state.maxBeds < property.beds
                ) {
                    return false;
                }
                // if Bath filter is active, check to see if property has the correct # of baths rooms
                if (
                    this.state.minBaths > property.baths ||
                    this.state.maxBaths < property.baths
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

    /**
     * This function is evoked onBlur from either of the Bed input fields. It will determine the new values for minBeds & maxBeds then set the state
     * and asynchronously call the filterList function
     *
     *
     * @param {String} bedCount String representation of integer for users input on number of beds they want to see
     * @param {String} bedType  Determines if it is the mimBeds or maxBeds field
     */
    updateBeds(bedCount, bedType) {
        let minBeds = this.state.minBeds;
        let maxBeds = this.state.maxBeds;
        if (bedType === 'minBeds') {
            minBeds = parseInt(bedCount, 10); // converts input to an Int (from string)
            // if new minimum bed count is greater than the max, set the max equal to the new minimum
            maxBeds = minBeds > maxBeds ? minBeds : maxBeds;
        } else {
            maxBeds = parseInt(bedCount, 10); // converts input to an Int (from string)
            // if the new maximum bed count is less than the minimum, set the mimimum to the new maxiumum
            minBeds = maxBeds < minBeds ? maxBeds : minBeds;
        }
        this.setState(
            {
                minBeds,
                maxBeds
            },
            () => this.filterList()
        );
    }

    /**
     * This function is evoked onBlur from either of the Bath input fields. It will determine the new values for minBaths & maxBaths then set the state
     * and asynchronously call the filterList function
     *
     *
     * @param {String} bathCount String representation of integer for users input on number of baths they want to see
     * @param {String} bathType  Determines if it is the mimBeds or maxBeds field
     */
    updateBaths(bathCount, bathType) {
        let minBaths = this.state.minBaths;
        let maxBaths = this.state.maxBaths;
        if (bathType === 'minBaths') {
            minBaths = parseInt(bathCount, 10); // converts input to an Int (from string)
            // if new minimum bed count is greater than the max, set the max equal to the new minimum
            maxBaths = minBaths > maxBaths ? minBaths : maxBaths;
        } else {
            maxBaths = parseInt(bathCount, 10); // converts input to an Int (from string)
            // if the new maximum bed count is less than the minimum, set the mimimum to the new maxiumum
            minBaths = maxBaths < minBaths ? maxBaths : minBaths;
        }
        this.setState(
            {
                minBaths,
                maxBaths
            },
            () => this.filterList()
        );
    }

    render() {
        return (
            <div className="testContainer">
                <form className="filterContainer">
                    {/* Bedroom input */}
                    <div className="filterComponentContainer">
                        <h6>Bedrooms</h6>
                        <label>
                            min:
                            <input
                                className="numberInputBox"
                                type="number"
                                name="minBeds"
                                min="0"
                                max="100"
                                value={this.state.minBeds}
                                onChange={e =>
                                    this.setState({
                                        minBeds: e.target.value
                                    })
                                }
                                onBlur={e =>
                                    this.updateBeds(e.target.value, 'minBeds')
                                }
                            />
                            max:
                            <input
                                className="numberInputBox"
                                type="number"
                                name="maxBeds"
                                min="0"
                                max="100"
                                value={this.state.maxBeds}
                                onChange={e =>
                                    this.setState({
                                        maxBeds: e.target.value
                                    })
                                }
                                onBlur={e =>
                                    this.updateBeds(e.target.value, 'maxBeds')
                                }
                            />
                        </label>
                    </div>

                    {/* Bathroom input */}
                    <div className="filterComponentContainer">
                        <h6>Bathrooms</h6>
                        <label>
                            min:
                            <input
                                className="numberInputBox"
                                type="number"
                                name="minBaths"
                                min="0"
                                max="100"
                                value={this.state.minBaths}
                                onChange={e =>
                                    this.setState({
                                        minBaths: e.target.value
                                    })
                                }
                                onBlur={e =>
                                    this.updateBaths(e.target.value, 'minBaths')
                                }
                            />
                            max:
                            <input
                                className="numberInputBox"
                                type="number"
                                name="maxBaths"
                                min="0"
                                max="6"
                                value={this.state.maxBaths}
                                onChange={e =>
                                    this.setState({
                                        maxBaths: e.target.value
                                    })
                                }
                                onBlur={e =>
                                    this.updateBaths(e.target.value, 'maxBaths')
                                }
                            />
                        </label>
                    </div>

                    {/* buildingType input */}
                    <div className="filterComponentContainer">
                        <BuildingTypeDD
                            types={this.state.possibleBuildingTypes}
                            selectType={this.selectType}
                            currentSelection={this.state.buildingType}
                        />
                        {this.state.buildingType !== '' ? (
                            <h6>{splitCamelString(this.state.buildingType)}</h6>
                        ) : null}
                    </div>
                </form>
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
