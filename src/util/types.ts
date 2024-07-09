export type ColourType = {
    data?: {
        attributes?: {
            label?: string;
            hexCode?: string;
        };
    };
};

export type MediaType = {
    data?: {
        attributes?: {
            url?: string;
        };
    };
};

export type WritingType = {
    id?: number;
    attributes: {
        title?: string;
        type?: string;
        preview?: string;
        content?: string;
        slug?: string;
        gradient?: string;
        media?: MediaType;
        colour?: ColourType;
    };
};
