import * as React from 'react';
import type { IDataBricksPlexusProps } from './IDataBricksPlexusProps';
import App from './App';
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DataBricksPlexus extends React.Component<IDataBricksPlexusProps> {
  public render(): React.ReactElement<IDataBricksPlexusProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName
    } = this.props;

    return (
      <div>
        <HashRouter>
        <App></App>
        </HashRouter>
      </div>
    );
  }
}
