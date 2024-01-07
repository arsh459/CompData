import { PostOrPage } from "@tryghost/content-api";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
interface Props {
  post: PostOrPage;
  styles: {
    [key: string]: string;
  };
  index: number;
}
const GhostListing: React.FC<Props> = ({ post, styles, index }) => {
  const postedOn =
    post.published_at && format(new Date(post.published_at), "PP");

  return (
    <article
      key={post.id}
      className={clsx(
        styles["post-card"],
        styles.post,
        "   cursor-pointer px-4",
        index === 0 && styles["post-card-large"],
        index === 1 || index === 2 ? styles.dynamic : ""
      )}
    >
      <Link
        href={`/blog/post/${post.slug}`}
        className="post-card-image-link  "
        target="_blank"
      >
        <div>
          <img
            // className={clsx(
            //   "",
            //   index !== 0 ? "  bg-red-500" : " w-full h-full"
            // )}
            src={post.feature_image ? post.feature_image : ""}
            alt={post.feature_image_alt ? post.feature_image_alt : ""}
            loading="lazy"
          />

          <div className={clsx(styles["post-card-content"])}>
            <header className={clsx(styles["post-card-header"])}>
              <div className={clsx(styles["post-card-tags"])}>
                <span className={clsx(styles["post-card-primary-tag"])}>
                  {post.primary_tag?.name}
                </span>
              </div>
            </header>
            <h2 className={clsx(styles["post-card-title"], "leading-none")}>
              {post.title}
            </h2>
            <div className={styles["post-card-excerpt"]}>{post.excerpt}</div>
            <footer className={styles["post-card-meta"]}>
              <time
                className={styles["post-card-meta-date"]}
                dateTime={postedOn as string | undefined}
              >
                {postedOn}
              </time>
              <span className={styles["post-card-meta-length"]}>
                {post.reading_time ? `${post.reading_time} min read` : ""}
              </span>
            </footer>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default GhostListing;
