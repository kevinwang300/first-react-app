import React, { Component } from 'react';

const withClassName = (WrappedComponent, className) => {
    const WithClassName = class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            );
        };
    }

    return React.forwardRef((props, ref) => {
        return <WithClassName {...props} forwardedRef={ref} />
    });
};

export default withClassName;