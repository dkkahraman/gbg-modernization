import { useState } from "react";
import { Linkedin, Twitter, Mail, Link2, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30",
    },
    {
      name: "Per E-Mail teilen",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:bg-primary/10 hover:text-primary hover:border-primary/30",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Teilen:</span>
      {shareLinks.map((link) => (
        <Tooltip key={link.name}>
          <TooltipTrigger asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-muted-foreground transition-all duration-200 ${link.color}`}
              aria-label={`Auf ${link.name} teilen`}
            >
              <link.icon className="w-4 h-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{link.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}

      {/* Copy Link Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "border-border bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            }`}
            aria-label="Link kopieren"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Link2 className="w-4 h-4" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Kopiert!" : "Link kopieren"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
