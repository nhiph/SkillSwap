import { Button } from "@mui/material";
import { useSearchContext } from "../../../contexts/searchContext";

const UserList = () => {
  const { users } = useSearchContext();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
      {users.map((user) => {
        return (
          <div key={user.id} className="relative flex flex-col items-center">
            <div
              className="w-full h-[265px] bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.30)] overflow-hidden flex flex-col items-center font-roboto cursor-pointer
                          "
            >
              <div className="w-full relative">
                <div className="w-full h-[60px] bg-[#2f7da7]" />
                <img
                  src={user.avatar}
                  className="absolute top-[25px] left-1/2 -translate-x-1/2 w-[90px] h-[90px] rounded-full object-cover"
                />
              </div>

              <h3 className="mt-[70px] text-[16px] font-bold text-[#152438] text-center px-4 w-[160px] truncate">
                {user.name}
              </h3>

              <div className="mt-[5px] w-[160px] text-[14px] text-[#575859] leading-tight text-center space-y-0">
                <div className="font-semibold truncate">{user.position}</div>
                {/* <div className="text-[13px] font-light truncate">
                    {user.bio}
                  </div> */}
              </div>
            </div>
            <div className="mt-4 mb-3 absolute bottom-3">
              <Button variant="outlined">Connect</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
