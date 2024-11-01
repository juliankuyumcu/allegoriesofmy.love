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
    const poemRes = await strapiFetch({
        method: "GET",
        slug: "writings",
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: ["colour", "writingMedia.media"],
    });

    return poemRes.data.length > 0 ? poemRes.data[0] : null;
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
            writingMedia={poem.attributes.writingMedia}
            gradient={poem.attributes.gradient}
            colour={poem.attributes.colour}
        />
    );
}
