import React from 'react';
export interface NativeControlProps extends React.HTMLProps<HTMLInputElement> {
    className?: string;
    rippleActivatorRef?: React.RefObject<HTMLInputElement>;
}
declare const NativeControl: React.FunctionComponent<NativeControlProps>;
export default NativeControl;
