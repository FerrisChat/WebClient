import React from 'react';
import Helmet from 'react-helmet';

/**
 * Overwrites the page title
 */
export default function Title({ children }: RequiresChildren) {
    return (
        <Helmet>
            <title>{children}</title>
        </Helmet>
    )
}