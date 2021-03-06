import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@kitten/ui';
import { StarIconFill } from '@src/assets/icons';

interface State {
  selectedIndex: number;
}

export class BottomNavigationFull extends React.Component<{}, State> {

  public state: State = {
    selectedIndex: 0,
  };

  private onTabSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactNode {
    return (
      <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        <BottomNavigationTab
          title='Screen 1'
          icon={StarIconFill}
        />
        <BottomNavigationTab
          title='Screen 2'
          icon={StarIconFill}
        />
        <BottomNavigationTab
          title='Screen 3'
          icon={StarIconFill}
        />
      </BottomNavigation>
    );
  }
}
