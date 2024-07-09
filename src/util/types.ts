export type ColourType = {
    data: {
        attributes: {
            label?: string;
            hexCode?: string;
        };
    };
};

export type MediaType = {
    data: {
        attributes?: {
            url?: string;
        };
    };
};

export type WritingMediaType = {
    data: {
        attributes: {
            media?: MediaType;
            gradient?: string;
        };
    };
};

export type WritingType = {
    id: number;
    attributes: {
        title?: string;
        type?: string;
        preview?: string;
        content?: string;
        slug?: string;
        gradient?: string;
        writingMedia?: WritingMediaType;
        colour?: ColourType;
    };
};
