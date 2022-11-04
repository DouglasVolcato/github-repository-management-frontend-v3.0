import { PageTitle } from "../components/PageTitle";
import { UserImage } from "../components/UserImage";

export default function NotFound() {
  return (
    <div>
      <PageTitle name="Error 404:" />
      <PageTitle name="Page not found" />
      <UserImage
        link={
          "https://i.pinimg.com/originals/b3/5e/73/b35e73063c8e30f2bc49f0a2507fa200.jpg"
        }
      />
    </div>
  );
}
