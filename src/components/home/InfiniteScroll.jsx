import { useEffect } from "react";
import { TESTIMONIALS } from "../../utils/data";

const InfiniteScroll = () => {

  useEffect(() => {
    const scroller = document.querySelector(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, []);

  return (
    <div className="scroller" data-speed="medium">
      <div className="scroller__inner flex gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="w-80 border rounded-md p-5 flex flex-col justify-between"
          >
            <img
              className="w-5 mb-5"
              src={item.comma}
              alt="comma"
            />
            <p className="text-gray-600 text-sm">{item.description}</p>
            <h2 className="text-yellow-500 mt-3 text-lg">{item.rating}</h2>
            <div className="flex items-center gap-2 mt-2">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={item.avatar}
                alt={item.userName}
              />
              <h2 className="font-medium">{item.userName}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
