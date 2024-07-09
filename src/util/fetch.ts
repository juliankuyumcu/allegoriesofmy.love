export const strapiFetch = async (
    query: string,
    method: string,
    body?: object,
): Promise<any> => {
    const strapiRes = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" + query,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        },
    );
    const strapiJSON = await strapiRes.json();

    return strapiJSON.data;
};
