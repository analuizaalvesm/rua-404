import { mediaItems } from "./mediaItems";

const DraggableGallery = () => {
  return (
    <div className="px-16 py-8 bg-black">
      <div
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {mediaItems.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`Media ${index}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                loop
                controls
                autoPlay
                muted
                className="w-full h-full object-cover"
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableGallery;
