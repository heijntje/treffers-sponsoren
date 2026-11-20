/**
 * @file SponsorCategoryWidget.js
 * @description Widget component for displaying specific sponsor categories (e.g., in an iframe).
 * Handles flexible grid layouts and multiple category combinations.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Textfit } from "react-textfit";
import SponsorCarousel from "./SponsorCarousel";

/**
 * Metadata and display titles for different sponsor categories.
 */
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
    headerAlign: "text-center",
  },
  hoofdsponsor_small: {
    gridCols: "grid-cols-1 max-w-md mx-auto",
    gap: "gap-4",
    cardHeight: "h-24 sm:h-32 md:h-36",
    cardPadding: "p-3 sm:p-5",
    headerAlign: "text-center",
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
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    gap: "gap-3 sm:gap-4",
    cardHeight: "h-16 sm:h-20 md:h-22",
    cardPadding: "p-3 sm:p-4",
  },
  wedstrijdsponsor: {
    gridCols: "grid-cols-1 max-w-xs sm:max-w-sm mx-auto",
    gap: "gap-4",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
    headerAlign: "text-center",
  },
  balsponsor: {
    gridCols: "grid-cols-1 max-w-xs sm:max-w-sm mx-auto",
    gap: "gap-4",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
    headerAlign: "text-center",
  },
  buffetsponsor: {
    gridCols: "grid-cols-1 max-w-xs sm:max-w-sm mx-auto",
    gap: "gap-4",
    cardHeight: "h-20 sm:h-24 md:h-28",
    cardPadding: "p-2 sm:p-3",
    headerAlign: "text-center",
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
  "hoofdsponsor-small": "hoofdsponsor",
  "hoofdsponsor_small": "hoofdsponsor",
  "hoofd-small": "hoofdsponsor",
  "hoofdsponsor-compact": "hoofdsponsor",

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
  "overigesponsoren": "overige",
  "overige-sponsoren": "overige",
  "other": "overige",

  "wedstrijdsponsor": "wedstrijdsponsor",
  "wedstrijd": "wedstrijdsponsor",
  "match": "wedstrijdsponsor",
  "matchsponsor": "wedstrijdsponsor",

  "balsponsor": "balsponsor",
  "bal": "balsponsor",
  "ball": "balsponsor",
  "ballsponsor": "balsponsor",

  "buffetsponsor": "buffetsponsor",
  "buffet": "buffetsponsor",
};

/**
 * SponsorCategoryWidget component.
 * Acts as a standalone widget to render a specific category (or combinations) based on URL parameters.
 * Automatically posts its height to the parent window for iframe resizing.
 *
 * @param {Object} props - The component props.
 * @param {string} props.categoryParam - The category requested (e.g., '4star', 'all', 'carousel', 'wedstrijdenbal').
 * @param {boolean} [props.hideHeader=false] - Whether to hide the category headers.
 * @param {string} [props.theme="white"] - Theme styling class or color.
 * @param {string} [props.size] - Optional size constraint (e.g., 'small' / 'compact').
 * @param {string} [props.mode] - Optional mode ('logo', 'raw', 'minimal').
 * @returns {JSX.Element} The rendered widget.
 */
const SponsorCategoryWidget = ({
  categoryParam,
  hideHeader = false,
  theme = "white",
  size,
  mode,
}) => {
  const [sources, setSources] = useState(null);
  const containerRef = useRef(null);

  // Normalize category parameter
  const rawParam = (categoryParam || "4star").toLowerCase().trim();
  const rawMode = (mode || "").toLowerCase().trim();
  const isLogoOnlyMode =
    rawMode === "logo" ||
    rawMode === "logos" ||
    rawMode === "raw" ||
    rawMode === "clean" ||
    rawMode === "plain" ||
    rawMode === "minimal";
  const isCarouselMode = rawParam === "carousel" || rawParam === "slider";
  const isAllMode = rawParam === "all";
  const isStarsMode = rawParam === "stars" || rawParam === "sponsoren" || rawParam === "star";

  const isSmall =
    size === "small" ||
    size === "compact" ||
    size === "sm" ||
    rawParam.includes("small") ||
    rawParam.includes("compact");

  const isMatchdayMode =
    rawParam === "wedstrijdenbal" ||
    rawParam === "wedstrijd-bal" ||
    rawParam === "wedstrijd_bal" ||
    rawParam === "wedstrijdsponsor-balsponsor" ||
    rawParam === "wedstrijdsponsor_balsponsor" ||
    rawParam === "wedstrijd,bal" ||
    rawParam === "bal,wedstrijd" ||
    rawParam === "wedstrijdsponsor,balsponsor" ||
    rawParam === "balsponsor,wedstrijdsponsor" ||
    rawParam === "matchday" ||
    rawParam === "matchsponsors" ||
    rawParam === "match" ||
    rawParam === "gameday" ||
    rawParam === "wedstrijdpakket" ||
    (rawParam.includes("wedstrijd") && rawParam.includes("bal")) ||
    (rawParam.includes("hoofd") && rawParam.includes("wedstrijd"));

  const normalizedCategory = NORMALIZE_MAP[rawParam] || "fourstars";

  useEffect(() => {
    if (theme === "transparent" || isLogoOnlyMode) {
      document.documentElement.style.backgroundColor = "transparent";
      document.body.style.backgroundColor = "transparent";
    }
  }, [theme, isLogoOnlyMode]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/sources.json?v=" + Date.now(), {
      cache: "no-cache",
    })
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

  const renderCard = (item, catKey, styles, idx) => {
    const isTxt = item.url?.includes(":txt:");
    const textContent = isTxt ? item.url.split(":txt:")[1] : item.name;
    const imgSrc = `${process.env.PUBLIC_URL}/${catKey}/${item.url}`;
    const website = item.website;

    const cardContent = isTxt ? (
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
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={imgSrc}
          alt={item.name || "Sponsor"}
          className="max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
          onLoad={postHeightToParent}
        />
        <span className="sr-only opacity-0 select-none pointer-events-none absolute text-[1px] overflow-hidden w-px h-px">
          {item.name}
        </span>
      </div>
    );

    const cardClasses = `group relative w-full ${styles.cardHeight} flex items-center justify-center ${styles.cardPadding} rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-200`;

    if (website) {
      return (
        <a
          key={idx}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          title={`Bezoek ${item.name || "sponsor"}`}
          className={`${cardClasses} hover:shadow-md hover:border-red-300 cursor-pointer`}
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
  };

  const renderCategoryGrid = (catKey) => {
    const items = sources[catKey] || [];
    const meta = CATEGORY_META[catKey] || { title: catKey };
    let styles = CATEGORY_STYLES[catKey] || DEFAULT_STYLE;

    if (catKey === "hoofdsponsor" && isSmall) {
      styles = CATEGORY_STYLES.hoofdsponsor_small;
    }

    if (items.length === 0) return null;

    const titleSizeClass =
      catKey === "hoofdsponsor" && !isSmall
        ? "text-2xl sm:text-3xl mb-6"
        : "text-xl sm:text-2xl mb-3 sm:mb-4";

    const wrapperMarginClass = isSmall ? "mb-2 last:mb-0" : "mb-8 last:mb-0";

    return (
      <div key={catKey} className={wrapperMarginClass}>
        {!hideHeader && (
          <h1
            className={`text-[#e30613] font-bold ${titleSizeClass} tracking-tight font-sans ${
              styles.headerAlign || ""
            }`}
          >
            {meta.title}
          </h1>
        )}

        <div className={`grid ${styles.gridCols} ${styles.gap} items-center justify-items-center`}>
          {items.map((item, idx) => renderCard(item, catKey, styles, idx))}
        </div>
      </div>
    );
  };

  const categoriesToRender = isAllMode
    ? ['hoofdsponsor', 'fivestars', 'fourstars', 'threestars', "businessclub", "overige"]
    : isStarsMode
      ? ["hoofdsponsor", "fivestars", "fourstars", "threestars"]
      : [normalizedCategory];

  const bgColorClass = theme === "transparent" ? "bg-transparent" : "bg-white";

  // Dedicated logo-only mode: render only clean logos/links without headers, cards, borders, or extra margins
  if (isLogoOnlyMode) {
    const renderPureLogo = (item, catKey, idx) => {
      const isTxt = item.url?.includes(":txt:");
      const textContent = isTxt ? item.url.split(":txt:")[1] : item.name;
      const imgSrc = `${process.env.PUBLIC_URL}/${catKey}/${item.url}`;
      const website = item.website;

      const inner = isTxt ? (
        <span className="font-bold text-center text-gray-800 hover:text-[#e30613] text-sm sm:text-base leading-snug px-2">
          {textContent}
        </span>
      ) : (
        <img
          src={imgSrc}
          alt={item.name || "Sponsor"}
          className="w-full h-full max-w-full max-h-full object-contain object-center transition-transform duration-200 hover:scale-105"
          onLoad={postHeightToParent}
        />
      );

      const containerStyle =
        "w-full h-full flex items-center justify-center p-1 overflow-hidden";

      if (website) {
        return (
          <a
            key={idx}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            title={`Bezoek ${item.name || "sponsor"}`}
            className={`${containerStyle} cursor-pointer group`}
          >
            {inner}
          </a>
        );
      }

      return (
        <div key={idx} className={containerStyle}>
          {inner}
        </div>
      );
    };

    if (isMatchdayMode) {
      const matchItems = [];
      if (sources["hoofdsponsor"]?.length > 0 && rawParam.includes("hoofd")) {
        sources["hoofdsponsor"].forEach((item) =>
          matchItems.push({ item, catKey: "hoofdsponsor" })
        );
      }
      if (sources["wedstrijdsponsor"]?.length > 0) {
        sources["wedstrijdsponsor"].forEach((item) =>
          matchItems.push({ item, catKey: "wedstrijdsponsor" })
        );
      }
      if (sources["balsponsor"]?.length > 0) {
        sources["balsponsor"].forEach((item) =>
          matchItems.push({ item, catKey: "balsponsor" })
        );
      }
      if (
        (rawParam.includes("buffet") || rawParam.includes("all")) &&
        sources["buffetsponsor"]?.length > 0
      ) {
        sources["buffetsponsor"].forEach((item) =>
          matchItems.push({ item, catKey: "buffetsponsor" })
        );
      }

      const gridCols =
        matchItems.length === 1
          ? "grid-cols-1"
          : matchItems.length === 2
          ? "grid-cols-2"
          : "grid-cols-3";

      return (
        <div
          ref={containerRef}
          className={`w-screen h-screen overflow-hidden flex items-center justify-center ${bgColorClass}`}
        >
          <div className={`grid ${gridCols} gap-4 w-full h-full items-center justify-items-center`}>
            {matchItems.map(({ item, catKey }, idx) =>
              renderPureLogo(item, catKey, idx)
            )}
          </div>
        </div>
      );
    }

    // Single or mapped category in logo mode
    const activeItems = (sources[normalizedCategory] || []).map((item) => ({
      item,
      catKey: normalizedCategory,
    }));

    return (
      <div
        ref={containerRef}
        className={`w-screen h-screen overflow-hidden flex items-center justify-center ${bgColorClass}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {activeItems.map(({ item, catKey }, idx) =>
            renderPureLogo(item, catKey, idx)
          )}
        </div>
      </div>
    );
  }

  if (isCarouselMode) {
    return (
      <div ref={containerRef} className={`w-full font-sans ${bgColorClass}`}>
        <SponsorCarousel
          sources={sources}
          hideHeader={true}
          theme={theme}
          onContentResize={postHeightToParent}
        />
      </div>
    );
  }

  // Shared responsive matchday widget for Wedstrijdsponsor & Balsponsor (and optional Buffetsponsor)
  if (isMatchdayMode) {
    const cardStyles = CATEGORY_STYLES.wedstrijdsponsor;
    const matchGroups = [];

    if (sources["wedstrijdsponsor"]?.length > 0) {
      matchGroups.push({
        key: "wedstrijdsponsor",
        title: CATEGORY_META.wedstrijdsponsor?.title || "Wedstrijdsponsor",
        items: sources["wedstrijdsponsor"],
      });
    }

    if (sources["balsponsor"]?.length > 0) {
      matchGroups.push({
        key: "balsponsor",
        title: CATEGORY_META.balsponsor?.title || "Balsponsor",
        items: sources["balsponsor"],
      });
    }

    if (
      (rawParam.includes("buffet") || rawParam.includes("all")) &&
      sources["buffetsponsor"]?.length > 0
    ) {
      matchGroups.push({
        key: "buffetsponsor",
        title: CATEGORY_META.buffetsponsor?.title || "Buffetsponsor",
        items: sources["buffetsponsor"],
      });
    }

    const gridColsClass =
      matchGroups.length === 1
        ? "grid-cols-1 max-w-xs sm:max-w-sm mx-auto"
        : matchGroups.length === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
        : "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto";

    return (
      <div
        ref={containerRef}
        className={`w-full p-2 sm:p-4 font-sans ${bgColorClass}`}
      >
        <div className={`grid ${gridColsClass} gap-6 sm:gap-8 items-start`}>
          {matchGroups.map((group) => (
            <div key={group.key} className="flex flex-col items-center w-full">
              {!hideHeader && (
                <h1 className="text-[#e30613] font-bold text-xl sm:text-2xl mb-3 sm:mb-4 tracking-tight font-sans text-center">
                  {group.title}
                </h1>
              )}
              <div className="w-full max-w-xs sm:max-w-sm">
                {group.items.map((item, idx) =>
                  renderCard(item, group.key, cardStyles, idx)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full p-2 sm:p-4 font-sans ${bgColorClass}`}
    >
      {categoriesToRender.map((cat) => renderCategoryGrid(cat))}
    </div>
  );
};

export default SponsorCategoryWidget;
