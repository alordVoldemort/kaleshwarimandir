import React, { useCallback, useEffect, useRef, useState } from "react";
import assetUrl from "../../assetUrl";
import "./AboutTempleData.css";
import { useLanguage } from "../../LanguageContext";

const API_BASE = "https://kaleshwarimandirannadanchhatra.org/pooja-backend";

const AUTOPLAY_MS = 5000;

const localImages = [
  "mata44.webp",
  "mata88.webp",
  "mata111.webp",
  "maashiv3.webp",
  "home3.JPG",
  "IMG_7181.webp",
].map(assetUrl);

const AboutTempleData = () => {
  const { isMarathi } = useLanguage();
  const [images, setImages] = useState(localImages);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);
  const touchX = useRef(null);

  const count = images.length;

  // Uploaded images are added on top of the bundled ones; a failed request just keeps the bundled set.
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/getImages.php`, { signal: controller.signal });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const uploaded = data.data.map((img) => `${API_BASE}/uploads/${img.filename}`);
          setImages([...new Set([...uploaded, ...localImages])]);
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error("Error fetching uploaded images:", err);
      }
    })();
    return () => controller.abort();
  }, []);

  // Drop an image that fails to load (e.g. deleted upload) so it never leaves a blank slide.
  const removeImage = useCallback((src) => {
    setImages((prev) => (prev.length > 1 ? prev.filter((s) => s !== src) : prev));
  }, []);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [index, count]);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Slow auto-advance; pauses on hover, in full screen, and for reduced-motion users.
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || lightbox || reduce || count < 2) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, lightbox, next, count]);

  // Preload neighbours so navigation feels instant.
  useEffect(() => {
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = images[(index + d + count) % count];
    });
  }, [index, images, count]);

  // Keep the active thumbnail visible by scrolling only the thumbnail list (never the page).
  useEffect(() => {
    const box = stripRef.current;
    const el = box && box.children[index];
    if (!el) return;
    if (box.scrollHeight > box.clientHeight + 1) {
      box.scrollTo({ top: el.offsetTop - (box.clientHeight - el.offsetHeight) / 2, behavior: "smooth" });
    } else if (box.scrollWidth > box.clientWidth + 1) {
      box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const current = images[index] || images[0];
  // Compare against the loaded src (not a boolean) so a cached image that fires onLoad early can't be reset.
  const loaded = loadedSrc === current;

  return (
    <section className="tg-section" id="temple-gallery">
      <div className="tg-inner">
        <header className="tg-header">
          <div>
            <span className="tg-kicker">🕉️ {isMarathi ? "श्री काळेश्वरी मंदिर" : "Shri Kaleshwari Mandir"}</span>
            <h2 className="tg-title">{isMarathi ? "मंदिर गॅलरी" : "Temple Gallery"}</h2>
            <p className="tg-subtitle">
              {isMarathi
                ? "काळेश्वरी मंदिराच्या दिव्य क्षणांचे दर्शन"
                : "Divine moments at Kaleshwari Temple"}
            </p>
          </div>
          <div className="tg-count" aria-live="polite">
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>/ {String(count).padStart(2, "0")}</span>
          </div>
        </header>

        <div className="tg-body">
          <div
            className="tg-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="tg-ambient" style={{ backgroundImage: `url("${current}")` }} aria-hidden="true" />
            <button
              type="button"
              className="tg-image-btn"
              onClick={() => setLightbox(true)}
              aria-label={isMarathi ? "फोटो मोठा करा" : "Open full screen"}
            >
              {!loaded && <span className="tg-spinner" aria-hidden="true" />}
              <img
                key={current}
                src={current}
                alt={`${isMarathi ? "मंदिर फोटो" : "Temple photo"} ${index + 1}`}
                className={`tg-image${loaded ? " is-loaded" : ""}`}
                onLoad={() => setLoadedSrc(current)}
                onError={() => removeImage(current)}
                decoding="async"
              />
              <span className="tg-zoom" aria-hidden="true">⤢</span>
            </button>

            <button type="button" className="tg-nav tg-nav-prev" onClick={prev} aria-label="Previous photo">
              ‹
            </button>
            <button type="button" className="tg-nav tg-nav-next" onClick={next} aria-label="Next photo">
              ›
            </button>

            {!paused && !lightbox && count > 1 && (
              <span key={index} className="tg-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
            )}
          </div>

          <div className="tg-thumbs-wrap">
          <div className="tg-thumbs" ref={stripRef} role="tablist">
            {images.map((src, i) => (
              <button
                type="button"
                key={src}
                role="tab"
                aria-selected={i === index}
                aria-label={`Photo ${i + 1}`}
                className={`tg-thumb${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
              >
                <img src={src} alt="" loading="lazy" decoding="async" onError={() => removeImage(src)} />
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="tg-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="tg-lb-close" aria-label="Close" onClick={() => setLightbox(false)}>
            ×
          </button>
          <button
            type="button"
            className="tg-nav tg-nav-prev"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>
          <img src={current} alt="" className="tg-lb-img" onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            className="tg-nav tg-nav-next"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>
          <span className="tg-counter">{index + 1} / {count}</span>
        </div>
      )}
    </section>
  );
};

export default AboutTempleData;
