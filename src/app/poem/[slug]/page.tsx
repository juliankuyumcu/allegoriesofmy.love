import Writing from "@/components/Writing";
import { WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";
import { notFound } from "next/navigation";

interface PoemParams {
    params: {
        slug: string;
    };
}

const getPoem = async (slug: string): Promise<WritingType> => {
    const poemData = await strapiFetch(
        `writings?filters[slug][$eq]=${slug}&populate=*`,
        "GET",
    );
    console.log(poemData.length);
    return poemData.length > 0 ? poemData[0] : null;
};

export default async function Poem({ params: { slug } }: PoemParams) {
    const poem = await getPoem(slug);

    return !poem ? (
        notFound()
    ) : (
        <Writing
            title={poem.attributes.title}
            type={poem.attributes.type}
            content={poem.attributes.content}
            media={poem.attributes.media}
            gradient={poem.attributes.gradient}
            colour={poem.attributes.colour}
        />
    );
}
