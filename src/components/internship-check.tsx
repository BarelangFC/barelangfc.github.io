"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { SparklesIcon, LightBulbIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { InstagramIcon } from "./team-page";

interface InternshipCheckProps {
  lulusData: string;
  tidakLulusData: string;
  whatsappGroupLink?: string;
}

export default function InternshipCheck({ lulusData, tidakLulusData, whatsappGroupLink }: InternshipCheckProps) {
  const [nim, setNim] = useState("");
  const [result, setResult] = useState<{
    status: "lulus" | "tidak-lulus" | "tidak-ditemukan" | null;
    name: string;
  }>({ status: null, name: "" });
  const [isChecking, setIsChecking] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/backsound.m4a");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        setShowPlayPrompt(false);
      }).catch(() => {
        setIsMusicPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        });
      }
    }
  };

  // Parse markdown table to extract NIM and names
  const parseMarkdownTable = (markdown: string) => {
    const lines = markdown.split("\n");
    const data: { nim: string; name: string }[] = [];

    for (const line of lines) {
      // Match table rows with format: | NIM | Name |
      const match = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|$/);
      if (match) {
        data.push({
          nim: match[1].trim(),
          name: match[2].trim(),
        });
      }
    }

    return data;
  };

  const handleCheck = () => {
    if (!nim.trim()) {
      alert("Mohon masukkan NIM Anda");
      return;
    }

    setIsChecking(true);

    // Simulate loading for better UX
    setTimeout(() => {
      const lulusList = parseMarkdownTable(lulusData);
      const tidakLulusList = parseMarkdownTable(tidakLulusData);

      const foundLulus = lulusList.find((item) => item.nim === nim.trim());
      const foundTidakLulus = tidakLulusList.find((item) => item.nim === nim.trim());

      if (foundLulus) {
        setResult({ status: "lulus", name: foundLulus.name });
      } else if (foundTidakLulus) {
        setResult({ status: "tidak-lulus", name: foundTidakLulus.name });
      } else {
        setResult({ status: "tidak-ditemukan", name: "" });
      }

      setIsChecking(false);
    }, 500);
  };

  const handleReset = () => {
    setNim("");
    setResult({ status: null, name: "" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      {/* Music Play Prompt - Overlay */}
      {showPlayPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <SparklesIcon className="w-16 h-16 sm:w-20 sm:h-20 text-amber-500 animate-pulse" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Pengumuman Seleksi Magang
            </h3>
            <Button
              onClick={startMusic}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base sm:text-lg py-5 sm:py-6 shadow-lg"
            >
              Lihat Pengumuman
            </Button>
          </div>
        </div>
      )}

      {/* Music Toggle Button */}
      <div className="fixed top-20 sm:top-24 right-4 sm:right-8 z-50">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-110 transition-transform"
        >
          {isMusicPlaying ? (
            <SpeakerWaveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          ) : (
            <SpeakerXMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          )}
        </Button>
      </div>

      <Card className="shadow-2xl border-2 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg px-6 sm:px-8">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="mb-3 sm:mb-4 flex justify-center">
            <TrophyIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-bounce" />
          </div>
          <CardTitle className="text-2xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
            Pengumuman Seleksi Magang
          </CardTitle>
          <CardTitle className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
            BarelangFC x Barelang7 Robotics Team
          </CardTitle>
          <CardDescription className="text-white/90 text-sm sm:text-lg">
            Masukkan NIM Anda untuk melihat hasil seleksi magang
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-8">
          {result.status === null ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label htmlFor="nim" className="text-sm sm:text-base font-semibold block">
                  Nomor Induk Mahasiswa (NIM)
                </label>
                <Input
                  id="nim"
                  type="text"
                  placeholder="Contoh: 4212201001"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                  className="text-lg sm:text-xl py-5 sm:py-6 border-2 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <Button
                onClick={handleCheck}
                disabled={isChecking}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-base sm:text-lg py-5 sm:py-6"
                size="lg"
              >
                {isChecking ? (
                  <span className="flex items-center gap-2">
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Memeriksa Data...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    Cek Hasil Seleksi
                  </span>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {result.status === "lulus" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 rounded-2xl border-2 sm:border-4 border-green-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-center">
                    <CheckCircleIcon className="w-20 h-20 sm:w-28 sm:h-28 text-green-600 dark:text-green-400 animate-bounce" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-green-500 text-white rounded-full font-bold text-xs sm:text-sm animate-pulse">
                      PENGUMUMAN RESMI
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-green-700 dark:text-green-400 drop-shadow-lg">
                      SELAMAT!
                    </h3>
                    <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                      <p className="text-lg sm:text-2xl font-bold mb-2">
                        {result.name}
                      </p>
                      <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                        NIM: <span className="font-mono font-bold">{nim}</span>
                      </p>
                      <div className="h-1 w-24 sm:w-32 bg-green-500 mx-auto rounded-full mb-3 sm:mb-4"></div>
                      <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        ANDA DINYATAKAN <strong>LULUS</strong> SELEKSI HUMANOID INTERNSHIP 2025
                      </p>
                      <p className="text-base sm:text-xl font-semibold text-green-700 dark:text-green-300">
                        BarelangFC x Barelang7 Robotics Team
                      </p>
                    </div>
                    {/* <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <ClipboardDocumentListIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-800 dark:text-blue-300" />
                        <p className="font-semibold text-base sm:text-lg text-blue-800 dark:text-blue-300">
                          Langkah Selanjutnya:
                        </p>
                      </div>
                      <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 list-disc list-inside">
                        <li>Tunggu informasi lebih lanjut melalui email</li>
                        <li>Siapkan dokumen yang diperlukan</li>
                        <li>Bergabung dengan grup WhatsApp peserta magang</li>
                      </ul>
                    </div> */}
                    {whatsappGroupLink && (
                      <a
                        href={whatsappGroupLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base sm:text-lg py-5 sm:py-6 shadow-lg">
                          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Gabung Grup WhatsApp
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {result.status === "tidak-lulus" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-red-50 to-amber-100 dark:from-red-950 dark:to-amber-900 rounded-2xl border-2 sm:border-4 border-red-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-center">
                    <XCircleIcon className="w-20 h-20 sm:w-28 sm:h-28 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-red-500 text-white rounded-full font-bold text-xs sm:text-sm">
                      PENGUMUMAN RESMI
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-red-700 dark:text-red-400 drop-shadow-lg">
                      Tetap Semangat!
                    </h3>
                    <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                      <p className="text-lg sm:text-2xl font-bold mb-2">
                        {result.name}
                      </p>
                      <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                        NIM: <span className="font-mono font-bold">{nim}</span>
                      </p>
                      <div className="h-1 w-24 sm:w-32 bg-red-500 mx-auto rounded-full mb-3 sm:mb-4"></div>
                      <p className="text-base sm:text-xl font-semibold text-red-600 dark:text-red-400">
                        ANDA DINYATAKAN <strong>TIDAK LULUS</strong> SELEKSI HUMANOID INTERNSHIP 2025
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 text-left">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-800 dark:text-purple-300" />
                        <p className="font-semibold text-base sm:text-lg text-purple-800 dark:text-purple-300">
                          Jangan menyerah!
                        </p>
                      </div>
                      <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 list-disc list-inside">
                        <li>Terus tingkatkan skill</li>
                        <li>Coba lagi di kesempatan berikutnya</li>
                        <li>Hubungi kami untuk feedback dan saran</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {result.status === "tidak-ditemukan" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 rounded-2xl border-2 sm:border-4 border-yellow-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-center">
                    <QuestionMarkCircleIcon className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-yellow-500 text-white rounded-full font-bold text-xs sm:text-sm">
                      PERINGATAN
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-yellow-700 dark:text-yellow-400 drop-shadow-lg">
                      Data Tidak Ditemukan
                    </h3>
                    <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                      <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                        NIM: <span className="font-mono font-bold text-xl sm:text-2xl">{nim}</span>
                      </p>
                      <div className="h-1 w-24 sm:w-32 bg-yellow-500 mx-auto rounded-full mb-3 sm:mb-4"></div>
                      <p className="text-base sm:text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                        NIM tidak terdaftar dalam sistem
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 sm:p-6 text-left">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 dark:text-amber-300" />
                        <p className="font-semibold text-base sm:text-lg text-amber-800 dark:text-amber-300">
                          Kemungkinan penyebab:
                        </p>
                      </div>
                      <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 list-disc list-inside">
                        <li>NIM yang dimasukkan salah atau belum terdaftar</li>
                        <li>Anda belum mendaftar untuk seleksi magang ini</li>
                        <li>Terjadi kesalahan sistem (hubungi panitia)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full border-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-105 transition-all text-base sm:text-lg py-5 sm:py-6"
                size="lg"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Cek NIM Lain
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 sm:mt-8 text-center p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Untuk informasi lebih lanjut, silakan hubungi:
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
          <p className="font-bold text-base sm:text-lg text-amber-600 dark:text-amber-400 break-all">
            barelangfc@gmail.com
          </p>
          <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 dark:text-pink-400" />
          <a
            href="https://www.instagram.com/barelangfc.polibatam/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-base sm:text-lg text-pink-500 dark:text-pink-400 hover:underline"
          >
            @barelangfc.polibatam
          </a>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
          BarelangFC x Barelang7 Robotics Team - Politeknik Negeri Batam
        </p>
      </div>
    </div>
  );
}
