import React from "react";
import { connect } from "react-redux";

import AddToHomeScreen from "../a2hs/a2hs";
import PushNotificationToggle from "../../components/push/push";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchSettings, setPushEnabled } from "./actions";
import { settingsReducer, getSettingsState } from "./reducer";

class Settings extends React.PureComponent {
  componentDidMount() {
    const { onLoadSettings } = this.props;
    onLoadSettings();
  }
  
  // returns the JSX that will be rendered for this component
  render() {
    const { isPushEnabled, onSetPushEnabled } = this.props;
    return (
      <section className="settings">
        <ul className="setting-list">
          <li className="item">
            <PushNotificationToggle
              title="Push Notifications"
              html="Enable push notifications"
              isPushEnabled={isPushEnabled}
              onSetPushEnabled={onSetPushEnabled}
            />
          </li>
          <li className="item">
            <AddToHomeScreen className="title">
              Add To Homescreen
            </AddToHomeScreen>
          </li>
          <li className="item">
            <a
              href="https://www.incredible-web.com/"
              target="_blank"
              className="title"
            >
              About Incredible Web
            </a>
          </li>
        </ul>
      </section>
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchSettings(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: settingsReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return getSettingsState(state).toJS();
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadSettings: data => dispatch(fetchSettings(data)),
    onSetPushEnabled: data => dispatch(setPushEnabled(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, settingsReducer)(Settings);
export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
