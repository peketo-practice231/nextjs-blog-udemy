import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";

import Link from "next/link";
import utilStyle from "@/styles/utils.module.css";
import { getPostsData } from "@/lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   }
// }

export default function Home({ allPostData }) {
  return (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section>
      <p className={utilStyle.headingMd}>
        エンジニアのブログへようこそ！このブログでは、最新の技術トレンドや開発のヒントを共有しています。ぜひご覧ください。
      </p>
    </section>

    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
          <Link href={`/posts/${id}`}>
            <img src={`${thumbnail}`} className={styles.thumbnailImage} />
          </Link>
          <Link href={`/posts/${id}`} className={utilStyle.boldText}>
            {title}
          </Link>
          <br />
          <small className={utilStyle.lightText}>
            {date}
          </small>
        </article>
        ))}
      </div>
    </section>
  </Layout>
  );
}