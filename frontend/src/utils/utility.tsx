import { Link } from "react-router-dom";
import routes from "../routes";

export const limitText = (text: string, limit: number): string => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

export const getPostDescription = (description: string | null) => {
  if (description) {
    const arrayOfWord = description.split(" ");
    return arrayOfWord.map((word, i) =>
      word.startsWith("#") ? (
        <Link
          key={i}
          className="text-blue-900"
          to={routes.tags(word.replace("#", ""))}
        >
          {word + " "}
        </Link>
      ) : (
        word + " "
      )
    );
  }
  return "";
};

export const getCommentText = (text: string | null) => {
  if (text) {
    const arrayOfWord = text.split(" ");
    return arrayOfWord.map((word, i) =>
      word.startsWith("@") ? (
        <Link
          key={i}
          className="text-blue-900"
          to={routes.userProfile(word.replace("@", ""))}
        >
          {word + " "}
        </Link>
      ) : (
        word + " "
      )
    );
  }
  return "";
};
