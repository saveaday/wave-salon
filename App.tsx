import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  PAGE_DATA,
  CATALOGUE_DATA,
  SURVEY_DATA,
  LEAD_FORM_DATA,
  GA_ID,
} from "./constants";
import { LinkPage } from "./types";
import { LinkCard } from "./components/LinkCard";
import { CataloguePage } from "./components/CataloguePage";
import { Mail, Phone, MapPin, Share2, Package, Info } from "lucide-react";
import { initializeGA } from "./utils/analytics";

import { ThemeProvider } from "./components/ThemeProvider";

const ProfilePage: React.FC = () => {
  const [pageData] = useState<LinkPage>(PAGE_DATA);
  const [imgError, setImgError] = useState(false);
  const isCustomBg =
    pageData?.theme?.background && !pageData.theme.background.startsWith("bg-");

  // Initialize Google Analytics
  useEffect(() => {
    initializeGA(GA_ID);
  }, []);

  // Inject survey and lead form embed scripts
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    // Inject survey embed script
    if (SURVEY_DATA?.embedCode) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = SURVEY_DATA.embedCode;
      const scriptTag = tempDiv.querySelector("script");

      if (scriptTag) {
        const script = document.createElement("script");
        if (scriptTag.src) {
          script.src = scriptTag.src;
          // Copy all data attributes
          Array.from(scriptTag.attributes).forEach((attr) => {
            if (attr.name.startsWith("data-")) {
              script.setAttribute(attr.name, attr.value);
            }
          });
        }
        document.body.appendChild(script);
        scripts.push(script);
      }
    }

    // Inject lead form embed script
    if (LEAD_FORM_DATA?.embedCode) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = LEAD_FORM_DATA.embedCode;
      const scriptTag = tempDiv.querySelector("script");

      if (scriptTag) {
        const script = document.createElement("script");
        if (scriptTag.src) {
          script.src = scriptTag.src;
          // Copy all data attributes
          Array.from(scriptTag.attributes).forEach((attr) => {
            if (attr.name.startsWith("data-")) {
              script.setAttribute(attr.name, attr.value);
            }
          });
        }
        document.body.appendChild(script);
        scripts.push(script);
      }
    }

    // Cleanup on unmount
    return () => {
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Set dynamic SEO
  React.useEffect(() => {
    document.title = pageData.profile.name;
    const metaDesc = document.querySelector('meta[name="description"]');
    const content =
      pageData.profile.bio || `Connect with ${pageData.profile.name}`;
    if (metaDesc) {
      metaDesc.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, [pageData]);

  const { profile, links, theme } = pageData;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: profile.name,
          text: profile.bio,
          url: window.location.origin,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-6 transition-all duration-700 ${!isCustomBg ? theme.background : ""}`}
        style={isCustomBg ? { background: "var(--app-background)" } : {}}
      >
        <div className="max-w-xl w-full">
          {/* Share Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleShare}
              className="p-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full hover:bg-white hover:shadow-lg transition-all active:scale-90"
              aria-label="Share profile"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            {profile.logo && !imgError && (
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
                <img
                  src={profile.logo}
                  alt={profile.name}
                  onError={() => setImgError(true)}
                  className="relative w-28 h-28 rounded-full border-4 border-white shadow-2xl object-cover"
                />
              </div>
            )}
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-slate-600 max-w-sm font-medium leading-relaxed px-4">
              {profile.bio}
            </p>
          </div>

          {/* Contact Strip */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-500">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-sm font-semibold"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-sm font-semibold"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
            {profile.address && (
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <MapPin className="w-4 h-4" /> {profile.address}
              </div>
            )}
          </div>

          {/* View Services Button */}
          {CATALOGUE_DATA && (
            <div className="mb-6 px-2">
              <Link
                to="/services"
                className="flex items-center justify-center gap-3 w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <Package className="w-5 h-5" />
                View Services
              </Link>
            </div>
          )}

          {/* Links Section */}
          <div className="space-y-4 px-2">
            {links
              .filter((l) => l.active)
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <LinkCard key={link.id} link={link} theme={theme} />
              ))}
          </div>

          {/* Secondary Actions - Embed Triggers */}
          {(SURVEY_DATA || LEAD_FORM_DATA) && (
            <div className="mt-8 px-2 flex justify-center gap-6 text-sm">
              {SURVEY_DATA && (
                <button
                  data-saveaday-survey={(() => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = SURVEY_DATA.embedCode;
                    const script = tempDiv.querySelector('script');
                    return script?.getAttribute('data-saveaday-survey') || SURVEY_DATA.id;
                  })()}
                  className="text-slate-500 hover:text-slate-700 underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none font-inherit"
                >
                  {SURVEY_DATA.name}
                </button>
              )}
              {LEAD_FORM_DATA && (
                <button
                  onClick={() => {
                    if (typeof (window as any).showLeadFormModal === 'function') {
                      (window as any).showLeadFormModal();
                    }
                  }}
                  data-saveaday-leadform={(() => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = LEAD_FORM_DATA.embedCode;
                    const script = tempDiv.querySelector('script');
                    return script?.getAttribute('data-leadform-token') || LEAD_FORM_DATA.id;
                  })()}
                  className="text-slate-500 hover:text-slate-700 underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none font-inherit"
                >
                  {LEAD_FORM_DATA.name}
                </button>
              )}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-20 text-center pb-8">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold opacity-60">
              © 2026 {profile.name}
            </p>
          </footer>
        </div>

        {/* Info Button */}
        <a
          href="https://saveaday.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all group z-50"
          title="Powered by SaveADay"
        >
          <Info className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
        </a>
      </div>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/services"
          element={
            <CataloguePage
              catalogue={CATALOGUE_DATA}
              theme={PAGE_DATA.theme}
              businessName={PAGE_DATA.profile.name}
            />
          }
        />
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
