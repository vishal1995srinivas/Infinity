import React from 'react';
export interface ListItemTextProps {
    tabIndex?: number;
    className?: string;
    primaryText?: React.ReactNode;
    secondaryText?: React.ReactNode;
    childrenTabIndex?: number;
}
declare const ListItemText: React.FunctionComponent<ListItemTextProps>;
export default ListItemText;
