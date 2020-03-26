import React from 'react';
export interface ListItemMetaProps {
    className?: string;
    tabIndex?: number;
    meta: string | React.ReactElement<any>;
    childrenTabIndex?: number;
}
declare const ListItemMeta: React.FunctionComponent<ListItemMetaProps>;
export default ListItemMeta;
