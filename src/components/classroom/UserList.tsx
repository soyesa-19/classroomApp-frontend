import React from "react";
import Usercard from "../card/Usercard";
import { SessionUserData } from "../../types/session-events";

const UserList = ({ users }: { users: Record<string, SessionUserData> }) => {
  console.log(users);

  return (
    <div className=" md:w-1/4 shadow-md rounded-xl p-2">
      {Object.values(users).map((user) => (
        <Usercard name={user.username} />
      ))}
    </div>
  );
};

export default React.memo(UserList);
