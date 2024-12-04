import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
      <CircularProgress color="inherit" size={64} />
    </div>
  );
};

export default Loader;
