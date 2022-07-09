/* eslint-disable */'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var modularEngine = require('modular-engine');
var modularUtils = require('modular-utils');
var React = require('react');
var reactRedux = require('react-redux');
var modularPlugins = require('modular-plugins');
var modularUiComponents = require('modular-ui-components');
var reactRouterDom = require('react-router-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
var openDrawer = modularUtils.createModularAction("@@ui/OPEN_DRAWER");
/**
 * Close modular-engine drawer
 *
 */
var closeDrawer = modularUtils.createModularAction("@@ui/CLOSE_DRAWER");

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
    return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('modular-plugins')); }).then(function (_a) {
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
        var _b = modularEngine.initEngine({ config: engineConfig }), store = _b.store, output = _b.config;
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
        var dark = reactRedux.useSelector(modularPlugins.isInDarkMode);
        return Element(__assign(__assign({}, args), { dark: dark }));
    };
    return Component;
};

var AppModal = function (_a) {
    var modals = _a.modals; _a.namespace; var store = _a.store;
    var type = reactRedux.useSelector(modularPlugins.getModalType);
    var isVisible = reactRedux.useSelector(modularPlugins.isModalVisible);
    var ModalContent = type && modals[type] ? modals[type] : function () { return React__default["default"].createElement("div", null); };
    var ModalComponent = driveWithDarkMode(modularUiComponents.Modal);
    return (React__default["default"].createElement(ModalComponent, { onClose: function () { return store.dispatch(modularPlugins.closeModal()); }, hide: !isVisible },
        React__default["default"].createElement(ModalContent, null)));
};

var AppRouter = function (_a) {
    var history = _a.history, renderCallback = _a.renderCallback;
    var PAGES = reactRedux.useSelector(modularPlugins.getRoutes);
    var HOME = reactRedux.useSelector(modularPlugins.getHomePage);
    return (React__default["default"].createElement(modularUiComponents.Container, { unstyled: true, style: {
            position: "relative",
            width: "100%",
            overflow: "auto",
            height: "100%",
        } },
        React__default["default"].createElement(reactRouterDom.Router, { history: history },
            React__default["default"].createElement(reactRouterDom.Switch, null,
                Object.keys(PAGES).map(function (route) {
                    return (React__default["default"].createElement(reactRouterDom.Route, { component: renderCallback(route), key: route, exact: true, path: PAGES[route] }));
                }),
                React__default["default"].createElement(reactRouterDom.Redirect, { to: HOME })))));
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
            return (this.props.fallback || (React__default["default"].createElement("div", { style: {
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                } },
                React__default["default"].createElement("div", { style: { margin: "auto" } },
                    React__default["default"].createElement(modularUiComponents.Button, { style: { fontSize: "3rem", padding: "1rem" }, className: "error-button", onClick: function () {
                            window.location.reload();
                        } }, "Try again")))));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React__default["default"].Component));

/**
 * Returns modular-engine drawer visibility
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#ui
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
var isDrawerOpen = modularUtils.createModularSelector(modularPlugins.getUIView, function (_a) {
    var isDrawerOpen = _a.isDrawerOpen;
    return isDrawerOpen;
});

var AppDrawer = function (_a) {
    var children = _a.children, position = _a.position;
    var dispatch = reactRedux.useDispatch();
    var isDrawerShowing = reactRedux.useSelector(isDrawerOpen);
    /* istanbul ignore next */
    React__default["default"].useEffect(function () {
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
    var DrawerComponent = driveWithDarkMode(modularUiComponents.Drawer);
    return (React__default["default"].createElement(DrawerComponent, { hide: !isDrawerShowing, onClose: function () {
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
        var AppContainer = driveWithDarkMode(modularUiComponents.Container);
        return (React__default["default"].createElement(React__default["default"].Suspense, { fallback: Preloader ? React__default["default"].createElement(Preloader, null) : React__default["default"].createElement("div", null) },
            React__default["default"].createElement(reactRedux.Provider, { store: store },
                React__default["default"].createElement(ErrorBoundary, { fallback: config.error },
                    config.modals && (React__default["default"].createElement(AppModal, { store: store, namespace: config.modalNamepsace, modals: config.modals })),
                    DrawerContent && (React__default["default"].createElement(AppDrawer, __assign({}, drawerProps), DrawerContent && React__default["default"].createElement(DrawerContent, null))),
                    React__default["default"].createElement("div", { id: "app-container", style: {
                            height: "100vh",
                            width: "100vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflow: "hidden",
                        } },
                        HeaderContent && (React__default["default"].createElement("header", { style: {
                                position: "relative",
                                top: "0",
                                right: "0",
                                left: "0",
                                width: "100%",
                            } },
                            React__default["default"].createElement(AppContainer, null,
                                React__default["default"].createElement(HeaderContent, null)))),
                        React__default["default"].createElement(AppRouter, { renderCallback: config.pagesRendering || (function (route) { return function () { return React__default["default"].createElement("div", null); }; }), history: engineConfig.history }),
                        CustomContent && React__default["default"].createElement(CustomContent, null),
                        FooterContent && (React__default["default"].createElement("footer", { style: {
                                width: "100%",
                                position: "relative",
                                bottom: 0,
                                left: "0",
                                right: "0",
                            } },
                            React__default["default"].createElement(AppContainer, null,
                                React__default["default"].createElement(FooterContent, null)))))))));
    }
    else {
        return React__default["default"].createElement("div", null);
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

exports.closeDrawer = closeDrawer;
exports.createModularApp = createModularApp;
exports.driveWithDarkMode = driveWithDarkMode;
exports.initModularEngine = initModularEngine;
exports.isDrawerOpen = isDrawerOpen;
exports.openDrawer = openDrawer;
