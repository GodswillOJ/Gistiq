
"use client";

interface FacebookShareButtonProps {
  url: string;
}

export default function FacebookShareButton({
  url,
}: FacebookShareButtonProps) {
  const handleFacebookShare = () => {
    const shareUrl = new URL(
      "https://www.facebook.com/sharer/sharer.php"
    );

    shareUrl.searchParams.set("u", url);

    window.open(
      shareUrl.toString(),
      "facebook-share",
      "width=600,height=500,noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={handleFacebookShare}
      className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-3 font-semibold text-white transition hover:bg-[#0C63D4]"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.98h-1.514c-1.49 0-1.955.93-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.1 24 12.073Z" />
      </svg>

      Share on Facebook
    </button>
  );
}
