import Writing from "@/components/Writing";
import { WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";
import { notFound } from "next/navigation";

interface ShortStoryParams {
    params: {
        slug: string;
    };
}

const getShortStory = async (slug: string): Promise<WritingType> => {
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

export default async function ShortStory({
    params: { slug },
}: ShortStoryParams) {
    const shortStory = await getShortStory(slug);

    return !shortStory ? (
        notFound()
    ) : (
        <Writing
            title={shortStory.attributes.title}
            type={shortStory.attributes.type}
            content={shortStory.attributes.content}
            writingMedia={shortStory.attributes.writingMedia}
            gradient={shortStory.attributes.gradient}
            colour={shortStory.attributes.colour}
        />
    );
}
