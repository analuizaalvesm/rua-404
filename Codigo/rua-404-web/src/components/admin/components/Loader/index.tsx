import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {
  inverted?: boolean;
};

const Loader = ({ inverted }: LoaderProps) => {
  return (
    <div
      className={`flex h-screen items-center justify-center dark:bg-gray-900 $inverted ? "bg-black" : "bg-white"`}
    >
      {/* <CircularProgress color={`$inverted ? "primary" : "inherit"`} size={64} /> */}
      {inverted ? (
        <CircularProgress style={{ color: "white" }} size={64} />
      ) : (
        <CircularProgress color="inherit" size={64} />
      )}
    </div>
  );
};

export default Loader;
