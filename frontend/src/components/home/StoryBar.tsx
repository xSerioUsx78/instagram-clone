import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { StoryIntf } from "../../interfaces/home/story";
import { limitText } from "../../utils/utility";

SwiperCore.use([Navigation]);

interface PropsIntf {
  storys: StoryIntf;
}

const StoryBar: React.FC<PropsIntf> = ({ storys }) => {
  return (
    <>
      {storys.loading && (
        <div className="bg-white border rounded py-3 h-full w-full mb-6">
          <div>Loading...</div>
        </div>
      )}
      {!storys.loading && storys.data.length > 0 && (
        <div className="bg-white border rounded h-full w-full mb-6">
          <Swiper
            slidesPerView={7.5}
            spaceBetween={12}
            slidesPerGroup={5}
            loop={false}
            loopFillGroupWithBlank={true}
            navigation={true}
            className="mySwiper"
          >
            {storys.data.map((story) => (
              <SwiperSlide key={story.id} className="cursor-pointer pb-2 pt-5">
                <div className="flex flex-col items-center">
                  <div className="mb-1">
                    <img
                      className="rounded-full w-14 h-14 object-cover ring-2 ring-red-500 ring-offset-2"
                      src={story.profile.image}
                      alt={limitText(story.username, 10)}
                    />
                  </div>
                  <div>
                    <span className="text-xs">
                      {limitText(story.username, 10)}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default StoryBar;
