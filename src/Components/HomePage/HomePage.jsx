import { useRef, useState } from "react"
import image from '../../Images/logo.jpg'
import image1 from '../../Images/logo1.jpg'

export default function HomePage(){
  // const [imageSrc, setImageSrc] = useState(null);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];

  //   // Display the image directly
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };



  return (
    // <div>
    //   <input type="file" accept="image/*" onChange={handleImageChange} />
    //   {imageSrc && (
    //     <div>
    //       <h2>Selected Image:</h2>
    //       <img src={imageSrc} alt="Selected" style={{ width: '300px' }} />
    //     </div>
    //   )}
    // </div>

    <section className="w-[80%]  h-[400px] flex items-center justify-between">
      <img className="w-[auto] max-w-[500px] h-[400px]" src={image} alt="" />
      <img className="w-[auto] h-[400px] max-w-[500px]" src={image1} alt="" />
    </section>
  );
}