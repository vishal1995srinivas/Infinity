import React from 'react';
import { MDCListFoundation } from '@material/list/foundation';
import { MDCListIndex } from '@material/list/types';
import { MDCListAdapter } from '@material/list/adapter';
import ListItem, { ListItemProps } from './ListItem';
import ListItemGraphic from './ListItemGraphic';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';
import ListDivider from './ListDivider';
import ListGroup from './ListGroup';
import ListGroupSubheader from './ListGroupSubheader';
export interface ListProps extends React.HTMLProps<HTMLElement> {
    className?: string;
    checkboxList?: boolean;
    radioList?: boolean;
    nonInteractive?: boolean;
    dense?: boolean;
    avatarList?: boolean;
    twoLine?: boolean;
    singleSelection?: boolean;
    selectedIndex?: MDCListIndex;
    handleSelect?: (activatedItemIndex: number, selected: MDCListIndex) => void;
    wrapFocus?: boolean;
    tag?: string;
    ref?: React.Ref<any>;
    orientation?: 'vertical' | 'horizontal';
}
interface ListState {
    listItemClassNames: {
        [listItemIndex: number]: string[];
    };
}
export interface ListItemContextShape {
    checkboxList?: boolean;
    radioList?: boolean;
    handleClick?: (e: React.MouseEvent<any>, index: number) => void;
    handleKeyDown?: (e: React.KeyboardEvent<any>, index: number) => void;
    handleBlur?: (e: React.FocusEvent<any>, index: number) => void;
    handleFocus?: (e: React.FocusEvent<any>, index: number) => void;
    onDestroy?: (index: number) => void;
    getListItemInitialTabIndex?: (index: number) => number;
    getClassNamesFromList?: () => ListState['listItemClassNames'];
    tabIndex?: number;
}
export declare const defaultListItemContext: ListItemContextShape;
export declare const ListItemContext: React.Context<ListItemContextShape>;
export default class List extends React.Component<ListProps, ListState> {
    foundation: MDCListFoundation;
    hasInitializedListItemTabIndex: boolean;
    private listElement;
    state: ListState;
    static defaultProps: Partial<ListProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ListProps): void;
    componentWillUnmount(): void;
    initializeListType: () => void;
    readonly listElements: Element[];
    readonly classes: string;
    readonly adapter: MDCListAdapter;
    readonly role: string | null;
    /**
     * Called from ListItem.
     * Initializes the tabIndex prop for the listItems. tabIndex is determined by:
     * 1. if selectedIndex is an array, and the index === selectedIndex[0]
     * 2. if selectedIndex is a number, and the the index === selectedIndex
     * 3. if there is no selectedIndex
     */
    getListItemInitialTabIndex: (index: number) => number;
    /**
     * Method checks if the list item at `index` contains classes. If true,
     * method merges state.listItemClassNames[index] with listItem.props.className.
     * The return value is used as the listItem's className.
     */
    private getListItemClassNames;
    handleKeyDown: (e: React.KeyboardEvent<any>, index: number) => void;
    handleClick: (_e: React.MouseEvent<any, MouseEvent>, index: number) => void;
    handleFocus: (e: React.FocusEvent<Element>, index: number) => void;
    handleBlur: (e: React.FocusEvent<Element>, index: number) => void;
    onDestroy: (index: number) => void;
    private getListProps;
    getListPropsMemoized: any;
    render(): JSX.Element;
}
export { ListItem, ListItemGraphic, ListItemText, ListItemMeta, ListDivider, ListGroup, ListGroupSubheader, ListItemProps, };
