import React from 'react';

export default function ContextMenu({ children, coordinates: [ left, top ] }: { children: any | any[], coordinates: [number, number] }) {
    return (
        <div className="context-menu" style={{ left, top }}>
            <div className="context-menu-items">
                {children}
            </div>
        </div>
    )
}
