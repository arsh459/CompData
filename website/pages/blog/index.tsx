import React from "react";
// import { format } from "date-fns";
// import DefaultLayout from "@layouts/DefaultLayout";
// import { rectWomenImg } from "@constants/seo";
// import { seoData } from "@constants/seoData";
import NewBlog from "@modules/NewBlog";

// export interface PostsAndPaginations {
//   posts?: PostsOrPages;
//   pagination?: Pagination;
// }

const BlogPosts = () => {
  return (
    // <DefaultLayout
    //   title={seoData.blogPage.title}
    //   description={seoData.blogPage.description}
    //   img={seoData.blogPage.img}
    //   link={seoData.blogPage.link}
    //   canonical={seoData.blogPage.link}
    //   siteName="SocialBoat"
    //   noIndex={false}
    //   rectImg={rectWomenImg}
    //   width={360}
    //   height={360}
    // >
    <NewBlog />
    // </DefaultLayout>
  );
};

export default BlogPosts;

// export const getStaticProps: GetStaticProps = async ({}) => {
//   const res = await getPostsAndUniqueTags();

//   if (!res?.posts) {
//     return {
//       revalidate: 1,
//       notFound: true,
//     };
//   }

//   return {
//     revalidate: 1,

//     props: { posts: res?.posts, pagination: res?.pagination },
//   };
// };
