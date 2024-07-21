import axios from "axios";
import qs from "qs";

interface strapiFetchArgs {
    method?: string;
    params?: object;
    slug?: string;
    jwt?: string;
    populate?: string | Array<string> | object;
    fields?: string | Array<string> | object;
    filters?: object;
    sort?: object;
    pagination?: object;
    body?: object;
}

export const strapiFetch = async ({
    method,
    params,
    slug,
    jwt,
    populate,
    fields,
    filters,
    sort,
    pagination,
    body,
}: strapiFetchArgs): Promise<any> => {
    const query = qs.stringify(
        {
            ...params,
            populate,
            fields,
            filters,
            sort,
            pagination,
        },
        { encodeValuesOnly: true },
    );

    const requestConfig = {
        method: method,
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${slug}${query && `?${query}`}`,
        headers: {
            "Content-Type": "application/json",
            ...(jwt && {
                Authorization: `Bearer ${jwt}`,
            }),
        },
        ...(body && {
            body: JSON.stringify(body),
        }),
    };

    const strapiJSON = await axios.request(requestConfig);

    return strapiJSON.data;
};
