declare namespace _default {
    let paint_raster: {
        'raster-color': {
            type: string;
            'property-type': string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            transition: boolean;
            default: string;
        };
        'raster-color-mix': {
            type: string;
            value: string;
            length: number;
            'property-type': string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            transition: boolean;
            default: number[];
        };
        'raster-color-range': {
            type: string;
            value: string;
            length: number;
            'property-type': string;
            expression: {
                interpolated: boolean;
                parameters: string[];
            };
            transition: boolean;
            default: number[];
        };
    };
}
export default _default;
