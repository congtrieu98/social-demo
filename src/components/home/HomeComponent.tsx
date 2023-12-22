import CreatePost from "./CreatePost";
import HeaderArticle from "./articles/HeaderArticle";
import ContentArticle from "./articles/ContentArticle";
import FooterArticle from "./articles/FooterArticle";
import LoadingProgress from "./loadingProgress/LoadingProgress";
import FooterPage from "./footerPage/FooterPage";


export default async function HomeComponent() {

  return (
    <>
      <CreatePost />
      <div className="article flex max-w-full flex-col py-4 items-start gap-2.5 rounded-[20px] bg-white">
        
        <HeaderArticle />

        <ContentArticle /> 

        <FooterArticle />

      </div>

      <LoadingProgress />

      <FooterPage />
    </>

  );
}
