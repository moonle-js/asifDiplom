import { useRef, useState } from "react"

export default function HomePage(){
    const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Display the image directly
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageSrc && (
        <div>
          <h2>Selected Image:</h2>
          <img src={imageSrc} alt="Selected" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
}