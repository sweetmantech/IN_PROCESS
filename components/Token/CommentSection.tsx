import { useTokenProvider } from "@/providers/TokenProvider";
import CommentsContainer from "./CommentsContainer";
import ArtistName from "../ArtistName";
import { Skeleton } from "../ui/skeleton";

const CommentSection = () => {
  const { visibleComments, comments, showMoreComments, isLoading } =
    useTokenProvider();

  if (isLoading)
    return (
      <CommentsContainer>
        <Skeleton className="w-full h-[300px]" />
      </CommentsContainer>
    );
  if (comments.length === 0)
    return (
      <CommentsContainer>
        <p className="font-archivo">no comments yet</p>
        <p className="font-spectral-italic tracking-[-1px]">
          collect and be first
        </p>
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      <div className="space-y-1 md:space-y-2">
        {comments.slice(0, visibleComments).map((comment, i) => (
          <div key={i} className="rounded flex items-end justify-between">
            <div>
              <p className="text-base font-spectral tracking-[-1px]">
                {comment.comment}
              </p>
              <ArtistName
                address={comment.sender}
                className="text-base font-archivo-medium"
              />
            </div>
            <p className="text-sm font-archivo lowercase">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {comments.length > visibleComments && (
        <button
          onClick={showMoreComments}
          className="w-full py-2 mt-4 text-sm bg-black text-tan-primary font-archivo"
        >
          View More Comments
        </button>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
