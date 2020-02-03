import React from "react";
import { ThemeType, withStyles } from "@kitten/theme";
import { List } from "@kitten/ui";
import { SessionItem } from "./sessionItem.component";

import moment from 'moment';
import humanize from 'tiny-human-time';
import hdate from 'human-date';

const SessionListComponent = ({ data, onItemPress, ...rest }) => {
  console.log('data', data)
  const { themedStyle } = rest;

  const getDuration = (startDate, endDate) => {
    return humanize(moment(startDate), moment(endDate));
  }

  const getHumanDate = (date) => hdate.prettyPrint(moment(date))

  const renderItem = (item) => {
    const { id, name, startTime, endTime, msw, notes } = item;
    return (
      <SessionItem
        key={id}
        style={themedStyle.item}
        name={name}
        date={getHumanDate(startTime)}
        duration={getDuration(startTime, endTime)}
        notes={notes}
        onPress={() => onItemPress(item)}
        msw={msw}
      />
    );
  };

  return <List data={data.reverse()} renderItem={({item}) => renderItem(item)} {...rest} />;
};

export const SessionList = withStyles(
  SessionListComponent,
  (theme: ThemeType) => ({
    item: {
      marginVertical: 8,
      backgroundColor: theme["background-basic-color-1"]
    }
  })
);
