import ProfileImage from "../../assets/images/profileImage.png";

const Usercard = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-row items-center gap-3 rounded-lg p-2 shadow-md my-2">
      <img src={ProfileImage} alt="Profile" width={40} height={40} />
      <p className=" text-primary font-medium ">{name}</p>
    </div>
  );
};

export default Usercard;
