import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/consts";

export async function GET(context) {
    const posts = (await getCollection("posts", ({ data }) => !data.draft))
        .sort((a, b) => b.data.createdDate.valueOf() - a.data.createdDate.valueOf());

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title || post.id,
            description: post.data.description,
            createdDate: post.data.createdDate,
            link: `/posts/${post.id}/`,
        })),
    });
}
