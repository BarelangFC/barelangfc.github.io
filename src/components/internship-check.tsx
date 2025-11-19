"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface InternshipCheckProps {
  lulusData: string;
  tidakLulusData: string;
}

export default function InternshipCheck({ lulusData, tidakLulusData }: InternshipCheckProps) {
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
            <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎉</div>
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
            <span className="text-lg sm:text-xl">🔊</span>
          ) : (
            <span className="text-lg sm:text-xl">🔇</span>
          )}
        </Button>
      </div>

      <Card className="shadow-2xl border-2 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg px-4 sm:px-6">
          <div className="mb-3 sm:mb-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🏆</div>
          </div>
          <CardTitle className="text-2xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
            Pengumuman Seleksi Magang
          </CardTitle>
          <CardTitle className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
            BarelangFC Robotics Team
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
                    <span className="animate-spin">⏳</span>
                    Memeriksa Data...
                  </span>
                ) : (
                  "🔍 Cek Hasil Seleksi"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {result.status === "lulus" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 rounded-2xl border-2 sm:border-4 border-green-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-6xl sm:text-8xl animate-bounce">🎉</div>
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
                        ✅ LOLOS SELEKSI MAGANG
                      </p>
                      <p className="text-base sm:text-xl font-semibold text-green-700 dark:text-green-300">
                        BarelangFC Robotics Team
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 text-left">
                      <p className="font-semibold text-base sm:text-lg mb-2 text-blue-800 dark:text-blue-300">
                        📋 Langkah Selanjutnya:
                      </p>
                      <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 list-disc list-inside">
                        <li>Tunggu informasi lebih lanjut melalui email</li>
                        <li>Siapkan dokumen yang diperlukan</li>
                        <li>Bergabung dengan grup WhatsApp peserta magang</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {result.status === "tidak-lulus" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-red-50 to-amber-100 dark:from-red-950 dark:to-amber-900 rounded-2xl border-2 sm:border-4 border-red-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-6xl sm:text-8xl">💪</div>
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
                        Belum berhasil pada seleksi kali ini
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 text-left">
                      <p className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-purple-800 dark:text-purple-300">
                        💡 Jangan menyerah!
                      </p>
                      <ul className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 list-disc list-inside">
                        <li>Terus tingkatkan skill dan pengetahuan robotika</li>
                        <li>Ikuti workshop dan pelatihan yang tersedia</li>
                        <li>Coba lagi di kesempatan berikutnya</li>
                        <li>Hubungi kami untuk feedback dan saran</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {result.status === "tidak-ditemukan" && (
                <div className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 rounded-2xl border-2 sm:border-4 border-yellow-500 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-6xl sm:text-8xl">❓</div>
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
                      <p className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-amber-800 dark:text-amber-300">
                        🔍 Kemungkinan penyebab:
                      </p>
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
                🔄 Cek NIM Lain
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 sm:mt-8 text-center p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
          📞 Untuk informasi lebih lanjut, silakan hubungi:
        </p>
        <p className="font-bold text-base sm:text-lg text-amber-600 dark:text-amber-400 break-all">
          ✉️ barelangfc@polibatam.ac.id
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
          BarelangFC Robotics Team - Politeknik Negeri Batam
        </p>
      </div>
    </div>
  );
}
