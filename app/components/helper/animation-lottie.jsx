// "use client";

// import Lottie from "lottie-react";

// const AnimationLottie = ({ animationPath, width }) => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationPath,
//     style: {
//       width: '95%',
//     }
//   };

//   return (
//     <Lottie {...defaultOptions} />
//   );
// };

// export default AnimationLottie;

"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AnimationLottie({ animationPath, width }) {
  return (
    <Lottie
      animationData={animationPath}
      loop
      autoplay
      style={{ width: width || "95%" }}
    />
  );
}
