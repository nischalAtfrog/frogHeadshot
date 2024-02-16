import cameraShutter from "@/assets/audio/camera-shutter.mp3";

const CameraShutter = () => {
  const playChime = () => {
    const audio = new Audio(cameraShutter); // Replace '/path_to_chime_sound.mp3' with the actual path to your chime sound file
    audio.play();
  };

  return (
    <div>
      <button onClick={playChime}>play</button>
    </div>
  );
};

export default CameraShutter;
