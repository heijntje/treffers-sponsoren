/**
 * @file SponsorCarousel.js
 * @description A horizontal, infinitely looping carousel for displaying sponsor cards.
 * Supports touch/mouse dragging, pausing on hover, and custom theme/sizing.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Textfit } from "react-textfit";

/**
 * SponsorCarousel component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.sources - Dictionary of sponsor objects grouped by category.
 * @param {boolean} [props.hideHeader=true] - Whether to hide the 'SPONSOREN' header.
 * @param {string} [props.theme="white"] - Theme color string ("transparent" or "white").
 * @param {Function} [props.onContentResize] - Callback fired when image content finishes loading.
 * @returns {JSX.Element|null} The rendered carousel or null if no sources.
 */
const SponsorCarousel = ({ sources, hideHeader = true, theme = "white", onContentResize }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationFrameId = useRef(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // Extract all hoofdsponsors and star sponsors
  const allSponsors = React.useMemo(() => {
    if (!sources) return [];
    const categories = ["hoofdsponsor", "fivestars", "fourstars", "threestars"];
    const list = [];
    categories.forEach((catKey) => {
      const items = sources[catKey] || [];
      items.forEach((item) => {
        list.push({ ...item, categoryKey: catKey });
      });
    });
    return list;
  }, [sources]);

  // Triple items for seamless infinite looping
  const tripleSponsors = React.useMemo(() => {
    if (allSponsors.length === 0) return [];
    return [...allSponsors, ...allSponsors, ...allSponsors];
  }, [allSponsors]);

  // Single set width calculation helper
  const getSingleSetWidth = useCallback(() => {
    if (!trackRef.current || allSponsors.length === 0) return 0;
    return trackRef.current.scrollWidth / 3;
  }, [allSponsors.length]);

  // Main animation tick loop
  useEffect(() => {
    if (allSponsors.length === 0) return;

    let lastTime = performance.now();
    const speed = 0.6; // pixels per frame (~36px/sec at 60fps)

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2); // normalize delta time
      lastTime = now;

      const singleWidth = getSingleSetWidth();

      if (!isDraggingRef.current && !isHovered && singleWidth > 0) {
        offsetRef.current -= speed * delta;

        // Wrap around seamlessly
        if (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [allSponsors.length, isHovered, getSingleSetWidth]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    let newOffset = startOffsetRef.current + deltaX;
    const singleWidth = getSingleSetWidth();

    if (singleWidth > 0) {
      while (newOffset <= -singleWidth) {
        newOffset += singleWidth;
        startOffsetRef.current += singleWidth;
      }
      while (newOffset >= 0) {
        newOffset -= singleWidth;
        startOffsetRef.current -= singleWidth;
      }
    }

    offsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  // Mouse event listeners
  const onMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  // Touch event listeners
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Link click safety during drag
  const handleCardClick = (e, website) => {
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (website) {
      window.open(website, "_blank", "noopener,noreferrer");
    }
  };

  if (!sources || allSponsors.length === 0) {
    return null;
  }

  const bgColorClass = theme === "transparent" ? "bg-transparent" : "bg-white";

  return (
    <div
      ref={containerRef}
      className={`w-full p-4 sm:p-6 font-sans overflow-hidden ${bgColorClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
      }}
    >
      {!hideHeader && (
        <h1 className="text-[#e30613] font-bold text-2xl sm:text-3xl mb-4 sm:mb-6 tracking-tight font-sans text-left uppercase">
          SPONSOREN
        </h1>
      )}

      <div
        className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-x"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center gap-4 sm:gap-6 md:gap-8 will-change-transform"
          style={{ transform: `translate3d(0px, 0, 0)` }}
        >
          {tripleSponsors.map((item, idx) => {
            const isTxt = item.url?.includes(":txt:");
            const textContent = isTxt ? item.url.split(":txt:")[1] : item.name;
            const imgSrc = `${process.env.PUBLIC_URL}/${item.categoryKey}/${item.url}`;
            const website = item.website;

            return (
              <div
                key={`${item.name}-${idx}`}
                onClick={(e) => handleCardClick(e, website)}
                title={website ? `Bezoek ${item.name || "sponsor"}` : item.name}
                className={`flex-shrink-0 flex-grow-0 
                  w-full sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-48px)/4)] lg:w-[calc((100%-96px)/6)] xl:w-[calc((100%-112px)/7)]
                  h-28 sm:h-32 md:h-36 p-3 sm:p-4 rounded-lg bg-white shadow-sm border border-gray-100 
                  transition-all duration-200 hover:shadow-md hover:border-red-200 group flex items-center justify-center
                  ${website ? "cursor-pointer" : "cursor-grab"}`}
              >
                {isTxt ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Textfit
                      mode="multi"
                      max={18}
                      min={10}
                      className="font-semibold text-center flex items-center justify-center text-gray-800 group-hover:text-[#e30613] w-full h-full p-1 transition-colors duration-200"
                    >
                      {textContent}
                    </Textfit>
                    {website && (
                      <svg
                        className="absolute top-0 right-0 w-3 h-3 text-gray-300 group-hover:text-[#e30613] transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
                    <img
                      src={imgSrc}
                      alt={item.name || "Sponsor"}
                      className="max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-[1.04] pointer-events-none"
                      onLoad={onContentResize}
                    />
                    <span className="sr-only opacity-0 select-none pointer-events-none absolute text-[1px] overflow-hidden w-px h-px">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SponsorCarousel;
