var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/home/gabe/github.com/gmencz/puzzles-game/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
var import_remix2 = __toModule(require("remix"));

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-BLLRKVSK.css";

// route-module:/home/gabe/github.com/gmencz/puzzles-game/app/root.tsx
function links() {
  return [{ rel: "stylesheet", href: tailwind_default }];
}
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Error!"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "There was an error"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see.")));
}
function CatchBoundary() {
  let caught = (0, import_remix2.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
      break;
    case 404:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React.createElement("h1", null, caught.status, ": ", caught.statusText), message);
}
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)));
}

// route-module:/home/gabe/github.com/gmencz/puzzles-game/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});

// app/components/jigsaw-puzzle.tsx
var import_react = __toModule(require("react"));
var import_clsx = __toModule(require("clsx"));
var clamp = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};
var solveTolerancePercentage = 0.028;
function JigsawPuzzle({
  imageSrc,
  rows = 3,
  columns = 4,
  onSolved = () => {
  },
  onTileSolved = () => {
  }
}) {
  let [tiles, setTiles] = (0, import_react.useState)();
  let [imageSize, setImageSize] = (0, import_react.useState)();
  let [rootSize, setRootSize] = (0, import_react.useState)();
  let [calculatedHeight, setCalculatedHeight] = (0, import_react.useState)();
  let rootElement = (0, import_react.useRef)();
  let resizeObserver = (0, import_react.useRef)();
  let draggingTile = (0, import_react.useRef)();
  let draggingClasses = ["shadow-2xl", "z-[5]"];
  let onImageLoaded = (0, import_react.useCallback)((image) => {
    setImageSize({ width: image.width, height: image.height });
    if (rootSize) {
      setCalculatedHeight(rootSize.width / image.width * image.height);
    }
    setTiles(Array.from(Array(rows * columns).keys()).map((position) => ({
      correctPosition: position,
      tileHeight: image.height / rows,
      tileWidth: image.width / columns,
      tileOffsetX: position % columns * (image.width / columns),
      tileOffsetY: Math.floor(position / columns) * (image.height / rows),
      currentPosXPerc: Math.random() * (1 - 1 / rows),
      currentPosYPerc: Math.random() * (1 - 1 / columns),
      solved: false
    })));
  }, [rows, columns]);
  let onRootElementResized = (0, import_react.useCallback)((args) => {
    var _a;
    let contentRect = (_a = args.find((it) => it.contentRect)) == null ? void 0 : _a.contentRect;
    if (contentRect) {
      setRootSize({
        width: contentRect.width,
        height: contentRect.height
      });
      if (imageSize) {
        setCalculatedHeight(contentRect.width / imageSize.width * imageSize.height);
      }
    }
  }, [setRootSize, imageSize]);
  let onRootElementRendered = (0, import_react.useCallback)((element) => {
    if (element) {
      rootElement.current = element;
      let observer = new ResizeObserver(onRootElementResized);
      observer.observe(element);
      resizeObserver.current = observer;
      setRootSize({
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      if (imageSize) {
        setCalculatedHeight(element.offsetWidth / imageSize.width * imageSize.height);
      }
    }
  }, [setRootSize, imageSize, rootElement, resizeObserver]);
  (0, import_react.useEffect)(() => {
    let image = new Image();
    image.onload = () => onImageLoaded(image);
    image.src = imageSrc;
  }, [imageSrc, rows, columns]);
  let onTileMouseDown = (0, import_react.useCallback)((tile, event) => {
    if (!tile.solved) {
      if (event.type === "touchstart") {
        document.documentElement.style.setProperty("overflow", "hidden");
      }
      let eventPos = {
        x: event.pageX ?? event.touches[0].pageX,
        y: event.pageY ?? event.touches[0].pageY
      };
      draggingTile.current = {
        tile,
        elem: event.target,
        mouseOffsetX: eventPos.x - event.target.getBoundingClientRect().x,
        mouseOffsetY: eventPos.y - event.target.getBoundingClientRect().y
      };
      event.target.classList.add(...draggingClasses);
    }
  }, [draggingTile]);
  let onRootMouseMove = (0, import_react.useCallback)((event) => {
    if (draggingTile.current) {
      event.stopPropagation();
      event.preventDefault();
      let eventPos = {
        x: event.pageX ?? event.touches[0].pageX,
        y: event.pageY ?? event.touches[0].pageY
      };
      let draggedToRelativeToRoot = {
        x: clamp(eventPos.x - rootElement.current.getBoundingClientRect().left - draggingTile.current.mouseOffsetX, 0, rootSize.width - draggingTile.current.elem.offsetWidth),
        y: clamp(eventPos.y - rootElement.current.getBoundingClientRect().top - draggingTile.current.mouseOffsetY, 0, rootSize.height - draggingTile.current.elem.offsetHeight)
      };
      draggingTile.current.elem.style.setProperty("left", `${draggedToRelativeToRoot.x}px`);
      draggingTile.current.elem.style.setProperty("top", `${draggedToRelativeToRoot.y}px`);
    }
  }, [draggingTile, rootSize]);
  let onRootMouseUp = (0, import_react.useCallback)((event) => {
    var _a;
    if (draggingTile.current) {
      if (event.type === "touchend") {
        document.documentElement.style.removeProperty("overflow");
      }
      (_a = draggingTile.current) == null ? void 0 : _a.elem.classList.remove(...draggingClasses);
      let draggedToPercentage = {
        x: clamp(draggingTile.current.elem.offsetLeft / rootSize.width, 0, 1),
        y: clamp(draggingTile.current.elem.offsetTop / rootSize.height, 0, 1)
      };
      let draggedTile = draggingTile.current.tile;
      let targetPositionPercentage = {
        x: draggedTile.correctPosition % columns / columns,
        y: Math.floor(draggedTile.correctPosition / columns) / rows
      };
      let isSolved = Math.abs(targetPositionPercentage.x - draggedToPercentage.x) <= solveTolerancePercentage && Math.abs(targetPositionPercentage.y - draggedToPercentage.y) <= solveTolerancePercentage;
      if (isSolved) {
        onTileSolved(draggedTile);
      }
      setTiles((prevState) => [
        ...prevState.filter((it) => it.correctPosition !== draggedTile.correctPosition),
        __spreadProps(__spreadValues({}, draggedTile), {
          currentPosXPerc: !isSolved ? draggedToPercentage.x : targetPositionPercentage.x,
          currentPosYPerc: !isSolved ? draggedToPercentage.y : targetPositionPercentage.y,
          solved: isSolved
        })
      ]);
      draggingTile.current = void 0;
    }
  }, [draggingTile, setTiles, rootSize, onSolved]);
  (0, import_react.useEffect)(() => {
    if (!tiles) {
      return;
    }
    if (tiles.every((tile) => tile.solved)) {
      onSolved();
    }
  }, [tiles]);
  return /* @__PURE__ */ React.createElement("div", {
    ref: onRootElementRendered,
    onTouchMove: onRootMouseMove,
    onMouseMove: onRootMouseMove,
    onTouchEnd: onRootMouseUp,
    onMouseUp: onRootMouseUp,
    onTouchCancel: onRootMouseUp,
    onMouseLeave: onRootMouseUp,
    style: {
      height: !calculatedHeight ? void 0 : `${calculatedHeight}px`
    },
    className: "relative",
    onDragEnter: (event) => {
      event.stopPropagation();
      event.preventDefault();
    },
    onDragOver: (event) => {
      event.stopPropagation();
      event.preventDefault();
    }
  }, tiles && rootSize && imageSize && tiles.map((tile) => /* @__PURE__ */ React.createElement("div", {
    draggable: false,
    onMouseDown: (event) => onTileMouseDown(tile, event),
    onTouchStart: (event) => onTileMouseDown(tile, event),
    key: tile.correctPosition,
    className: (0, import_clsx.default)("absolute z-[1] select-none cursor-pointer", tile.solved && "ring-0 z-0 cursor-default"),
    style: {
      height: `${1 / rows * 100}%`,
      width: `${1 / columns * 100}%`,
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: `${rootSize.width}px ${rootSize.height}px`,
      backgroundPositionX: `${tile.correctPosition % columns / (columns - 1) * 100}%`,
      backgroundPositionY: `${Math.floor(tile.correctPosition / columns) / (rows - 1) * 100}%`,
      left: `${tile.currentPosXPerc * rootSize.width}px`,
      top: `${tile.currentPosYPerc * rootSize.height}px`
    }
  })));
}

// route-module:/home/gabe/github.com/gmencz/puzzles-game/app/routes/index.tsx
function Index() {
  let imageSrc = "https://images.ctfassets.net/j95d1p8hsuun/29peK2k7Ic6FsPAVjHWs8W/06d3add40b23b20bbff215f6979267e8/NW_OPENGRAPH_1200x630.jpg";
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-full relative p-6"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "top-0 left-0 w-[600px]",
    src: imageSrc,
    alt: "New World"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "mt-12 relative"
  }, /* @__PURE__ */ React.createElement(JigsawPuzzle, {
    imageSrc,
    rows: 2,
    columns: 2,
    onSolved: () => alert("Solved!")
  })));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
