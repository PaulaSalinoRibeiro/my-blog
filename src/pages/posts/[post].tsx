import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import PostLayout from "../../components/PostLayout";
import Profile from "../../components/Profile";
import DivisionLine from '../../components/DivisionLine';

export type Props = {
  title: string;
  date: string,
  subtitle: string,
  source: MdxRemote.Source;
};

const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  date,
  subtitle,
  source,
}: Props) {
  const content = hydrate(source)
  return (
    <div className="container">
      <Profile path="/images/profile.png"/>
      <DivisionLine />
      <PostLayout
        title={title}
        date={date}
        subtitle={subtitle}
      >
        {content}
      </PostLayout>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });

  const mdxSource = await renderToString(content, { scope: data });
  return {
    props: {
      title: data.title,
      date: data.date,
      subtitle: data.subtitle,
      source: mdxSource
    },
  };
};

