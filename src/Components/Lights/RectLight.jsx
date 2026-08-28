export default function RectLight(props) {
  return (
    <rectAreaLight
      color={props.color}
      intensity={props.intensity}
      width={props.width}
      height={props.height}
      position={props.position}
      rotation={props.rotation}
      ref={props.refName}
    />
  );
}
