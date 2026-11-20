import { useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Aturan validasi password baru
  const rules = [
    {
      id: "minLength",
      label: "Minimal 8 karakter",
      valid: password.length >= 8,
    },
    {
      id: "firstCapital",
      label: "Karakter pertama huruf kapital (A–Z)",
      valid: /^[A-Z]/.test(password),
    },
    {
      id: "hasNumber",
      label: "Mengandung minimal 1 angka (0–9)",
      valid: /[0-9]/.test(password),
    },
    {
      id: "hasSymbol",
      label: "Mengandung minimal 1 simbol (!@#$%^&*)",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const allRulesValid = rules.every((rule) => rule.valid);
  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const canSubmit = allRulesValid && isPasswordMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Sambungkan ke API reset password backend di sini
    console.log("Password baru valid:", password);
  };

  return (
    <div className="flex flex-col flex-1 w-full lg:w-1/2">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg
            className="mr-1 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Buat password baru yang memenuhi seluruh kriteria keamanan di bawah
            ini.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Password Baru */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="mb-0">
                    New Password<span className="text-error-500">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-xs font-medium text-[#D97706] hover:underline"
                  >
                    {showPassword ? "Sembunyikan" : "Lihat"}
                  </button>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                />
              </div>

              {/* Checklist Validasi Karakter */}
              <div className="p-3.5 border border-gray-200 rounded-lg bg-gray-50/80 dark:bg-gray-900/40 dark:border-gray-800">
                <p className="mb-2.5 text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-300">
                  Checklist Keamanan Password
                </p>
                <ul className="space-y-2">
                  {rules.map((rule) => (
                    <li
                      key={rule.id}
                      className={`flex items-center gap-2.5 text-xs transition-colors ${
                        rule.valid
                          ? "font-medium text-emerald-700 dark:text-emerald-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded-full border text-[10px] font-bold ${
                          rule.valid
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-gray-300 dark:border-gray-600 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{rule.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Konfirmasi Password Baru */}
              <div>
                <Label>
                  Confirm New Password<span className="text-error-500">*</span>
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                />
                {confirmPassword.length > 0 && !isPasswordMatch && (
                  <p className="mt-1.5 text-xs text-error-500">
                    Konfirmasi password belum sama dengan password baru.
                  </p>
                )}
              </div>

              {/* Tombol Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs ${
                    canSubmit
                      ? "bg-[#02241B] hover:bg-[#033628] cursor-pointer"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save New Password
                </button>
              </div>
            </div>
          </form>

          {/* <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Wait, I remember my password...{" "}
              <Link
                to="/"
                className="font-medium text-[#D97706] hover:underline"
              >
                Click here
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}