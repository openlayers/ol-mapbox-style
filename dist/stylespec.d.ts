declare const _default: {
    layout_background: {
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_circle: {
        'circle-sort-key': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    'layout_color-relief': {
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_fill: {
        'fill-sort-key': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    'layout_fill-extrusion': {
        'fill-extrusion-rounded-corner-distance': {
            type: string;
            default: number;
            'property-type': string;
        };
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_heatmap: {
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_hillshade: {
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_line: {
        'line-cap': {
            type: string;
            values: {
                butt: {};
                round: {};
                square: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-join': {
            type: string;
            values: {
                bevel: {};
                round: {};
                miter: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-miter-limit': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-round-limit': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-sort-key': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_raster: {
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    layout_symbol: {
        'icon-allow-overlap': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-anchor': {
            type: string;
            values: {
                center: {};
                left: {};
                right: {};
                top: {};
                bottom: {};
                'top-left': {};
                'top-right': {};
                'bottom-left': {};
                'bottom-right': {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-ignore-placement': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-image': {
            type: string;
            tokens: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-keep-upright': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-offset': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-optional': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-overlap': {
            type: string;
            values: {
                never: {};
                always: {};
                cooperative: {};
            };
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-padding': {
            type: string;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-pitch-alignment': {
            type: string;
            values: {
                map: {};
                viewport: {};
                auto: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-rotate': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-rotation-alignment': {
            type: string;
            values: {
                map: {};
                viewport: {};
                auto: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-size': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-text-fit': {
            type: string;
            values: {
                none: {};
                width: {};
                height: {};
                both: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-text-fit-padding': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-avoid-edges': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-height-anchor': {
            type: string;
            values: {
                ground: {};
                absolute: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-height-offset': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-placement': {
            type: string;
            values: {
                point: {};
                line: {};
                'line-center': {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-sort-key': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-spacing': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'symbol-z-order': {
            type: string;
            values: {
                auto: {};
                'viewport-y': {};
                source: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-allow-overlap': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-anchor': {
            type: string;
            values: {
                center: {};
                left: {};
                right: {};
                top: {};
                bottom: {};
                'top-left': {};
                'top-right': {};
                'bottom-left': {};
                'bottom-right': {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-field': {
            type: string;
            default: string;
            tokens: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-font': {
            type: string;
            value: string;
            default: string[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-ignore-placement': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-justify': {
            type: string;
            values: {
                auto: {};
                left: {};
                center: {};
                right: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-keep-upright': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-letter-spacing': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-line-height': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-max-angle': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-max-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-offset': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-optional': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-overlap': {
            type: string;
            values: {
                never: {};
                always: {};
                cooperative: {};
            };
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-padding': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-pitch-alignment': {
            type: string;
            values: {
                map: {};
                viewport: {};
                auto: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-radial-offset': {
            type: string;
            default: number;
            'property-type': string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
        };
        'text-rotate': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-rotation-alignment': {
            type: string;
            values: {
                map: {};
                viewport: {};
                'viewport-glyph': {};
                auto: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-size': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-transform': {
            type: string;
            values: {
                none: {};
                uppercase: {};
                lowercase: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-variable-anchor': {
            type: string;
            value: string;
            values: {
                center: {};
                left: {};
                right: {};
                top: {};
                bottom: {};
                'top-left': {};
                'top-right': {};
                'bottom-left': {};
                'bottom-right': {};
            };
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-variable-anchor-offset': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-writing-mode': {
            type: string;
            value: string;
            values: {
                horizontal: {};
                vertical: {};
            };
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        visibility: {
            type: string;
            values: {
                visible: {};
                none: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_background: {
        'background-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'background-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'background-pattern': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_circle: {
        'circle-blur': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-pitch-alignment': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-pitch-scale': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-radius': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-stroke-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-stroke-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-stroke-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'circle-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    'paint_color-relief': {
        'color-relief-color': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'color-relief-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        resampling: {
            type: string;
            values: {
                linear: {};
                nearest: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_fill: {
        'fill-antialias': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-layer-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-outline-color': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-pattern': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    'paint_fill-extrusion': {
        'fill-extrusion-base': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-height': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-pattern': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'fill-extrusion-vertical-gradient': {
            type: string;
            default: boolean;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_heatmap: {
        'heatmap-color': {
            type: string;
            default: (string | number | string[])[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'heatmap-intensity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'heatmap-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'heatmap-radius': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'heatmap-weight': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_hillshade: {
        'hillshade-accent-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-exaggeration': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-highlight-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-illumination-altitude': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-illumination-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-illumination-direction': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-method': {
            type: string;
            values: {
                standard: {};
                basic: {};
                combined: {};
                igor: {};
                multidirectional: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'hillshade-shadow-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        resampling: {
            type: string;
            values: {
                linear: {};
                nearest: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_line: {
        'line-blur': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-dasharray': {
            type: string;
            value: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-gap-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-gradient': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-layer-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-offset': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-pattern': {
            type: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'line-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_raster: {
        'raster-brightness-max': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-brightness-min': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-contrast': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-fade-duration': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-hue-rotate': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-resampling': {
            type: string;
            values: {
                linear: {};
                nearest: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'raster-saturation': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        resampling: {
            type: string;
            values: {
                linear: {};
                nearest: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
    paint_symbol: {
        'icon-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-halo-blur': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-halo-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-halo-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'icon-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-halo-blur': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-halo-color': {
            type: string;
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-halo-width': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-opacity': {
            type: string;
            default: number;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-translate': {
            type: string;
            value: string;
            length: number;
            default: number[];
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
        'text-translate-anchor': {
            type: string;
            values: {
                map: {};
                viewport: {};
            };
            default: string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            'property-type': string;
        };
    };
};
export default _default;
