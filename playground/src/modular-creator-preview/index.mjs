/* eslint-disable */import { initEngine } from 'modular-engine';
import { createModularAction, createModularSelector } from 'modular-utils';
import React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { isInDarkMode, getModalType, isModalVisible, closeModal, getRoutes, getHomePage, getUIView } from 'modular-plugins';
import { Modal, Container, Button, Drawer } from 'modular-ui-components';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Open modular-engine drawer
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
var openDrawer = createModularAction("@@ui/OPEN_DRAWER");
/**
 * Close modular-engine drawer
 *
 */
var closeDrawer = createModularAction("@@ui/CLOSE_DRAWER");

var initModularEngine = function (config) {
    var _a;
    var engineConfig = config || {};
    var reduxConfig = engineConfig.redux || { customize: {} };
    var customize = reduxConfig.customize || {};
    var addons = {
        ui: {
            state: {
                isDrawerOpen: false,
            },
            effects: (_a = {},
                _a[closeDrawer.type] = function (state, action) { return (__assign({}, state)); },
                _a[openDrawer.type] = function (state, action) { return (__assign(__assign({}, state), { isDrawerOpen: true })); },
                _a),
        },
    };
    Object.keys(addons).forEach(function (addon) {
        if (customize[addon]) {
            var customState = customize[addon].state || {};
            var customEffects = customize[addon].effects || {};
            customize[addon].state = __assign(__assign({}, customState), addons[addon].state);
            customize[addon].effects = __assign(__assign({}, customEffects), addons[addon].effects);
        }
        else {
            customize[addon] = addons[addon];
        }
    });
    reduxConfig.customize = customize;
    engineConfig.redux = reduxConfig;
    return import('modular-plugins').then(function (_a) {
        var modalPlugin = _a.modalPlugin, uiPlugin = _a.uiPlugin, localizationPlugin = _a.localizationPlugin, themerPlugin = _a.themerPlugin, routerPlugin = _a.routerPlugin, urlCheckerPlugin = _a.urlCheckerPlugin, epicsPlugin = _a.epicsPlugin;
        var plugins = engineConfig.plugins || [];
        plugins = plugins.concat([
            modalPlugin,
            uiPlugin,
            localizationPlugin,
            themerPlugin,
            routerPlugin,
            urlCheckerPlugin,
            epicsPlugin,
        ]);
        engineConfig.plugins = plugins;
        var _b = initEngine({ config: engineConfig }), store = _b.store, output = _b.config;
        return {
            store: store,
            config: output,
        };
    });
};

/**
 * Enhance the element with the dark-mode parameter, from global state
 *
 * @param Element component to drive with the dark mode
 * @returns the same component, enhanced with dark mode parameter
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
var driveWithDarkMode = function (Element) {
    var Component = function (args) {
        var dark = useSelector(isInDarkMode);
        return Element(__assign(__assign({}, args), { dark: dark }));
    };
    return Component;
};

var AppModal = function (_a) {
    var modals = _a.modals; _a.namespace; var store = _a.store;
    var type = useSelector(getModalType);
    var isVisible = useSelector(isModalVisible);
    var ModalContent = type && modals[type] ? modals[type] : function () { return React.createElement("div", null); };
    var ModalComponent = driveWithDarkMode(Modal);
    return (React.createElement(ModalComponent, { onClose: function () { return store.dispatch(closeModal()); }, hide: !isVisible },
        React.createElement(ModalContent, null)));
};

var AppRouter = function (_a) {
    var history = _a.history, renderCallback = _a.renderCallback;
    var PAGES = useSelector(getRoutes);
    var HOME = useSelector(getHomePage);
    return (React.createElement(Container, { unstyled: true, style: {
            position: "relative",
            width: "100%",
            overflow: "auto",
            height: "100%",
        } },
        React.createElement(Router, { history: history },
            React.createElement(Switch, null,
                Object.keys(PAGES).map(function (route) {
                    return (React.createElement(Route, { component: renderCallback(route), key: route, exact: true, path: PAGES[route] }));
                }),
                React.createElement(Redirect, { to: HOME })))));
};

/** Modular error boundary, wrap all App components to intercept most of the errors thrown
 *
 * @param {() => JSX.Element} fallback custom fallback displayed when an error is catched
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({
            hasError: true,
        });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            window.document.title = "Error";
            return (this.props.fallback || (React.createElement("div", { style: {
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                } },
                React.createElement("div", { style: { margin: "auto" } },
                    React.createElement(Button, { style: { fontSize: "3rem", padding: "1rem" }, className: "error-button", onClick: function () {
                            window.location.reload();
                        } }, "Try again")))));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));

/**
 * Returns modular-engine drawer visibility
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#ui
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
var isDrawerOpen = createModularSelector(getUIView, function (_a) {
    var isDrawerOpen = _a.isDrawerOpen;
    return isDrawerOpen;
});

var AppDrawer = function (_a) {
    var children = _a.children, position = _a.position;
    var dispatch = useDispatch();
    var isDrawerShowing = useSelector(isDrawerOpen);
    /* istanbul ignore next */
    React.useEffect(function () {
        if (isDrawerShowing) {
            var element_1 = document.getElementById("modular-drawer");
            var app = document.getElementById("app-container");
            if (app) {
                app.onclick = function (e) {
                    if (element_1 && !element_1.contains(e.target)) {
                        dispatch(closeDrawer());
                    }
                };
            }
        }
        return function () {
            var app = document.getElementById("app-container");
            if (app) {
                app.onclick = null;
            }
        };
    }, [dispatch, isDrawerShowing]);
    var DrawerComponent = driveWithDarkMode(Drawer);
    return (React.createElement(DrawerComponent, { hide: !isDrawerShowing, onClose: function () {
            dispatch(closeDrawer());
        }, position: position }, children));
};

/**
 * Modular main app, rendered at the end of the init process.
 *
 * @param {Store} store redux store, used to drive app components (enhanced with `modular-engine`)
 * @param {History} history history object, used for routing logic
 * @param {AppConfig} config app config, to determine which components will be rendered and where
 * @param {{ ui?: boolean; modal?: boolean }} engine app engine config, the same config file passed to modular-engine initStore function
 * @param {Theme} theme app custom theme, to customize some UI parts
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
var MainApp = function (_a) {
    var store = _a.store, config = _a.config, engineConfig = _a.engineConfig;
    if (store && config && engineConfig) {
        var CustomContent = config.content;
        var HeaderContent = config.header;
        var FooterContent = config.footer;
        var DrawerContent = config.drawer && config.drawer.content;
        var Preloader = config.preloader;
        var drawerProps = config.drawer
            ? {
                children: config.drawer.content,
                position: config.drawer.position,
            }
            : {};
        var AppContainer = driveWithDarkMode(Container);
        return (React.createElement(React.Suspense, { fallback: Preloader ? React.createElement(Preloader, null) : React.createElement("div", null) },
            React.createElement(Provider, { store: store },
                React.createElement(ErrorBoundary, { fallback: config.error },
                    config.modals && (React.createElement(AppModal, { store: store, namespace: config.modalNamepsace, modals: config.modals })),
                    DrawerContent && (React.createElement(AppDrawer, __assign({}, drawerProps), DrawerContent && React.createElement(DrawerContent, null))),
                    React.createElement("div", { id: "app-container", style: {
                            height: "100vh",
                            width: "100vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflow: "hidden",
                        } },
                        HeaderContent && (React.createElement("header", { style: {
                                position: "relative",
                                top: "0",
                                right: "0",
                                left: "0",
                                width: "100%",
                            } },
                            React.createElement(AppContainer, null,
                                React.createElement(HeaderContent, null)))),
                        React.createElement(AppRouter, { renderCallback: config.pagesRendering || (function (route) { return function () { return React.createElement("div", null); }; }), history: engineConfig.history }),
                        CustomContent && React.createElement(CustomContent, null),
                        FooterContent && (React.createElement("footer", { style: {
                                width: "100%",
                                position: "relative",
                                bottom: 0,
                                left: "0",
                                right: "0",
                            } },
                            React.createElement(AppContainer, null,
                                React.createElement(FooterContent, null)))))))));
    }
    else {
        return React.createElement("div", null);
    }
};

var createModularApp = function (_a) {
    var creatorConfig = _a.creatorConfig, engineConfig = _a.engineConfig, store = _a.store;
    return function () {
        return MainApp({
            engineConfig: engineConfig,
            config: creatorConfig,
            store: store,
        });
    };
};

export { closeDrawer, createModularApp, driveWithDarkMode, initModularEngine, isDrawerOpen, openDrawer };
