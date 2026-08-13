import React, { useState, useEffect, useRef, useCallback } from "react";
import { Textfit } from "react-textfit";

const CATEGORY_META = {
  hoofdsponsor: { title: "Trotse Hoofdsponsor" },
  fivestars: { title: "5 sterrensponsor" },
  fourstars: { title: "4 sterrensponsor" },
  threestars: { title: "3 sterrensponsor" },
  businessclub: { title: "Businessclub" },
  overige: { title: "Overige sponsoren" },
  wedstrijdsponsor: { title: "Wedstrijdsponsor" },
  balsponsor: { title: "Balsponsor" },
  buffetsponsor: { title: "Buffetsponsor" },
};

const CATEGORY_STYLES = {
  hoofdsponsor: {
    gridCols: "grid-cols-1 max-w-xl mx-auto",
    gap: "gap-6",
    cardHeight: "h-48 sm:h-60 md:h-72",
    cardPadding: "p-6 sm:p-10",
  },
  fivestars: {
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2",
    gap: "gap-6 sm:gap-10",
    cardHeight: "h-44 sm:h-56 md:h-64",
    cardPadding: "p-6 sm:p-8",
  },
  fourstars: {
    gridCols: "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4",
    gap: "gap-5 sm:gap-8",
    cardHeight: "h-28 sm:h-36 md:h-40",
    cardPadding: "p-4 sm:p-5",
  },
  threestars: {
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5",
    gap: "gap-4 sm:gap-6",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
  },
  businessclub: {
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5",
    gap: "gap-4 sm:gap-6",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
  },
  overige: {
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5",
    gap: "gap-4 sm:gap-6",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
  },
};

const DEFAULT_STYLE = {
  gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5",
  gap: "gap-4 sm:gap-6",
  cardHeight: "h-20 sm:h-24 md:h-28",
  cardPadding: "p-2 sm:p-3",
};

const NORMALIZE_MAP = {
  "hoofdsponsor": "hoofdsponsor",
  "hoofd": "hoofdsponsor",
  "main": "hoofdsponsor",
  "niveau": "hoofdsponsor",
  "trotse-hoofdsponsor": "hoofdsponsor",

  "5star": "fivestars",
  "5stars": "fivestars",
  "5": "fivestars",
  "fivestar": "fivestars",
  "fivestars": "fivestars",

  "4star": "fourstars",
  "4stars": "fourstars",
  "4": "fourstars",
  "fourstar": "fourstars",
  "fourstars": "fourstars",

  "3star": "threestars",
  "3stars": "threestars",
  "3": "threestars",
  "threestar": "threestars",
  "threestars": "threestars",

  "businessclub": "businessclub",
  "bc": "businessclub",

  "overige": "overige",
  "other": "overige",

  "wedstrijdsponsor": "wedstrijdsponsor",
  "balsponsor": "balsponsor",
  "buffetsponsor": "buffetsponsor",
};

const SponsorCategoryWidget = ({ categoryParam, hideHeader = false, theme = "white" }) => {
  const [sources, setSources] = useState(null);
  const containerRef = useRef(null);

  // Normalize category parameter
  const rawParam = (categoryParam || "4star").toLowerCase();
  const isAllMode = rawParam === "all";
  const isStarsMode = rawParam === "stars" || rawParam === "sponsoren" || rawParam === "star";
  const normalizedCategory = NORMALIZE_MAP[rawParam] || "fourstars";

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/sources.json")
      .then((res) => res.json())
      .then((data) => setSources(data))
      .catch((err) => console.error("Failed to load sources.json", err));
  }, []);

  // PostMessage for iframe auto-resizing
  const postHeightToParent = useCallback(() => {
    if (containerRef.current) {
      const height = Math.ceil(containerRef.current.getBoundingClientRect().height);
      window.parent.postMessage(
        {
          type: "treffers-iframe-resize",
          height,
          category: rawParam,
        },
        "*"
      );
    }
  }, [rawParam]);

  useEffect(() => {
    postHeightToParent();

    const handleResize = () => postHeightToParent();
    window.addEventListener("resize", handleResize);

    // Setup ResizeObserver for layout shifts (e.g. image loads, text reflow)
    let observer;
    if (containerRef.current && window.ResizeObserver) {
      observer = new ResizeObserver(() => {
        postHeightToParent();
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [sources, postHeightToParent]);

  if (!sources) {
    return (
      <div className="w-full p-8 text-center text-gray-500 font-sans">
        Laden van sponsoren...
      </div>
    );
  }

  const renderCategoryGrid = (catKey) => {
    const items = sources[catKey] || [];
    const meta = CATEGORY_META[catKey] || { title: catKey };
    const styles = CATEGORY_STYLES[catKey] || DEFAULT_STYLE;

    if (items.length === 0) return null;

    return (
      <div key={catKey} className="mb-12 last:mb-0">
        {!hideHeader && (
          <h1 className="text-[#e30613] font-bold text-2xl sm:text-3xl mb-6 tracking-tight font-sans">
            {meta.title}
          </h1>
        )}

        <div className={`grid ${styles.gridCols} ${styles.gap} items-center justify-items-center`}>
          {items.map((item, idx) => {
            const isTxt = item.url?.includes(":txt:");
            const imgSrc = `${process.env.PUBLIC_URL}/${catKey}/${item.url}`;
            const website = item.website;

            const cardContent = isTxt ? (
              <Textfit
                mode="multi"
                className="font-bold text-center flex items-center justify-center text-gray-800 w-full h-full p-1"
              >
                {item.url.split(":txt:")[1]}
              </Textfit>
            ) : (
              <img
                src={imgSrc}
                alt={item.name || "Sponsor"}
                className="max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                onLoad={postHeightToParent}
              />
            );

            const cardClasses = `group w-full ${styles.cardHeight} flex items-center justify-center ${styles.cardPadding} rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-200`;

            if (website) {
              return (
                <a
                  key={idx}
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Bezoek ${item.name || "sponsor"}`}
                  className={`${cardClasses} hover:shadow-md hover:border-red-200 cursor-pointer`}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={idx} className={cardClasses}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const categoriesToRender = isAllMode
    ? Object.keys(CATEGORY_META)
    : isStarsMode
    ? ["hoofdsponsor", "fivestars", "fourstars", "threestars"]
    : [normalizedCategory];

  const bgColorClass = theme === "transparent" ? "bg-transparent" : "bg-white";

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen p-4 sm:p-8 font-sans ${bgColorClass}`}
    >
      {categoriesToRender.map((cat) => renderCategoryGrid(cat))}
    </div>
  );
};

export default SponsorCategoryWidget;
