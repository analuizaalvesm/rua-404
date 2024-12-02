import Image1 from "@/assets/gallery/images/media1.jpg";
import Image2 from "@/assets/gallery/images/media2.jpg";
import Image3 from "@/assets/gallery/images/media3.png";
import Image4 from "@/assets/gallery/images/media4.jpg";
import Image5 from "@/assets/gallery/images/media5.jpg";
import Image6 from "@/assets/gallery/images/media6.jpg";
import Image7 from "@/assets/gallery/images/media7.jpg";
import Image8 from "@/assets/gallery/images/media8.jpg";
import Image9 from "@/assets/gallery/images/media9.jpg";
import Image10 from "@/assets/gallery/images/media10.jpg";
import Image11 from "@/assets/gallery/images/media11.jpg";
import Image12 from "@/assets/gallery/images/media12.jpg";
import Image13 from "@/assets/gallery/images/media13.jpg";
import Image14 from "@/assets/gallery/images/media14.jpg";
import Image15 from "@/assets/gallery/images/media15.jpg";
import Image16 from "@/assets/gallery/images/media16.jpg";
import Image17 from "@/assets/gallery/images/media17.jpg";
import Image18 from "@/assets/gallery/images/media18.jpg";
import Image19 from "@/assets/gallery/images/media19.jpg";
import Image20 from "@/assets/gallery/images/media20.jpg";
import Image21 from "@/assets/gallery/images/media21.jpg";
import Image22 from "@/assets/gallery/images/media22.jpg";
import Image23 from "@/assets/gallery/images/mediabr.jpg";
import Image24 from "@/assets/gallery/images/mediarua.png";

import Video1 from "@/assets/gallery/videos/media1.mp4";
import Video2 from "@/assets/gallery/videos/media2.mp4";
import Video3 from "@/assets/gallery/videos/media3.mp4";
import Video4 from "@/assets/gallery/videos/media4.mp4";
import Video5 from "@/assets/gallery/videos/media5.mp4";
import Video6 from "@/assets/gallery/videos/media6.mp4";
import Video7 from "@/assets/gallery/videos/media7.mp4";
import Video8 from "@/assets/gallery/videos/media8.mp4";
import Video9 from "@/assets/gallery/videos/media9.mp4";
import Video10 from "@/assets/gallery/videos/media10.mp4";
import Video11 from "@/assets/gallery/videos/media11.mp4";
import Video12 from "@/assets/gallery/videos/media12.mp4";
import Video13 from "@/assets/gallery/videos/media13.mp4";

export const mediaItems = [
  { type: "image", src: Image1 },
  { type: "video", src: Video13 },
  { type: "image", src: Image2 },
  { type: "video", src: Video1 },
  { type: "image", src: Image3 },
  { type: "video", src: Video2 },
  { type: "image", src: Image4 },
  { type: "video", src: Video3 },
  { type: "image", src: Image5 },
  { type: "video", src: Video4 },
  { type: "image", src: Image6 },
  { type: "video", src: Video5 },
  { type: "image", src: Image7 },
  { type: "video", src: Video6 },
  { type: "image", src: Image8 },
  { type: "image", src: Image9 },
  { type: "image", src: Image10 },
  { type: "image", src: Image11 },
  { type: "image", src: Image12 },
  { type: "image", src: Image13 },
  { type: "image", src: Image14 },
  { type: "image", src: Image15 },
  { type: "image", src: Image16 },
  { type: "image", src: Image17 },
  { type: "image", src: Image18 },
  { type: "video", src: Video7 },
  { type: "image", src: Image19 },
  { type: "video", src: Video8 },
  { type: "image", src: Image20 },
  { type: "image", src: Image21 },
  { type: "video", src: Video9 },
  { type: "video", src: Video10 },
  { type: "image", src: Image22 },
  { type: "video", src: Video11 },
  { type: "image", src: Image23 },
  { type: "video", src: Video12 },
  { type: "image", src: Image24 },
];

export const shuffledMediaItems = [...mediaItems].sort(
  () => Math.random() - 0.5
);
