import React from "react";
import { useAuthContext } from "../../contexts/authContext";

const ProfileCard = () => {
  const { user } = useAuthContext();
  const formattedPronouns = user?.pronouns
    ? user?.pronouns
        .split(/[\s/]+/) // split on space or slash
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()) // capitalize
        .join(" / ")
    : null;

  return (
    <div className="md:w-[220px]  h-max sm:w-[100%] bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.30)] overflow-hidden flex flex-col items-center justify-center font-roboto cursor-pointer pb-10 xl:m-8 lg:m-6 md:m-4 sm:m-2">
      {/* Top Banner + Avatar */}
      <div className="w-full relative">
        <div className="w-full h-[60px] bg-[#2f7da7]" />
        <img
          src={user?.avatar}
          alt={user?.name}
          className="relative top-[-25px] left-1/2 -translate-x-1/2 w-1/2 rounded-full object-cover max-w-[400px]"
        />
      </div>

      {/* Name */}
      <h3 className="text-[15px] font-bold text-[#152438] text-center px-4  leading-snug xl:text-2xl lg:text-xl md:text-lg sm:text-xl">
        {user?.name}
      </h3>

      {/* Pronouns */}
      {formattedPronouns && (
        <p className="mt-3 text-[10px] italic text-gray-500 mt-[3px] text-center xl:text-xl lg:text-xl md:lg sm:text-lg">
          ({formattedPronouns})
        </p>
      )}

      {/* Workplace & Position */}
      <div className="mt-3 text-[11px] text-[#575859] leading-snug px-8 space-y-2 mt-[40px]">
        {user?.position && (
          <div className="flex items-start gap-4 mb-[30px]">
            <i className="ri-briefcase-line text-[#016D75] xl:text-lg lg:text-base md:text-sm sm:text-lg leading-[1.2rem]" />
            <span className="leading-[1.2rem] xl:text-xl lg:text-lg md:text-base sm:text-lg text-balance">
              {user.position}
            </span>
          </div>
        )}
        {user?.workplace && (
          <div className="flex items-start gap-4">
            <i className="ri-building-line text-[#016D75] xl:text-xl lg:text-lg md:text-lg sm:text-lg leading-[1.2rem]" />
            <span className="break-words leading-[1.2rem] xl:text-xl lg:text-lg md:text-base sm:text-lg text-balance">
              {user.workplace}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
