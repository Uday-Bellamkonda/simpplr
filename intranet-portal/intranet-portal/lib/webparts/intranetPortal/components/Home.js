import * as React from 'react';
import { Icon } from '@fluentui/react';
export var Home = function () {
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 64px)',
            fontFamily: 'Roboto, Segoe UI, sans-serif',
            color: '#5f6368',
            textAlign: 'center'
        } },
        React.createElement(Icon, { iconName: "ConstructionCone", style: { fontSize: 64, color: '#f29900', marginBottom: 16 } }),
        React.createElement("h1", { style: { margin: 0, fontSize: 24, fontWeight: 400, color: '#202124' } }, "Under Construction"),
        React.createElement("p", { style: { marginTop: 8, fontSize: 16 } }, "This page is currently being built. Please check back later.")));
};
//# sourceMappingURL=Home.js.map