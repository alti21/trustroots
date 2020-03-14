import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import OfferHostEditAvailability from './OfferHostEditAvailability.component';
import OfferHostEditDescription from './OfferHostEditDescription.component';
import OfferHostEditLocation from './OfferHostEditLocation.component';
import Navigation from '@/modules/references/client/components/create-reference/Navigation';

// @TODO translations
export default function OfferHostEditPresentational({
  status,
  maxGuests,
  description,
  noOfferDescription,
  location,
  onChangeStatus,
  onChangeMaxGuests,
  onChangeDescription,
  onChangeNoOfferDescription,
  onChangeLocation,
}) {
  const [tab, setTab] = useState(0);
  return (
    <section className="offers-edit">
      <button
        type="submit"
        className="btn btn-lg btn-inverse-primary pull-right hidden-xs"
        ng-disabled="offerHostEdit.isLoading ||
          (offerHostEdit.offer.status!=='no' && offerHostEdit.isDescriptionTooShort)"
        uib-tooltip="Write longer description first"
        tooltip-enable="offerHostEdit.isDescriptionTooShort && offerHostEdit.offer.status !== 'no'"
        tooltip-placement="bottom"
        aria-hidden="true"
      >
        Save and Exit
      </button>
      <Tabs
        className="offer-tabs"
        activeKey={tab}
        onSelect={key => setTab(key)}
        animation={false}
      >
        <Tab eventKey={0} title="Availability">
          <OfferHostEditAvailability
            status={status}
            maxGuests={maxGuests}
            onChangeStatus={onChangeStatus}
            onChangeMaxGuests={onChangeMaxGuests}
          />
        </Tab>
        <Tab eventKey={1} title="Description">
          <OfferHostEditDescription
            status={status}
            description={description}
            noOfferDescription={noOfferDescription}
            onChangeDescription={onChangeDescription}
            onChangeNoOfferDescription={onChangeNoOfferDescription}
          />
        </Tab>
        <Tab eventKey={2} title="Location">
          <OfferHostEditLocation
            status={status}
            location={location}
            onChangeLocation={onChangeLocation}
          />
        </Tab>
      </Tabs>

      <Navigation
        tab={tab}
        tabs={3}
        onBack={() => setTab(tab => tab - 1)}
        onNext={() => setTab(tab => tab + 1)}
      />
    </section>
  );
}

OfferHostEditPresentational.propTypes = {
  status: PropTypes.oneOf(['yes', 'maybe', 'no']).isRequired,
  maxGuests: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  noOfferDescription: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onChangeMaxGuests: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeNoOfferDescription: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
};
/*
<section class="offers-edit">
  <offer-host-edit></offer-host-edit>
  <div
    ng-if="app.user.public === true && !offerHostEdit.offer && !offerHostEdit.offers.$resolved"
    class="text-center lead"
    role="alert"
  >
    <br /><br />
    Snap!<br />
    Something went wrong.
    <br /><br />
    If this keeps happening, please contact us.
    <br /><br />
    <a ui-sref="support">Support</a>
  </div>

  <form
    name="offerForm"
    novalidate
    autocomplete="off"
    ng-submit="offerHostEdit.editOffer()"
    ng-if="app.user.public === true && offerHostEdit.offers.$resolved && offerHostEdit.offer"
  >
    <button
      type="submit"
      class="btn btn-lg btn-inverse-primary pull-right hidden-xs"
      ng-disabled="offerHostEdit.isLoading ||
          (offerHostEdit.offer.status!=='no' && offerHostEdit.isDescriptionTooShort)"
      uib-tooltip="Write longer description first"
      tooltip-enable="offerHostEdit.isDescriptionTooShort && offerHostEdit.offer.status !== 'no'"
      tooltip-placement="bottom"
      aria-hidden="true"
    >
      Save and Exit
    </button>

    <uib-tabset class="offer-tabs" active="offerHostEdit.offerTab">
      <uib-tab index="0" heading="Availability">
        <offer-host-availability
          maxGuests="offerHostEdit.offer.maxGuests"
          availability="offerHostEdit.offer.status"
          onChangeAvailability="offerHostEdit.updateStatus"
          onChangeMaxGuests="offerHostEdit.updateMaxGuests"
        ></offer-host-availability>
      </uib-tab>
      <uib-tab index="1" heading="Description">
        <offer-host-description
          status="offerHostEdit.offer.status"
          description="offerHostEdit.offer.description"
          noOfferDescription="offerHostEdit.offer.noOfferDescription"
        ></offer-host-description>
        <div
          class="panel panel-default"
          ng-if="offerHostEdit.offer.status === 'no'"
        >
          <div class="panel-heading">
            <h4 id="noOfferDescriptionLabel">
              Tell others why you cannot host...
            </h4>
          </div>
          <div class="panel-body">
            <div
              class="offer-nodescription"
              aria-labelledby="noOfferDescriptionLabel"
              aria-required="false"
              ng-class="{ 'is-not-empty': offerHostEdit.offer.noOfferDescription.length }"
              ng-model="offerHostEdit.offer.noOfferDescription"
              tr-editor
              tr-editor-options="::app.editorOptions"
              data-placeholder="Write here..."
            ></div>
          </div>
        </div>

        <div
          class="panel panel-default"
          ng-class="{ 'panel-disabled': offerHostEdit.offer.status === 'no' && !offerDescriptionFocused }"
        >
          <div class="panel-heading">
            <h4 id="offerDescriptionLabel">
              Tell about your home and hosting possibilities
              <i ng-if="offerHostEdit.offer.status !== 'no'"> (required)</i>
            </h4>
          </div>
          <div class="panel-body">
            <div
              class="offer-description"
              aria-labelledby="offerDescriptionLabel"
              aria-required="offerHostEdit.offer.status !== 'no'"
              ng-focus="offerDescriptionFocused = true"
              ng-blur="offerDescriptionFocused = false"
              ng-class="{ 'is-not-empty': offer.description.length }"
              ng-hide="!offerHostEdit.offer"
              ng-model="offerHostEdit.offer.description"
              tr-editor
              tr-editor-options="::app.editorOptions"
              data-placeholder="Write here..."
            ></div>
          </div>
          <div
            id="noOfferDescriptionDescription"
            class="panel-footer panel-disabled-highlighted"
            ng-show="offerHostEdit.offer.description && offerHostEdit.offer.status === 'no'"
          >
            <span class="icon-info icon-lg"></span>
            This description won't be public until you can host again.
          </div>
        </div>
      </uib-tab>
      <uib-tab
        index="2"
        heading="Location"
        select="offer.invalidateMapSize(offerHostEdit.leafletData)"
        disable="offerHostEdit.offer.status === 'no' || offerHostEdit.isDescriptionTooShort"
      >
        <offer-host-location
          firstTimeAround="false"
          status="offerHostEdit.offer.status"
          location="offerHostEdit.mapCenter"
        ></offer-host-location>
        <!-- Location -->
        <div class="panel panel-default offer-panel-map">
          <div
            class="alert alert-info offer-map-guide"
            role="dialog"
            aria-labelledby="firstTimeAroundLabel"
            aria-describedby="firstTimeAroundDescription"
            ng-if="offerHostEdit.firstTimeAround"
          >
            <p class="lead" role="document">
              <strong id="firstTimeAroundLabel"
                >Set your hosting location on the map.</strong
              >
              <br /><br />
              <span aria-hidden="true"
                >Zoom in and drag the map below to place the marker over your
                home.</span
              >
              <br /><br />
              <span id="firstTimeAroundDescription">
                Your exact location won't be revealed to others; the location is
                publicly randomized by a couple of hundred meters.
              </span>
              <br /><br />
              <button
                type="button"
                class="btn btn-lg btn-info"
                data-dismiss="dialog"
                aria-label="Close information dialog about hosting location map"
                ng-click="offerHostEdit.firstTimeAround = false"
              >
                Got it!
              </button>
            </p>
          </div>

          <div class="panel-body">
            <p id="offerLocation" class="lead">
              <strong
                >Zoom in and drag the map below to place the marker over your
                home.</strong
              ><br />
              The location is publicly shown, randomized by a couple hundred
              meters.
            </p>

            <!-- Search location -->
            <div
              class="form-group has-feedback offer-map-location-search"
              ng-if="::app.appSettings.mapbox.publicKey"
            >
              <label for="search-query" class="sr-only">
                Search for places on the map
              </label>
              <span
                class="form-control-feedback visible-xs-inline"
                aria-hidden="true"
              >
                <span class="icon-search icon-lg text-muted"></span>
              </span>
              <input
                type="text"
                id="search-query"
                class="form-control input-lg"
                placeholder="Search"
                ng-model="offerHostEdit.searchQuery"
                tr-location
                tr-location-center="offerHostEdit.mapCenter"
              />
            </div>
            <!-- /Search location -->
          </div>

          <div class="offer-map">
            <leaflet
              ng-if="offerHostEdit.offerTab === 2"
              defaults="offer.mapDefaults"
              layers="offer.mapLayers"
              lf-center="offerHostEdit.mapCenter"
              aria-describedby="offerLocation"
              id="offer-add-location-canvas"
            ></leaflet>
            <div
              class="offer-location-overlay"
              ng-class="{
                 'offer-hosting-yes': offerHostEdit.offer.status === 'yes',
                 'offer-hosting-maybe': offerHostEdit.offer.status === 'maybe'
               }"
            ></div>
          </div>
        </div>
        <!-- /Location -->
      </uib-tab>
    </uib-tabset>

    <!-- Navigation for big screens -->
    <div class="text-center hidden-xs">
      <br />
      <button
        ng-if="offerHostEdit.offerTab > 0"
        type="button"
        class="btn btn-action btn-link"
        aria-label="Previous section"
        ng-click="offerHostEdit.offerTab = offerHostEdit.offerTab - 1"
      >
        <span class="icon-left" aria-hidden="true"></span>
        Back
      </button>
      <button
        ng-if="(offerHostEdit.offer.status !== 'no' && offerHostEdit.offerTab < 2) || offerHostEdit.offerTab < 1"
        type="button"
        class="btn btn-action btn-primary"
        aria-label="Next section"
        uib-tooltip="Write longer description first"
        tooltip-enable="offerHostEdit.isDescriptionTooShort&& offerHostEdit.offerTab === 1"
        ng-disabled="offerHostEdit.isDescriptionTooShort && offerHostEdit.offerTab === 1"
        ng-click="offerHostEdit.offerTab = offerHostEdit.offerTab + 1"
      >
        Next
      </button>
      <!-- For last tab -->
      <button
        ng-if="offerHostEdit.offerTab === 2 || (offerHostEdit.offer.status === 'no' && offerHostEdit.offerTab === 1)"
        type="submit"
        class="btn btn-action btn-primary"
        aria-label="Finish editing and save"
        ng-disabled="offerHostEdit.isLoading"
      >
        Finish
      </button>
    </div>

    <!-- Navigation for small screens -->
    <nav class="navbar navbar-default navbar-fixed-bottom visible-xs-block">
      <div class="container">
        <ul
          class="nav navbar-nav nav-justified"
          role="toolbar"
          aria-label="Offer actions"
        >
          <li>
            <button
              ng-if="offerHostEdit.offerTab > 0"
              type="button"
              class="btn btn-lg btn-primary"
              aria-label="Previous section"
              ng-click="offerHostEdit.offerTab = offerHostEdit.offerTab - 1"
            >
              <span class="icon-left" aria-hidden="true"></span>
              Back
            </button>
          </li>
          <li class="pull-right">
            <button
              ng-if="(offerHostEdit.offer.status !== 'no' && offerHostEdit.offerTab < 2) || offerHostEdit.offerTab < 1"
              type="button"
              class="btn btn-lg btn-primary"
              aria-label="Next section"
              uib-tooltip="Write longer description first"
              tooltip-enable="offerHostEdit.isDescriptionTooShort && offerHostEdit.offerTab === 1"
              ng-disabled="offerHostEdit.isDescriptionTooShort && offerHostEdit.offerTab === 1"
              ng-click="offerHostEdit.offerTab = offerHostEdit.offerTab + 1"
            >
              Next
              <span class="icon-right" aria-hiddne="true"></span>
            </button>
            <!-- For last tab -->
            <button
              ng-if="offerHostEdit.offerTab === 2 || (offerHostEdit.offer.status === 'no' && offerHostEdit.offerTab === 1)"
              type="submit"
              class="btn btn-lg btn-primary"
              aria-label="Finish editing and save"
              ng-disabled="offerHostEdit.isLoading"
            >
              Finish
              <span class="icon-ok" aria-hidden="true"></span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </form>
</section>
*/
