"use client";

import React, { useState, useEffect } from "react";
import initialPortfolioData from "@/data/portfolio.json";
import {
  Lock,
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  LogOut,
  Sliders,
  Menu,
  Sparkles,
  Layers,
  HelpCircle,
  MessageSquare,
  FileText,
  PhoneCall,
  LayoutTemplate,
  Compass,
  Eye,
  EyeOff,
} from "lucide-react";

const ADMIN_PASSWORD = "123456";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [data, setData] = useState<any>(initialPortfolioData);
  const [activeTab, setActiveTab] = useState<string>("siteConfig");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch the latest file data from server when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/admin/save")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to load");
        })
        .then((freshData) => {
          if (freshData && typeof freshData === "object" && freshData.siteConfig) {
            setData(freshData);
          }
        })
        .catch(() => {
          // Fall back to initialPortfolioData already set in state
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PASSWORD,
          data: data,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage({
          type: "success",
          text: "All changes saved successfully! Live website has been updated.",
        });
        setTimeout(() => setStatusMessage(null), 5000);
      } else {
        setStatusMessage({
          type: "error",
          text: result.error || "Failed to save changes. Please try again.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "A network error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper updater functions
  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateNestedField = (
    section: string,
    subSection: string,
    field: string,
    value: any
  ) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value,
        },
      },
    }));
  };

  // Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="w-16 h-16 bg-[#cba72f]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#735c00]">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 font-hanken">
            Admin Authentication
          </h1>
          <p className="text-sm text-center text-slate-500 mb-6">
            Enter the admin password to manage website content.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#cba72f] focus:border-transparent text-sm pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-rose-600 text-xs font-medium bg-rose-50 p-3 rounded-lg border border-rose-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0d1c32] hover:bg-[#1b2b48] text-white font-bold rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <Lock className="w-4 h-4" />
              Sign In to Admin
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-medium"
            >
              &larr; Back to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "siteConfig", label: "Site Info & Contact", icon: Sliders },
    { id: "navItems", label: "Navigation Items", icon: Menu },
    { id: "heroData", label: "Hero Banner", icon: Sparkles },
    { id: "aboutData", label: "About Section", icon: FileText },
    { id: "servicesData", label: "Services", icon: Layers },
    { id: "whyChooseMeData", label: "Why Choose Me", icon: HelpCircle },
    { id: "testimonialsData", label: "Testimonials", icon: MessageSquare },
    { id: "processData", label: "Process Steps", icon: Compass },
    { id: "ctaData", label: "Call To Action (CTA)", icon: LayoutTemplate },
    { id: "contactData", label: "Contact Form & Details", icon: PhoneCall },
    { id: "footerData", label: "Footer", icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0d1c32] text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#cba72f] text-[#0d1c32] flex items-center justify-center font-bold text-lg">
              HG
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight font-hanken">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-400">Content Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition shadow-md ${
                isSaving
                  ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                  : "bg-[#cba72f] hover:bg-[#b08e23] text-[#241a00] active:scale-95"
              }`}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              title="Logout"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Alert Notification */}
        {statusMessage && (
          <div
            className={`py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sticky top-24">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Website Sections
            </h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#0d1c32] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-[#cba72f]" : "text-slate-400"
                      }`}
                    />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Editor Area */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            {/* 1. Site Config */}
            {activeTab === "siteConfig" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    Site Configuration &amp; Contact Info
                  </h2>
                  <p className="text-xs text-slate-500">
                    Basic firm details displayed in the header, footer, and contact section.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Firm Name
                    </label>
                    <input
                      type="text"
                      value={data.siteConfig.name || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={data.siteConfig.tagline || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "tagline", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Display Phone Number
                    </label>
                    <input
                      type="text"
                      value={data.siteConfig.phone || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Target Number (Without + or spaces)
                    </label>
                    <input
                      type="text"
                      value={data.siteConfig.whatsappPhone || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "whatsappPhone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={data.siteConfig.email || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Office Address
                    </label>
                    <textarea
                      rows={2}
                      value={data.siteConfig.address || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "address", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Google Maps Embed URL
                    </label>
                    <textarea
                      rows={2}
                      value={data.siteConfig.mapEmbedUrl || ""}
                      onChange={(e) =>
                        updateField("siteConfig", "mapEmbedUrl", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Nav Items */}
            {activeTab === "navItems" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-hanken">
                      Navigation Menu Links
                    </h2>
                    <p className="text-xs text-slate-500">
                      Configure the header navigation bar links.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newItems = [
                        ...data.navItems,
                        {
                          id: `nav-${Date.now()}`,
                          label: "New Link",
                          href: "/#new",
                        },
                      ];
                      setData({ ...data, navItems: newItems });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1c32] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Link</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.navItems.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Section ID
                          </label>
                          <input
                            type="text"
                            value={item.id}
                            onChange={(e) => {
                              const newItems = [...data.navItems];
                              newItems[idx].id = e.target.value;
                              setData({ ...data, navItems: newItems });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Label
                          </label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const newItems = [...data.navItems];
                              newItems[idx].label = e.target.value;
                              setData({ ...data, navItems: newItems });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Target Href
                          </label>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) => {
                              const newItems = [...data.navItems];
                              newItems[idx].href = e.target.value;
                              setData({ ...data, navItems: newItems });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newItems = data.navItems.filter(
                            (_: any, i: number) => i !== idx
                          );
                          setData({ ...data, navItems: newItems });
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Hero Data */}
            {activeTab === "heroData" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    Hero Section
                  </h2>
                  <p className="text-xs text-slate-500">
                    The top primary banner of your homepage.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Headline Title
                    </label>
                    <textarea
                      rows={2}
                      value={data.heroData.title || ""}
                      onChange={(e) =>
                        updateField("heroData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subtitle / Bio Statement
                    </label>
                    <textarea
                      rows={3}
                      value={data.heroData.subtitle || ""}
                      onChange={(e) =>
                        updateField("heroData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-600 mb-2">
                        Primary CTA Button
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Label"
                          value={data.heroData.primaryCta.label || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "primaryCta",
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Href (e.g. #contact)"
                          value={data.heroData.primaryCta.href || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "primaryCta",
                              "href",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-600 mb-2">
                        Secondary CTA Button
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Label"
                          value={data.heroData.secondaryCta.label || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "secondaryCta",
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Href (e.g. #contact)"
                          value={data.heroData.secondaryCta.href || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "secondaryCta",
                              "href",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hero Badges */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase text-slate-600">
                        Hero Badges
                      </h3>
                      <button
                        onClick={() => {
                          const newBadges = [
                            ...data.heroData.badges,
                            { label: "New Badge", icon: "ShieldCheck" },
                          ];
                          updateField("heroData", "badges", newBadges);
                        }}
                        className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Badge</span>
                      </button>
                    </div>

                    {data.heroData.badges.map((badge: any, bIdx: number) => (
                      <div
                        key={bIdx}
                        className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200"
                      >
                        <input
                          type="text"
                          placeholder="Label"
                          value={badge.label}
                          onChange={(e) => {
                            const newBadges = [...data.heroData.badges];
                            newBadges[bIdx].label = e.target.value;
                            updateField("heroData", "badges", newBadges);
                          }}
                          className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Lucide Icon (e.g. ShieldCheck)"
                          value={badge.icon}
                          onChange={(e) => {
                            const newBadges = [...data.heroData.badges];
                            newBadges[bIdx].icon = e.target.value;
                            updateField("heroData", "badges", newBadges);
                          }}
                          className="w-44 px-2.5 py-1 border border-slate-300 rounded text-xs font-mono"
                        />
                        <button
                          onClick={() => {
                            const newBadges = data.heroData.badges.filter(
                              (_: any, i: number) => i !== bIdx
                            );
                            updateField("heroData", "badges", newBadges);
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Hero Image */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      Hero Portrait Image
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={data.heroData.image.src || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "image",
                              "src",
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={data.heroData.image.alt || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "heroData",
                              "image",
                              "alt",
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. About Data */}
            {activeTab === "aboutData" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    About Section
                  </h2>
                  <p className="text-xs text-slate-500">
                    Introduce your background, experience, and key performance stats.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.aboutData.title || ""}
                      onChange={(e) =>
                        updateField("aboutData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Paragraphs */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase text-slate-600">
                        About Paragraphs
                      </h3>
                      <button
                        onClick={() => {
                          const newParas = [
                            ...data.aboutData.paragraphs,
                            "New paragraph text here.",
                          ];
                          updateField("aboutData", "paragraphs", newParas);
                        }}
                        className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Paragraph</span>
                      </button>
                    </div>

                    {data.aboutData.paragraphs.map(
                      (para: string, pIdx: number) => (
                        <div key={pIdx} className="flex gap-2 items-start">
                          <textarea
                            rows={3}
                            value={para}
                            onChange={(e) => {
                              const newParas = [...data.aboutData.paragraphs];
                              newParas[pIdx] = e.target.value;
                              updateField("aboutData", "paragraphs", newParas);
                            }}
                            className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                          <button
                            onClick={() => {
                              const newParas = data.aboutData.paragraphs.filter(
                                (_: any, i: number) => i !== pIdx
                              );
                              updateField("aboutData", "paragraphs", newParas);
                            }}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  {/* Stats */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase text-slate-600">
                        Key Statistics
                      </h3>
                      <button
                        onClick={() => {
                          const newStats = [
                            ...data.aboutData.stats,
                            { value: 10, suffix: "+", label: "New Stat" },
                          ];
                          updateField("aboutData", "stats", newStats);
                        }}
                        className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stat</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.aboutData.stats.map((stat: any, sIdx: number) => (
                        <div
                          key={sIdx}
                          className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="Value"
                                value={stat.value}
                                onChange={(e) => {
                                  const newStats = [...data.aboutData.stats];
                                  newStats[sIdx].value = Number(e.target.value);
                                  updateField("aboutData", "stats", newStats);
                                }}
                                className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Suffix"
                                value={stat.suffix}
                                onChange={(e) => {
                                  const newStats = [...data.aboutData.stats];
                                  newStats[sIdx].suffix = e.target.value;
                                  updateField("aboutData", "stats", newStats);
                                }}
                                className="w-16 px-2 py-1 border border-slate-300 rounded text-xs"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Label"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...data.aboutData.stats];
                                newStats[sIdx].label = e.target.value;
                                updateField("aboutData", "stats", newStats);
                              }}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newStats = data.aboutData.stats.filter(
                                (_: any, i: number) => i !== sIdx
                              );
                              updateField("aboutData", "stats", newStats);
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* About Image */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      About Section Image
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={data.aboutData.image.src || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "aboutData",
                              "image",
                              "src",
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={data.aboutData.image.alt || ""}
                          onChange={(e) =>
                            updateNestedField(
                              "aboutData",
                              "image",
                              "alt",
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Services Data */}
            {activeTab === "servicesData" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-hanken">
                      Services Section
                    </h2>
                    <p className="text-xs text-slate-500">
                      Edit the services and financial solutions cards.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newItems = [
                        ...data.servicesData.items,
                        {
                          id: `service-${Date.now()}`,
                          title: "New Service",
                          description:
                            "Detailed description of the financial service offered.",
                          icon: "Landmark",
                          iconBg: "bg-[#d6e3ff]",
                          iconColor: "text-[#0d1c32]",
                          highlight: false,
                        },
                      ];
                      updateField("servicesData", "items", newItems);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1c32] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.servicesData.title || ""}
                      onChange={(e) =>
                        updateField("servicesData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.servicesData.subtitle || ""}
                      onChange={(e) =>
                        updateField("servicesData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {data.servicesData.items.map((svc: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          Card #{idx + 1}
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!svc.highlight}
                              onChange={(e) => {
                                const newItems = [...data.servicesData.items];
                                newItems[idx].highlight = e.target.checked;
                                updateField("servicesData", "items", newItems);
                              }}
                              className="rounded text-amber-600 focus:ring-amber-500"
                            />
                            <span>Featured Card (Gold border)</span>
                          </label>
                          <button
                            onClick={() => {
                              const newItems = data.servicesData.items.filter(
                                (_: any, i: number) => i !== idx
                              );
                              updateField("servicesData", "items", newItems);
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Title
                          </label>
                          <input
                            type="text"
                            value={svc.title}
                            onChange={(e) => {
                              const newItems = [...data.servicesData.items];
                              newItems[idx].title = e.target.value;
                              updateField("servicesData", "items", newItems);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Lucide Icon Name
                          </label>
                          <input
                            type="text"
                            value={svc.icon}
                            onChange={(e) => {
                              const newItems = [...data.servicesData.items];
                              newItems[idx].icon = e.target.value;
                              updateField("servicesData", "items", newItems);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={svc.description}
                            onChange={(e) => {
                              const newItems = [...data.servicesData.items];
                              newItems[idx].description = e.target.value;
                              updateField("servicesData", "items", newItems);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Why Choose Me */}
            {activeTab === "whyChooseMeData" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-hanken">
                      Why Choose Me Section
                    </h2>
                    <p className="text-xs text-slate-500">
                      Features and credibility points that set your consultancy apart.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newFeatures = [
                        ...data.whyChooseMeData.features,
                        {
                          title: "New Feature",
                          description: "Feature description explaining the value proposition.",
                          icon: "ShieldCheck",
                          iconBg: "bg-[#d6e3ff]",
                          iconColor: "text-[#0d1c32]",
                        },
                      ];
                      updateField("whyChooseMeData", "features", newFeatures);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1c32] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Feature</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.whyChooseMeData.title || ""}
                      onChange={(e) =>
                        updateField("whyChooseMeData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.whyChooseMeData.subtitle || ""}
                      onChange={(e) =>
                        updateField("whyChooseMeData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {data.whyChooseMeData.features.map(
                    (feat: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Feature #{idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              const newFeatures =
                                data.whyChooseMeData.features.filter(
                                  (_: any, i: number) => i !== idx
                                );
                              updateField(
                                "whyChooseMeData",
                                "features",
                                newFeatures
                              );
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Title
                            </label>
                            <input
                              type="text"
                              value={feat.title}
                              onChange={(e) => {
                                const newFeatures = [
                                  ...data.whyChooseMeData.features,
                                ];
                                newFeatures[idx].title = e.target.value;
                                updateField(
                                  "whyChooseMeData",
                                  "features",
                                  newFeatures
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Lucide Icon Name
                            </label>
                            <input
                              type="text"
                              value={feat.icon}
                              onChange={(e) => {
                                const newFeatures = [
                                  ...data.whyChooseMeData.features,
                                ];
                                newFeatures[idx].icon = e.target.value;
                                updateField(
                                  "whyChooseMeData",
                                  "features",
                                  newFeatures
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Description
                            </label>
                            <textarea
                              rows={2}
                              value={feat.description}
                              onChange={(e) => {
                                const newFeatures = [
                                  ...data.whyChooseMeData.features,
                                ];
                                newFeatures[idx].description = e.target.value;
                                updateField(
                                  "whyChooseMeData",
                                  "features",
                                  newFeatures
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* 7. Testimonials */}
            {activeTab === "testimonialsData" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-hanken">
                      Testimonials
                    </h2>
                    <p className="text-xs text-slate-500">
                      Client reviews, star ratings, and testimonials.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newReviews = [
                        ...data.testimonialsData.reviews,
                        {
                          quote: "Outstanding advice and compliance support.",
                          name: "Client Name",
                          role: "Managing Director",
                          rating: 5,
                          avatar:
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuBsUEzbmNjU6NIwMv_RBxHCUk_ih5JpBICKkhy_Rj4GP_DUkiR-Q5d3Cn0AX1Z1ieWQvpaaOrbdVkqMgN67swCrCdSTOhAt8uYRov_dPWHRthK0UGV78P-KSvpXhrOSBTToC5VHPukhxRSFbHp-T3JE0hl9L94waORaLjsznM7Hzhr4Dp9lQUUKSAi2TtlQNaFJabee4lhlGxaaxScGEye9aZVjpQ0eB2oU3v2k1xVpEhxvK86-IVmXZg",
                        },
                      ];
                      updateField("testimonialsData", "reviews", newReviews);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1c32] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.testimonialsData.title || ""}
                      onChange={(e) =>
                        updateField("testimonialsData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.testimonialsData.subtitle || ""}
                      onChange={(e) =>
                        updateField(
                          "testimonialsData",
                          "subtitle",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {data.testimonialsData.reviews.map(
                    (review: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Review #{idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              const newReviews =
                                data.testimonialsData.reviews.filter(
                                  (_: any, i: number) => i !== idx
                                );
                              updateField(
                                "testimonialsData",
                                "reviews",
                                newReviews
                              );
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Client Name
                            </label>
                            <input
                              type="text"
                              value={review.name}
                              onChange={(e) => {
                                const newReviews = [
                                  ...data.testimonialsData.reviews,
                                ];
                                newReviews[idx].name = e.target.value;
                                updateField(
                                  "testimonialsData",
                                  "reviews",
                                  newReviews
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Role / Organization
                            </label>
                            <input
                              type="text"
                              value={review.role}
                              onChange={(e) => {
                                const newReviews = [
                                  ...data.testimonialsData.reviews,
                                ];
                                newReviews[idx].role = e.target.value;
                                updateField(
                                  "testimonialsData",
                                  "reviews",
                                  newReviews
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Rating (1 - 5 Stars)
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={5}
                              value={review.rating}
                              onChange={(e) => {
                                const newReviews = [
                                  ...data.testimonialsData.reviews,
                                ];
                                newReviews[idx].rating = Number(e.target.value);
                                updateField(
                                  "testimonialsData",
                                  "reviews",
                                  newReviews
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Client Avatar URL
                            </label>
                            <input
                              type="text"
                              value={review.avatar}
                              onChange={(e) => {
                                const newReviews = [
                                  ...data.testimonialsData.reviews,
                                ];
                                newReviews[idx].avatar = e.target.value;
                                updateField(
                                  "testimonialsData",
                                  "reviews",
                                  newReviews
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                              Quote / Review Text
                            </label>
                            <textarea
                              rows={2}
                              value={review.quote}
                              onChange={(e) => {
                                const newReviews = [
                                  ...data.testimonialsData.reviews,
                                ];
                                newReviews[idx].quote = e.target.value;
                                updateField(
                                  "testimonialsData",
                                  "reviews",
                                  newReviews
                                );
                              }}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs italic"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* 8. Process Data */}
            {activeTab === "processData" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-hanken">
                      Process Steps
                    </h2>
                    <p className="text-xs text-slate-500">
                      Step-by-step workflow of how clients work with you.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSteps = [
                        ...data.processData.steps,
                        {
                          num: data.processData.steps.length + 1,
                          title: "New Step",
                          desc: "Step description details.",
                          icon: "FileCheck",
                          numBg: "bg-[#0d1c32] text-white",
                          iconColor: "text-[#cba72f]",
                        },
                      ];
                      updateField("processData", "steps", newSteps);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1c32] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.processData.title || ""}
                      onChange={(e) =>
                        updateField("processData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.processData.subtitle || ""}
                      onChange={(e) =>
                        updateField("processData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {data.processData.steps.map((step: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          Step #{idx + 1}
                        </span>
                        <button
                          onClick={() => {
                            const newSteps = data.processData.steps.filter(
                              (_: any, i: number) => i !== idx
                            );
                            updateField("processData", "steps", newSteps);
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Step Number
                          </label>
                          <input
                            type="number"
                            value={step.num}
                            onChange={(e) => {
                              const newSteps = [...data.processData.steps];
                              newSteps[idx].num = Number(e.target.value);
                              updateField("processData", "steps", newSteps);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Step Title
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const newSteps = [...data.processData.steps];
                              newSteps[idx].title = e.target.value;
                              updateField("processData", "steps", newSteps);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Lucide Icon Name
                          </label>
                          <input
                            type="text"
                            value={step.icon}
                            onChange={(e) => {
                              const newSteps = [...data.processData.steps];
                              newSteps[idx].icon = e.target.value;
                              updateField("processData", "steps", newSteps);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Step Description
                          </label>
                          <textarea
                            rows={2}
                            value={step.desc}
                            onChange={(e) => {
                              const newSteps = [...data.processData.steps];
                              newSteps[idx].desc = e.target.value;
                              updateField("processData", "steps", newSteps);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. CTA Data */}
            {activeTab === "ctaData" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    Call To Action (CTA) Banner
                  </h2>
                  <p className="text-xs text-slate-500">
                    High-conversion banner displayed above the contact section.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Banner Headline
                    </label>
                    <input
                      type="text"
                      value={data.ctaData.title || ""}
                      onChange={(e) =>
                        updateField("ctaData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Banner Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={data.ctaData.subtitle || ""}
                      onChange={(e) =>
                        updateField("ctaData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={data.ctaData.buttonLabel || ""}
                        onChange={(e) =>
                          updateField("ctaData", "buttonLabel", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Button Target Link
                      </label>
                      <input
                        type="text"
                        value={data.ctaData.buttonHref || ""}
                        onChange={(e) =>
                          updateField("ctaData", "buttonHref", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 10. Contact Data */}
            {activeTab === "contactData" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    Contact Section &amp; Form
                  </h2>
                  <p className="text-xs text-slate-500">
                    Form headers, inquiry options, and displayed contact channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.contactData.title || ""}
                      onChange={(e) =>
                        updateField("contactData", "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.contactData.subtitle || ""}
                      onChange={(e) =>
                        updateField("contactData", "subtitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Form Card Header Title
                    </label>
                    <input
                      type="text"
                      value={data.contactData.formTitle || ""}
                      onChange={(e) =>
                        updateField("contactData", "formTitle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Submit Button Label
                    </label>
                    <input
                      type="text"
                      value={data.contactData.submitButtonText || ""}
                      onChange={(e) =>
                        updateField(
                          "contactData",
                          "submitButtonText",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Services Dropdown Options */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      Form Service Options (Dropdown Items)
                    </h3>
                    <button
                      onClick={() => {
                        const newOpts = [
                          ...data.contactData.servicesOptions,
                          "New Service Option",
                        ];
                        updateField("contactData", "servicesOptions", newOpts);
                      }}
                      className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {data.contactData.servicesOptions.map(
                      (opt: string, optIdx: number) => (
                        <div key={optIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [
                                ...data.contactData.servicesOptions,
                              ];
                              newOpts[optIdx] = e.target.value;
                              updateField(
                                "contactData",
                                "servicesOptions",
                                newOpts
                              );
                            }}
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                          <button
                            onClick={() => {
                              const newOpts =
                                data.contactData.servicesOptions.filter(
                                  (_: any, i: number) => i !== optIdx
                                );
                              updateField(
                                "contactData",
                                "servicesOptions",
                                newOpts
                              );
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Info Items */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      Display Contact Information Items
                    </h3>
                    <button
                      onClick={() => {
                        const newItems = [
                          ...data.contactData.infoItems,
                          {
                            title: "Support",
                            value: "support@caportfolio.com",
                            icon: "Mail",
                          },
                        ];
                        updateField("contactData", "infoItems", newItems);
                      }}
                      className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.contactData.infoItems.map(
                      (info: any, infoIdx: number) => (
                        <div
                          key={infoIdx}
                          className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200"
                        >
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              placeholder="Title (e.g. Phone)"
                              value={info.title}
                              onChange={(e) => {
                                const newItems = [
                                  ...data.contactData.infoItems,
                                ];
                                newItems[infoIdx].title = e.target.value;
                                updateField(
                                  "contactData",
                                  "infoItems",
                                  newItems
                                );
                              }}
                              className="px-2.5 py-1 border border-slate-300 rounded text-xs font-semibold"
                            />
                            <input
                              type="text"
                              placeholder="Value"
                              value={info.value}
                              onChange={(e) => {
                                const newItems = [
                                  ...data.contactData.infoItems,
                                ];
                                newItems[infoIdx].value = e.target.value;
                                updateField(
                                  "contactData",
                                  "infoItems",
                                  newItems
                                );
                              }}
                              className="px-2.5 py-1 border border-slate-300 rounded text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Lucide Icon (e.g. Phone)"
                              value={info.icon}
                              onChange={(e) => {
                                const newItems = [
                                  ...data.contactData.infoItems,
                                ];
                                newItems[infoIdx].icon = e.target.value;
                                updateField(
                                  "contactData",
                                  "infoItems",
                                  newItems
                                );
                              }}
                              className="px-2.5 py-1 border border-slate-300 rounded text-xs font-mono"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newItems =
                                data.contactData.infoItems.filter(
                                  (_: any, i: number) => i !== infoIdx
                                );
                              updateField(
                                "contactData",
                                "infoItems",
                                newItems
                              );
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 11. Footer Data */}
            {activeTab === "footerData" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-hanken">
                    Footer Section
                  </h2>
                  <p className="text-xs text-slate-500">
                    Footer tagline, certification badge, core solutions, and legal links.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Footer Tagline
                    </label>
                    <input
                      type="text"
                      value={data.footerData.tagline || ""}
                      onChange={(e) =>
                        updateField("footerData", "tagline", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Certification Badge Text
                    </label>
                    <input
                      type="text"
                      value={data.footerData.certificationBadge || ""}
                      onChange={(e) =>
                        updateField(
                          "footerData",
                          "certificationBadge",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Copyright Notice
                    </label>
                    <input
                      type="text"
                      value={data.footerData.copyrightText || ""}
                      onChange={(e) =>
                        updateField(
                          "footerData",
                          "copyrightText",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Core Solutions List */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      Core Solutions (Footer Links List)
                    </h3>
                    <button
                      onClick={() => {
                        const newSols = [
                          ...data.footerData.coreSolutions,
                          "New Solution Link",
                        ];
                        updateField("footerData", "coreSolutions", newSols);
                      }}
                      className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Solution</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {data.footerData.coreSolutions.map(
                      (sol: string, sIdx: number) => (
                        <div key={sIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={sol}
                            onChange={(e) => {
                              const newSols = [
                                ...data.footerData.coreSolutions,
                              ];
                              newSols[sIdx] = e.target.value;
                              updateField(
                                "footerData",
                                "coreSolutions",
                                newSols
                              );
                            }}
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                          <button
                            onClick={() => {
                              const newSols =
                                data.footerData.coreSolutions.filter(
                                  (_: any, i: number) => i !== sIdx
                                );
                              updateField(
                                "footerData",
                                "coreSolutions",
                                newSols
                              );
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Legal Links */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase text-slate-600">
                      Legal &amp; Policy Links
                    </h3>
                    <button
                      onClick={() => {
                        const newLegals = [
                          ...data.footerData.legalLinks,
                          { label: "Disclaimer", href: "/disclaimer" },
                        ];
                        updateField("footerData", "legalLinks", newLegals);
                      }}
                      className="flex items-center gap-1 text-xs text-[#0d1c32] font-bold hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Legal Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {data.footerData.legalLinks.map(
                      (link: any, lIdx: number) => (
                        <div
                          key={lIdx}
                          className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200"
                        >
                          <input
                            type="text"
                            placeholder="Label (e.g. Privacy Policy)"
                            value={link.label}
                            onChange={(e) => {
                              const newLegals = [
                                ...data.footerData.legalLinks,
                              ];
                              newLegals[lIdx].label = e.target.value;
                              updateField(
                                "footerData",
                                "legalLinks",
                                newLegals
                              );
                            }}
                            className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Href (e.g. /privacy-policy)"
                            value={link.href}
                            onChange={(e) => {
                              const newLegals = [
                                ...data.footerData.legalLinks,
                              ];
                              newLegals[lIdx].href = e.target.value;
                              updateField(
                                "footerData",
                                "legalLinks",
                                newLegals
                              );
                            }}
                            className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs"
                          />
                          <button
                            onClick={() => {
                              const newLegals =
                                data.footerData.legalLinks.filter(
                                  (_: any, i: number) => i !== lIdx
                                );
                              updateField(
                                "footerData",
                                "legalLinks",
                                newLegals
                              );
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
