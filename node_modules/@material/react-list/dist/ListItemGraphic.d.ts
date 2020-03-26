import React from 'react';
export interface ListItemGraphicProps {
    className?: string;
    tabIndex?: number;
    graphic: React.ReactElement<any>;
    childrenTabIndex?: number;
}
declare const ListItemGraphic: React.FunctionComponent<ListItemGraphicProps>;
export default ListItemGraphic;
