import Error from "../modules/error";

export default function NotFound() {
  return (
    <Error
      status="404"
      title="გვერდი არ მოიძებნა"
      text="სამწუხაროდ, გვერდს რომელსაც ეძებთ, არ არსებობს"
    />
  );
}
