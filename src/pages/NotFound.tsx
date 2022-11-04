import { PageTitle } from "../components/PageTitle";
import { UserImage } from "../components/UserImage";

export default function NotFound() {
  return (
    <div>
      <PageTitle name="Error 404:" />
      <PageTitle name="Page not found" />
      <UserImage
        link={
          "https://github.com/DouglasVolcato/github-repository-management-frontend-v3.0/blob/main/src/public/images/hiddenCat.jpg?raw=true"
        }
      />
    </div>
  );
}
